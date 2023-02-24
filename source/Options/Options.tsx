import * as React from "react";
import { browser } from "webextension-polyfill-ts";

import "./styles.scss";

const Options: React.FC = () => {
  browser.tabs.query({ currentWindow: true }).then((res) => console.log(res));
  return (
    <div>
      <form>
        <p>
          <label htmlFor="username">Your Name</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            spellCheck="false"
            autoComplete="off"
            required
          />
        </p>
        <p>
          <label htmlFor="logging">
            <input type="checkbox" name="logging" /> Show the features enabled
            on each page in the console
          </label>
        </p>
        <p>cool cool cool</p>
      </form>
    </div>
  );
};

export default Options;
