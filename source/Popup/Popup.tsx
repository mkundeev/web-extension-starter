import * as React from "react";
import { browser, Tabs } from "webextension-polyfill-ts";
import "./styles.scss";

const Popup: React.FC = () => {
  const [tab, setTab] = React.useState<Tabs.Tab>();
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    browser.tabs.query({ active: true }).then((res) => setTab(res[0]));
  }, []);

  const handleTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTime(Number(event.target.value));
  };
  const startInterval = (): void => {
    if (time === 0) return;
    if (tab?.id) {
      browser.runtime.sendMessage({ id: tab.id, time });
    }
  };
  const stopInterval = (): void => {
    if (tab?.id) {
      browser.runtime.sendMessage({ id: tab.id, action: "stop" });
    }
    setTime(0);
  };
  const stopAllIntervals = (): void => {
    if (tab?.id) {
      browser.runtime.sendMessage({ action: "stopAll" });
    }
    setTime(0);
  };

  return (
    <section className="popup">
      <h2 className="title">{tab?.title || "Undefined"}</h2>
      <label className="timeLabel">
        <p>Set refresh time</p>
        <input
          className="input"
          value={time}
          onChange={handleTimeChange}
          type="number"
          min={0}
        />
        <p>sec</p>
      </label>
      <div className="btnsWrap">
        <div className="tabBtnsWrap">
          <button className="start" type="button" onClick={startInterval}>
            Start
          </button>
          <button className="stop" type="button" onClick={stopInterval}>
            Stop
          </button>
        </div>
        <button type="button" onClick={stopAllIntervals}>
          Reset all
        </button>
      </div>
    </section>
  );
};

export default Popup;
