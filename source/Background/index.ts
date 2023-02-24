import "emoji-log";
import { browser } from "webextension-polyfill-ts";

browser.runtime.onInstalled.addListener((): void => {
  console.emoji("🦄", "extension installed");
});

// let tabsArray: { id: number; time: number }[];
// let intrvalIdArray: { id: any }[];

// function foo(message: { id: number; time: number }): void {
//   //   window.location.reload();
//   console.log(message);
//   if (tabsArray.find((item) => item.id === message.id)) {
//   }
//   // window.setInterval(() => {
//   //   browser.tabs.reload(message.id);
//   // }, 5000);
// }
// browser.runtime.onMessage.addListener(foo);
