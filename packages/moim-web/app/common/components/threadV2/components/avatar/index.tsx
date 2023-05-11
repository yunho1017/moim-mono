import * as React from "react";
import GroupProfileImage from "common/components/groupProfileImage";
import { useOpenProfileDialog } from "common/hooks/profileDialog";

interface IProps
  extends Omit<
    React.ComponentProps<typeof GroupProfileImage>,
    "size" | "onImageClick"
  > {
  userId: Moim.Id;
  size?: Moim.DesignSystem.Size;
  onClick: React.MouseEventHandler<any>;
}

export default function Avatar({
  size = "m",
  userId,
  onClick,
  ...rest
}: IProps) {
  const openProfileDialog = useOpenProfileDialog();
  const handleClick: React.MouseEventHandler<any> = React.useCallback(
    e => {
      openProfileDialog(userId, { current: e.currentTarget });
      onClick?.(e);
    },
    [openProfileDialog, userId, onClick],
  );
  return <GroupProfileImage size={size} onImageClick={handleClick} {...rest} />;
}
