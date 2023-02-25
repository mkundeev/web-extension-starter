import * as React from "react";
import { browser, Tabs } from "webextension-polyfill-ts";
import "./styles.scss";

const Popup: React.FC = () => {
  const [tab, setTab] = React.useState<Tabs.Tab>();
  const [time, setTime] = React.useState(0);
  const [interval, setInter] = React.useState(0);

  React.useEffect(() => {
    // get activeTab TabId
    browser.tabs.query({ active: true }).then((res) => setTab(res[0]));
    if (tab?.id) {
      // get current refresh interval from bachground
      const getInterval = async (): Promise<void> => {
        browser.runtime
          .sendMessage({ id: tab.id, action: "getInterval" })
          .then((res: number) => setInter(res));
      };
      getInterval();
    }
  }, [tab?.id]);

  const resetTime = (): void => {
    setTime(0);
    setInter(0);
  };
  const handleTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTime(Number(event.target.value));
  };
  const startInterval = (): void => {
    if (time === 0) return;
    if (tab?.id) {
      browser.runtime.sendMessage({ id: tab.id, time });
      setInter(time);
      window.close();
    }
  };
  const stopInterval = (): void => {
    if (tab?.id) {
      browser.runtime.sendMessage({ id: tab.id, action: "stop" });
    }
    resetTime();
  };
  const stopAllIntervals = (): void => {
    if (tab?.id) {
      browser.runtime.sendMessage({ action: "stopAll" });
    }
    resetTime();
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
      <div className="interval">
        {interval > 0 && (
          <p>
            Current refresh interval <span>{interval} sec</span>
          </p>
        )}
      </div>
      <div className="btnsWrap">
        <div className="tabBtnsWrap">
          <button
            className="start"
            type="button"
            onClick={startInterval}
            disabled={time === 0}
          >
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
