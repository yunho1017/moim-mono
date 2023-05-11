import * as React from "react";
import { css } from "styled-components";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { text: textKnob } = require("@storybook/addon-knobs");

import Component from ".";

export const STORY_BOOK_PATH = `${STORYBOOK_PREFIX.DESIGN_SYSTEM}/CollapsibleBox`;

const HeaderWrapperStyle = css`
  background-color: white;
`;

const ShowCase1 = ({ title }: { title: string }) => {
  const [open, setOpenStatus] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setOpenStatus(true);
    action("onOpen");
  }, []);

  const handleClose = React.useCallback(() => {
    setOpenStatus(false);
    action("onClose");
  }, []);

  return (
    <Component
      open={open}
      title={<h2>{title}</h2>}
      headerWrapperStyle={HeaderWrapperStyle}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <div style={{ backgroundColor: "white", minHeight: "300px" }}>
        Inner Item Here
      </div>
    </Component>
  );
};

const ShowCase2 = ({ title }: { title: string }) => {
  const [open, setOpenStatus] = React.useState(false);

  const handleOpen = React.useCallback(() => {
    setOpenStatus(true);
    action("onOpen")();
  }, []);

  const handleClose = React.useCallback(() => {
    setOpenStatus(false);
    action("onClose")();
  }, []);

  const handleOptionChange = React.useCallback(option => {
    if (option === "option2" || option === "option3") {
      setOpenStatus(true);
    } else {
      setOpenStatus(false);
    }
    action("handleOptionChange")(option);
  }, []);

  return (
    <Component
      open={open}
      disableHeadClick={true}
      options={["option1", "option2", "option3", "option4"]}
      selectedOption="option1"
      title={<h2>{title}</h2>}
      headerWrapperStyle={HeaderWrapperStyle}
      onOpen={handleOpen}
      onClose={handleClose}
      onOptionChange={handleOptionChange}
    >
      <div style={{ backgroundColor: "white", minHeight: "300px" }}>
        Inner Item Here
      </div>
    </Component>
  );
};

storiesOf(STORY_BOOK_PATH, module)
  .add("Default", () => (
    <ShowCase1 title={textKnob("Title Text", "Title Section")} />
  ))
  .add("Many case", () => (
    <>
      <ShowCase1 key="sec1" title="Section 1" />
      <ShowCase1 key="sec2" title="Section 2" />
      <ShowCase1 key="sec3" title="Section 3" />
      <ShowCase1 key="sec4" title="Section 4" />
    </>
  ))
  .add("Select menu", () => (
    <ShowCase2 title={textKnob("Title Text", "Title Section")} />
  ));
