import * as React from "react";
import { browser, Tabs } from "webextension-polyfill-ts";
import TableRow from "../components/TableRow";
import "./styles.scss";

const Popup: React.FC = () => {
  const [tabs, setTabs] = React.useState<Tabs.Tab[]>([]);

  React.useEffect(() => {
    browser.tabs.query({ active: true }).then((res) => setTabs(res));
  }, []);
  console.log(tabs);
  return (
    <section id="popup">
      <table>
        <thead>
          <tr>
            <th>Tab name</th>
            <th>Reload interval</th>
            <th>Start</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {tabs.map((tab) => (
            <TableRow tab={tab} key={tab.id} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Popup;
