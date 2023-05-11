import React from "react";
import { ToggleLayer } from "react-laag";
import MenuLayer from "./components/menuLayer";
import {
  formatTime,
  getTimeList,
} from "common/components/timeSelector/helpers";
import { Data } from "common/components/timeSelector/types";
import { Wrapper } from "./styled";

interface IChildrenProps {
  toggle: () => void;
  triggerRef: React.RefObject<any>;
  text: string;
}

interface IProps {
  format: 12 | 24;
  start?: Date;
  end?: Date;
  intervalMinute?: number;
  onSelect: (date: Date) => void;
  children: (childrenProps: IChildrenProps) => React.ReactNode;
}

const SUGGEST_LAYER_POSITION = {
  anchor: "BOTTOM_RIGHT",
  triggerOffset: 5,
  preferY: "BOTTOM",
} as const;

function TimeSelector({
  children,
  start,
  end,
  format,
  intervalMinute,
  onSelect,
}: IProps) {
  const timeList = getTimeList({
    start,
    end,
    format,
    intervalMinute,
  }).map(date => ({
    text: formatTime(date, format),
    value: date,
  }));

  const [text, setText] = React.useState<string>(timeList[0]?.text || "");
  const handleSelect = React.useCallback(
    (data: Data) => {
      setText(data.text);
      onSelect(data.value);
    },
    [onSelect, setText],
  );
  const renderLayer = React.useCallback(
    ({ layerProps, close, isOpen }) => (
      <MenuLayer
        dataList={timeList}
        layerRef={layerProps.ref}
        layerStyle={layerProps.style}
        close={close}
        isOpen={isOpen}
        onClickItem={handleSelect}
      />
    ),
    [timeList, handleSelect],
  );

  return (
    <Wrapper>
      <ToggleLayer
        closeOnOutsideClick
        fixed
        renderLayer={renderLayer}
        placement={SUGGEST_LAYER_POSITION}
      >
        {({ triggerRef, toggle }) => children({ triggerRef, toggle, text })}
      </ToggleLayer>
    </Wrapper>
  );
}

export default TimeSelector;
