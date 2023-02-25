import "emoji-log";
import { browser } from "webextension-polyfill-ts";

let tabsArray: { id: number; time: number; intervalId: number }[] = [];

function refresh(message: {
  id?: number;
  time?: number;
  action?: string;
}): Promise<number> | void {
  // get current interval length for popup
  if (message.action === "getInterval") {
    const tab = tabsArray.find((item) => item.id === message.id);
    return Promise.resolve(tab ? tab?.time : 0);
  }
  // stop all intervals
  if (message.action === "stopAll") {
    tabsArray.forEach((item) => window.clearInterval(item.intervalId));
    tabsArray = [];
  }
  // stop interval on active tab
  if (message.id && message.action === "stop") {
    const tab = tabsArray.find((item) => item.id === message.id);
    if (tab?.intervalId) {
      window.clearInterval(tab.intervalId);
      tabsArray = tabsArray.filter((item) => item.id !== message.id);
    }
  }
  // set new or change interval
  if (message.id && message.time) {
    // check if there is setInterval for active tab
    if (tabsArray.find((item) => item.id === message.id)) {
      // change data in tabsArray and change interval
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
      // set new interval for active tab
      const interval = window.setInterval(() => {
        browser.tabs
          .reload(message.id)
          .catch(() => window.clearInterval(interval));
      }, message.time * 1000);
      // add new item to tabsArray
      tabsArray.push({
        id: message.id,
        time: message.time,
        intervalId: interval,
      });
    }
  }
  return Promise.resolve(0);
}
browser.runtime.onMessage.addListener(refresh);
