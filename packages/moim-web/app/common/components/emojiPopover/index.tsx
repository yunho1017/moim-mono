import * as React from "react";
import { Picker, EmojiData } from "emoji-mart";
import { ThemeContext } from "styled-components";

import { px2rem } from "common/helpers/rem";
import useIsMobile from "common/hooks/useIsMobile";

import { EmojiWrapper, Popover } from "./styledComponent";

interface IProps {
  open: boolean;
  anchorElement: null | Element | ((element: Element) => Element);
  onSelected(emoji: EmojiData): void;
  onClose(): void;
}

const EmojiPopover: React.FC<IProps> = ({
  open,
  anchorElement,
  onSelected,
  onClose,
}) => {
  const isMobile = useIsMobile();
  const theme = React.useContext(ThemeContext);
  const width = isMobile ? "100%" : px2rem(338);

  return (
    <Popover
      open={open}
      anchorEl={anchorElement}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      onClose={onClose}
    >
      <EmojiWrapper>
        <Picker
          native={true}
          title="Moim"
          sheetSize={32}
          color={theme.colorV2.accent}
          style={{
            width,
          }}
          perLine={9}
          onSelect={onSelected}
          showSkinTones={false}
        />
      </EmojiWrapper>
    </Popover>
  );
};

export default EmojiPopover;
