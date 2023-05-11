// TODO: 나중에 thread 폴더로 이동
import * as React from "react";
import Media from "./components/media";
import LinkPreviewComponent from "common/components/linkPreview";
import UserProfileImage from "common/components/userProfileImage";
import { IBlockitRendererProps } from "./components/blockitRenderer";

export { HoverMenuItem } from "./components/factory/styled";
export { default as ThreadInput } from "./components/threadInput";
export { default as Message, MessageMode } from "./preset/message";
export { default as Comment } from "./preset/comment";
export { default as ProductComment } from "./preset/productComment";
export { default as Review } from "./preset/review";
export { default as Question } from "./preset/question";

export interface IBaseProps {
  userId: Moim.Id;
  editState: {
    isEditMode: boolean;
    onEnter(): void;
    onCancel(): void;
  };
  size?: Moim.DesignSystem.Size;
  isAnonymous?: boolean;
  // To be deleted
  avatar?: Omit<React.ComponentProps<typeof UserProfileImage>, "size">;
  showAvatar?: boolean;
  blockit?: IBlockitRendererProps;
  media?: Omit<React.ComponentProps<typeof Media>, "type" | "reverse">;
  medias?: Omit<React.ComponentProps<typeof Media>, "type" | "reverse">[];
  linkPreview?: React.ComponentProps<typeof LinkPreviewComponent>;
  title?: string;
  createdAt?: number;
  contents?: Moim.Blockit.Blocks[];
  disableHoverStyle?: boolean;
  isFullWidthRight?: boolean;
  hover?: boolean;
  menus?: React.ReactNode[];
  selected?: boolean;
  reverse?: boolean;
}
