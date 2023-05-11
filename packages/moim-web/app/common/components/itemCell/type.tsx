import * as React from "react";

import GroupProfileImage from "common/components/groupProfileImage";
import { ILeftProps } from "./components/left/type";
import UserProfileImage from "common/components/userProfileImage";
import { IHoverSelectedProps } from "common/components/designSystem/styles";

export interface IChildSizeMap {
  height: number;
  touchArea: number;
}

export const sizeMap: {
  [key in Moim.DesignSystem.ItemCellSizeMapKey]?: IChildSizeMap;
} = {
  xxs: {
    height: 34,
    touchArea: 30,
  },
  xs: {
    height: 42,
    touchArea: 42,
  },
  s: {
    height: 44,
    touchArea: 42,
  },
  m: {
    height: 52,
    touchArea: 48,
  },
  l: {
    height: 72,
    touchArea: 48,
  },
  xl: {
    height: 96,
    touchArea: 48,
  },

  member: {
    height: 60,
    touchArea: 36,
  },

  currentColorOnPalette: {
    height: 42,
    touchArea: 18,
  },
};

export interface IBaseItemCellProps extends IHoverSelectedProps {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  subTitleShaveLine?: number;
  disabled?: boolean;
  leftElement?: {
    element: React.ReactNode;
    props: ILeftProps;
  };
  rightElement?: React.ReactNode;
  disableTitleShave?: boolean;
  disableRightPadding?: boolean;
  size?: Moim.DesignSystem.ItemCellSizeMapKey;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export interface ILabelWithInputProps
  extends Omit<
    React.HTMLProps<HTMLInputElement>,
    "title" | "type" | "as" | "ref" | "size"
  > {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  size?: Moim.DesignSystem.Size;
}

export interface IGroupItemProps {
  title: React.ReactNode;
  image?: Omit<React.ComponentProps<typeof GroupProfileImage>, "size">;
  rightElement?: React.ReactNode;
  subTitle?: string;
  margin?: {
    left?: Moim.Enums.MarginSize;
    right?: Moim.Enums.MarginSize;
  };
  hover?: boolean;
}

export interface IMemberItemProps {
  title: React.ReactNode;
  image: SubPartial<React.ComponentProps<typeof UserProfileImage>, "size">;
  hover?: boolean;
  button?: IRightSectionProps;
  size?: Moim.DesignSystem.ItemCellSizeMapKey;
  subTitle?: React.ReactNode;
  disableTitleShave?: boolean;
  subTitleShaveLine?: number;
  canOpenProfileDialog?: boolean;
  onClick?(): void;
}

export interface IChannelItemProps {
  channelType: Moim.Channel.Type;
  name: string;
  size?: Moim.DesignSystem.Size;
}

export interface ISearchItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: Moim.DesignSystem.Size;
}

export type IRightSectionProps =
  | {
      type: "button";
      text: string;
      checked?: boolean;
      onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    }
  | ({
      type: "radio";
    } & React.InputHTMLAttributes<HTMLInputElement>)
  | ({
      type: "checkbox";
    } & React.InputHTMLAttributes<HTMLInputElement>);
