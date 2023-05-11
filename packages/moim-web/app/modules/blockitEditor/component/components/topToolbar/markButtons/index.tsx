import * as React from "react";
import { ThemeContext } from "styled-components";
// icons
import BoldIcon from "@icon/18-bold-g.svg";
import BoldActiveIcon from "@icon/18-bold-b.svg";
import ItalicIcon from "@icon/18-italic-g.svg";
import ItalicActiveIcon from "@icon/18-italic-b.svg";
import LinkIcon from "@icon/18-link-g.svg";

type MarkType = "bold" | "italic" | "link";

const MARK_RESOURCE = {
  bold: {
    normal: BoldIcon,
    active: BoldActiveIcon,
  },
  italic: {
    normal: ItalicIcon,
    active: ItalicActiveIcon,
  },
  link: {
    normal: LinkIcon,
    active: LinkIcon,
  },
};

interface IProps {
  type: MarkType;
  isActive: boolean;
  disabled: boolean;
  touch?: number;
}

const MarkButton: React.FC<IProps> = ({ type, isActive, disabled, touch }) => {
  const theme = React.useContext(ThemeContext);
  const { normal: NormalIcon, active: ActiveIcon } = React.useMemo(
    () => MARK_RESOURCE[type],
    [type],
  );

  return isActive && !disabled ? (
    <ActiveIcon
      size="xs"
      touch={touch}
      role="button"
      iconColor={theme.colorV2.accent}
    />
  ) : (
    <NormalIcon
      size="xs"
      touch={touch}
      role="button"
      iconColor={
        disabled
          ? theme.colorV2.colorSet.grey300
          : theme.colorV2.colorSet.grey800
      }
    />
  );
};

export default MarkButton;
