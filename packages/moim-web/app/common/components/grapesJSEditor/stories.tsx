import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");

import Component from ".";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/GrapesJSEditor`, module).add(
  "Default",
  () => {
    const ref = React.useRef<Component>(null);
    const handleSave = React.useCallback(() => {
      if (ref.current) {
        const editor = ref.current.getEditorInst();
        console.log(">>> Save:HTML", editor.getHtml());
        console.log(">>> Save:Css", editor.getCss());
      }
    }, [ref]);

    const handleLoad = React.useCallback(() => {
      if (ref.current) {
        const editor = ref.current.getEditorInst();
        editor.setComponents(
          `<div class="row"><div id="imuh" class="cell"><div id="ilhf">Insert your text here</div></div><div id="iwgu" class="cell"><div id="i8bb">efefeffInsert your text hessre12 2</div></div></div><table id="i1mp"><tbody><tr><td class="divider"></td></tr></tbody></table>`,
        );
        editor.setStyle(
          `* { box-sizing: border-box; } body {margin: 0;}.row{display:table;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;width:100%;}.cell{width:8%;display:table-cell;height:75px;}#ilhf{padding:10px;}#i8bb{padding:10px;}.divider{background-color:rgba(0, 0, 0, 0.1);height:1px;}#i1mp{width:100%;margin-top:10px;margin-bottom:10px;}@media (max-width: 768px){.cell{width:100%;display:block;}}`,
        );
        console.log(">>> Loaded");
      }
    }, [ref]);

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div>
          <button onClick={handleSave}>Save</button>
          <br />
          <button onClick={handleLoad}>Load</button>
        </div>
        <Component ref={ref} />
      </div>
    );
  },
);
