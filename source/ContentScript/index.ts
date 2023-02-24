import { browser } from "webextension-polyfill-ts";

console.log("helloworld from content script");

function foo(message: { id: number; time: number }): void {
  //   window.location.reload();
  console.log(message);
  window.localStorage.setItem(
    String(message.id),
    JSON.stringify({ time: message.time })
  );
  console.log(data);
  //   setInterval(() => {
  //     window.location.reload();
  //   }, 5000);
}
// document.addEventListener("click", foo);
browser.runtime.onMessage.addListener(foo);

export {};
