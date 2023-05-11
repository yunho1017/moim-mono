import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import HorizontalLabelList, { ILabel } from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Horizontal label list`)
  .add("Label type Moim", () => {
    const [selected, setSelected] = React.useState<ILabel[]>([]);

    const handleClick = React.useCallback(
      (label: ILabel) => {
        action("handleClick", label);
        const sameLabel = selected.find(item => item.id === label.id);

        if (Boolean(sameLabel)) {
          setSelected(selected.filter(item => item.id !== label.id));
        } else {
          setSelected(selected.concat(label));
        }
      },
      [selected],
    );

    return (
      <div style={{ width: "300px", backgroundColor: "#FFF" }}>
        <HorizontalLabelList
          labels={[
            { id: "h1", priority: 1, text: "h1" },
            { id: "h2", priority: 2, text: "h2" },
            { id: "h3", priority: 3, text: "h3" },
            { id: "h4", priority: 4, text: "h4" },
            { id: "h5", priority: 5, text: "h5" },
            { id: "h6", priority: 6, text: "long named label item." },
            {
              id: "h7",
              priority: 7,
              text: "AbcdEfghijklnmopqrstuVwxYZ 가나다라마바사아자차카파타하",
            },
            { id: "h8", priority: 8, text: "h8" },
            { id: "h9", priority: 9, text: "h9" },
            {
              id: "h10",
              priority: 10,
              text: "AbcdEfghijklnmopqrstuVwxYZ 가나다라마바사아자차카파타하",
            },
            { id: "h11", priority: 11, text: "AbcdEfghijklnmopqrstuVwxYZ" },
            { id: "h12", priority: 12, text: "가나다라마바사아자차카파타하" },
          ]}
          selectedLabels={selected}
          onLabelClick={handleClick}
        />
      </div>
    );
  })
  .add("Label type TagSet", () => {
    const [selected, setSelected] = React.useState<ILabel[]>([]);

    const handleClick = React.useCallback(
      (label: ILabel) => {
        action("handleClick", label);
        const sameLabel = selected.find(item => item.id === label.id);

        if (Boolean(sameLabel)) {
          setSelected(selected.filter(item => item.id !== label.id));
        } else {
          setSelected(selected.concat(label));
        }
      },
      [selected],
    );

    return (
      <div style={{ width: "300px", backgroundColor: "#FFF" }}>
        <HorizontalLabelList
          labelType="tagSet"
          labels={[
            { id: "h1", priority: 1, text: "h1", selectedTagsCount: 2 },
            { id: "h2", priority: 2, text: "h2", selectedTagsCount: 2 },
            { id: "h3", priority: 3, text: "h3", selectedTagsCount: 2 },
            { id: "h4", priority: 4, text: "h4", selectedTagsCount: 2 },
            { id: "h5", priority: 5, text: "h5", selectedTagsCount: 2 },
            {
              id: "h6",
              priority: 6,
              text: "long named label item.",
              selectedTagsCount: 2,
            },
            {
              id: "h7",
              priority: 7,
              text: "AbcdEfghijklnmopqrstuVwxYZ 가나다라마바사아자차카파타하",
              selectedTagsCount: 2,
            },
            { id: "h8", priority: 8, text: "h8", selectedTagsCount: 2 },
            { id: "h9", priority: 9, text: "h9", selectedTagsCount: 2 },
            {
              id: "h10",
              priority: 10,
              text: "AbcdEfghijklnmopqrstuVwxYZ 가나다라마바사아자차카파타하",
              selectedTagsCount: 2,
            },
            {
              id: "h11",
              priority: 11,
              text: "AbcdEfghijklnmopqrstuVwxYZ",
              selectedTagsCount: 2,
            },
            {
              id: "h12",
              priority: 12,
              text: "가나다라마바사아자차카파타하",
              selectedTagsCount: 2,
            },
          ]}
          selectedLabels={selected}
          onLabelClick={handleClick}
        />
      </div>
    );
  });
