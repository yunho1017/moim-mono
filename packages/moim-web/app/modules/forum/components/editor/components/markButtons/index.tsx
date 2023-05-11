import * as React from "react";
import { ThemeContext } from "styled-components";
// icons
import BoldIcon from "@icon/24-bold-g.svg";
import BoldActiveIcon from "@icon/24-bold-b.svg";
import ItalicIcon from "@icon/24-italic-g.svg";
import ItalicActiveIcon from "@icon/24-italic-b.svg";
import LinkIcon from "@icon/24-link-g.svg";

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
  touch?: number;
}

const MarkButton: React.FC<IProps> = ({ type, isActive, touch }) => {
  const theme = React.useContext(ThemeContext);
  const { normal: NormalIcon, active: ActiveIcon } = React.useMemo(
    () => MARK_RESOURCE[type],
    [type],
  );

  return isActive ? (
    <ActiveIcon
      size="s"
      touch={touch}
      role="button"
      iconColor={theme.colorV2.colorSet.grey800}
    />
  ) : (
    <NormalIcon
      size="s"
      touch={touch}
      role="button"
      iconColor={theme.colorV2.colorSet.grey300}
    />
  );
};

export default MarkButton;
