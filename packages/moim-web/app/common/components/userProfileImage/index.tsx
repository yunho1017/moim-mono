import * as React from "react";
import {
  Wrapper,
  RawImage,
  ClipPathG,
  UserPlaceholderWithMask,
  UserPlaceholder,
  OnlineStatus,
} from "./styledComponents";
import { BlackedUserPlaceholder } from "./blockedUserPlaceholder";

import { useOpenProfileDialog } from "common/hooks/profileDialog";
import { sizeMap } from "./size";
import { useStoreState } from "app/store";
import { blockedUserSelector } from "app/selectors/app";

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  size: Moim.DesignSystem.Size;
  src?: string;
  userId?: Moim.Id;
  isOnline?: boolean;
  canOpenProfileDialog?: boolean;
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
  // profile show 에서만 blocked user placeholder를 보여줘야되서 임시로 추가
  enableBlockedPlaceholder?: boolean;
  shape?: "square" | "round";
}

function UserProfileImage(props: IProps) {
  const {
    userId,
    size,
    src,
    isOnline,
    canOpenProfileDialog = true,
    onClick,
    ref: _foo,
    elementPaletteProps,
    shape = "round",
    enableBlockedPlaceholder,
    ...rest
  } = props;

  const { blockedUser } = useStoreState(state => ({
    blockedUser:
      (userId ? blockedUserSelector(state, userId) : false) &&
      enableBlockedPlaceholder,
  }));
  const userPlaceholderElement = React.useMemo(
    () =>
      isOnline === undefined ? (
        <UserPlaceholder
          size={size}
          elementPaletteProps={elementPaletteProps}
        />
      ) : (
        <UserPlaceholderWithMask
          size={size}
          elementPaletteProps={elementPaletteProps}
        />
      ),
    [elementPaletteProps, isOnline, size],
  );

  const userProfileElement = React.useMemo(() => {
    if (blockedUser) {
      return (
        <BlackedUserPlaceholder
          size={size}
          elementPaletteProps={elementPaletteProps}
        />
      );
    }

    if (!src) {
      return userPlaceholderElement;
    }

    return isOnline !== undefined ? (
      <svg width={sizeMap.get(size)} height={sizeMap.get(size)}>
        <ClipPathG size={size} href={src}>
          <image
            width={sizeMap.get(size)}
            height={sizeMap.get(size)}
            xlinkHref={src}
          />
        </ClipPathG>
      </svg>
    ) : (
      <RawImage
        size={size}
        src={src}
        shape={shape}
        elementPaletteProps={elementPaletteProps}
      />
    );
  }, [
    blockedUser,
    elementPaletteProps,
    isOnline,
    shape,
    size,
    src,
    userPlaceholderElement,
  ]);

  const openProfileDialog = useOpenProfileDialog();
  const handleClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      if (canOpenProfileDialog && userId) {
        openProfileDialog(userId, { current: e.currentTarget });
      }
      onClick?.(e);
    },
    [canOpenProfileDialog, onClick, openProfileDialog, userId],
  );

  return (
    <Wrapper size={size} {...rest} onClick={handleClick}>
      {userProfileElement}
      {isOnline !== undefined && !(enableBlockedPlaceholder && blockedUser) ? (
        <OnlineStatus isOnline={isOnline} />
      ) : null}
    </Wrapper>
  );
}

export default React.memo(UserProfileImage);
