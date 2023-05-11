import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { select: selectKnob } = require("@storybook/addon-knobs");

import Menu from ".";
import { STORY_BOOK_PATH } from "../..";

const Wrapper = styled.div``;

storiesOf(`${STORY_BOOK_PATH}/Components/Menu`, module).add("Default", () => {
  const style = selectKnob("Style", { Default: "default", Strong: "strong" });
  return (
    <div>
      <Wrapper>
        <Menu
          menus={[
            {
              style,
              title: "BL/staticmenu/txt",
            },
            {
              style,
              title: "BL/staticmenu/txt_ic",
              hasMore: true,
            },
            {
              style,
              title: "BL/staticmenu/ic_txt",
              icon:
                "https://img.icons8.com/fluent-systems-regular/344/mailer.png",
            },
            {
              style,
              title: "BL/staticmenu/ic_txt_ic",
              icon:
                "https://img.icons8.com/fluent-systems-regular/344/mailer.png",
              hasMore: true,
            },
            {
              style,
              title: "BL/staticmenu/ic_txt_alert",
              icon:
                "https://img.icons8.com/fluent-systems-regular/344/mailer.png",
              badgeCount: 2,
            },
            {
              style,
              title: "BL/staticmenu/txt_txt-ic",
              caption: "-ic",
              hasMore: true,
            },
          ]}
        />
      </Wrapper>
    </div>
  );
});
