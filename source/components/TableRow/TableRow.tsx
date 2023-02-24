import * as React from "react";
import { browser, Tabs } from "webextension-polyfill-ts";

interface IProps {
  tab: Tabs.Tab;
}

const TableRow: React.FC<IProps> = ({ tab }: IProps) => {
  const [time, setTime] = React.useState(0);

  const handleTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTime(Number(event.target.value));
  };
  const startInterval = (): void => {
    if (tab.id) {
      //   window.localStorage.setItem(String(tab.id), JSON.stringify({ time }));
      browser.runtime.sendMessage({ id: tab.id, time });
    }

    // if (time === 0) return;
    // clearInterval(intervalId);
    // const interval = window.setInterval(
    //   () => browser.tabs.reload(tab.id),
    //   time * 1000
    // );
    // setIntervalId(interval);
    // if (tab.id) {
    //   const runtime = browser.tabs.connect(tab.id, { name: "test" });
    //   console.log(runtime);
    // }
  };
  const stopInterval = (): void => {
    // clearInterval(intervalId);
    setTime(0);
  };

  return (
    <tr>
      <td>{tab.title || "Undefined"}</td>
      <td>
        <input value={time} onChange={handleTimeChange} type="number" min={0} />
      </td>
      <td>
        <button type="button" onClick={startInterval}>
          Start
        </button>
      </td>
      <td>
        <button type="button" onClick={stopInterval}>
          Stop
        </button>
      </td>
    </tr>
  );
};
export default TableRow;
