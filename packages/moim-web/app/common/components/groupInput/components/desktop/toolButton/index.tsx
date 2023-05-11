import * as React from "react";
import styled, { ThemeContext } from "styled-components";
// icons
import BoldIconBase from "@icon/18-bold-g.svg";
import ItalicIconBase from "@icon/18-italic-g.svg";
import LinkIconBase from "@icon/18-link-g.svg";

import MentionIconBase from "@icon/18-mention-g.svg";
import FileIconBase from "@icon/18-file-g.svg";
import ImageIconBase from "@icon/18-image-g.svg";
import EmojiIconBase from "@icon/18-emoji-g.svg";
import SendIconBase from "@icon/18-send-g.svg";
import TextStyleIconBase from "@icon/18-textstyle-g.svg";
import MeetingIconBase from "@icon/18-video-chat.svg";
import GroupInputTypes from "common/components/groupInput/type";

const SendActiveIcon = styled(SendIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.accent,
}))``;

const SendIcon = styled(SendIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey100,
}))``;

const MARK_RESOURCE: Record<
  GroupInputTypes.ToolButtonType,
  {
    normal: React.ComponentType<any>;
    active: React.ComponentType<any>;
  }
> = {
  bold: {
    normal: BoldIconBase,
    active: BoldIconBase,
  },
  italic: {
    normal: ItalicIconBase,
    active: ItalicIconBase,
  },
  link: {
    normal: LinkIconBase,
    active: LinkIconBase,
  },
  mention: {
    normal: MentionIconBase,
    active: MentionIconBase,
  },
  meeting: {
    normal: MeetingIconBase,
    active: MeetingIconBase,
  },
  file: {
    normal: FileIconBase,
    active: FileIconBase,
  },
  image: {
    normal: ImageIconBase,
    active: ImageIconBase,
  },
  emoji: {
    normal: EmojiIconBase,
    active: EmojiIconBase,
  },
  send: {
    normal: SendIcon,
    active: SendActiveIcon,
  },

  textStyle: {
    normal: TextStyleIconBase,
    active: TextStyleIconBase,
  },
};

interface IProps {
  type: GroupInputTypes.ToolButtonType;
  isActive?: boolean;
  touch?: number;
}

const ToolButton: React.FC<IProps> = ({ type, isActive, touch }) => {
  const theme = React.useContext(ThemeContext);
  const { normal: NormalIcon, active: ActiveIcon } = React.useMemo(
    () => MARK_RESOURCE[type],
    [type],
  );

  return isActive ? (
    <ActiveIcon
      size="xs"
      touch={touch}
      role="button"
      iconColor={theme.colorV2.colorSet.grey800}
    />
  ) : (
    <NormalIcon
      size="xs"
      touch={touch}
      role="button"
      iconColor={theme.colorV2.colorSet.grey300}
    />
  );
};

export default ToolButton;
