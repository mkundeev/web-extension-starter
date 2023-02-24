import "emoji-log";
import { browser } from "webextension-polyfill-ts";

let tabsArray: { id: number; time: number; intervalId: number }[] = [];

// eslint-disable-next-line consistent-return
function refresh(message: {
  id?: number;
  time?: number;
  action?: string;
}): Promise<number> | void {
  if (message.action === "getInterval") {
    const tab = tabsArray.find((item) => item.id === message.id);
    return tab ? Promise.resolve(tab?.time) : Promise.resolve(0);
  }
  if (message.action === "stopAll") {
    tabsArray.forEach((item) => window.clearInterval(item.intervalId));
    tabsArray = [];
  }
  if (message.id && message.action === "stop") {
    const tab = tabsArray.find((item) => item.id === message.id);
    if (tab?.intervalId) {
      window.clearInterval(tab.intervalId);
      tabsArray = tabsArray.filter((item) => item.id !== message.id);
    }
  }
  if (message.id && message.time) {
    if (tabsArray.find((item) => item.id === message.id)) {
      tabsArray.forEach((item, i, arr) => {
        if (item.id === message.id && message.time) {
          arr[i].time = message.time;
          window.clearInterval(item.intervalId);
          const interval = window.setInterval(() => {
            browser.tabs
              .reload(message.id)
              .catch(() => window.clearInterval(interval));
          }, message.time * 1000);
          arr[i].intervalId = interval;
        }
      });
    } else {
      const interval = window.setInterval(() => {
        browser.tabs
          .reload(message.id)
          .catch(() => window.clearInterval(interval));
      }, message.time * 1000);
      tabsArray.push({
        id: message.id,
        time: message.time,
        intervalId: interval,
      });
    }
  }
}
browser.runtime.onMessage.addListener(refresh);
