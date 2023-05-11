import * as React from "react";
import uuid from "uuid";
import Header from "./components/header";
import Media from "./components/media";
import LinkPreviewComponent from "common/components/linkPreview";
import UserProfileImage from "common/components/userProfileImage";
import WithPositionChip from "common/components/withPositionChip/new";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import BlockitRenderer from "./components/blockitRenderer";

import { useStoreState } from "app/store";
import { useOpenProfileDialog } from "common/hooks/profileDialog";
import { UserProfileContainer } from "./styled";

import { IBaseProps } from "./";
import { UserStatusTypes } from "app/enums";

export function useCommonFactoryProps(baseProps: IBaseProps) {
  const {
    size = "m",
    userId,
    media,
    medias,
    blockit,
    linkPreview,
    title,
    createdAt,
    reverse,
    isAnonymous,
    avatar,
    showAvatar = Boolean(avatar),
  } = baseProps;
  const author = useStoreState(state => state.entities.users[userId]);

  const openProfileDialog = useOpenProfileDialog();
  const handleTitleClick: React.MouseEventHandler<any> = React.useCallback(
    e => {
      // TODO: should change
      if (author && author.status !== UserStatusTypes.DEACTIVATED) {
        openProfileDialog(userId, { current: e.currentTarget });
      }
    },
    [openProfileDialog, author, userId],
  );

  const headerProps: React.ReactNode = React.useMemo(() => {
    const props: React.ComponentProps<typeof Header> = {
      title,
      userId,
      createdAt,
      reverse,
      isAnonymous,
    };

    return (
      <Header
        {...props}
        title={
          <WithPositionChip positions={author?.positions ?? []}>
            <ShavedText
              onClick={handleTitleClick}
              value={<NativeEmojiSafeText value={title!} />}
              line={1}
            />
          </WithPositionChip>
        }
      />
    );
  }, [
    isAnonymous,
    createdAt,
    handleTitleClick,
    reverse,
    title,
    author,
    userId,
  ]);

  const avatarProps: React.ReactNode = React.useMemo(
    () =>
      showAvatar &&
      (author || isAnonymous) && (
        <UserProfileContainer>
          <UserProfileImage
            size={size}
            userId={author?.id ?? ""}
            src={author?.avatar_url ?? ""}
            title={author?.name}
            role={!isAnonymous ? "button" : undefined}
            isOnline={author ? author.presence === "ACTIVE" : undefined}
          />
        </UserProfileContainer>
      ),
    [showAvatar, author, size, isAnonymous],
  );

  const linkPreviewProps: React.ReactNode = React.useMemo(
    () => linkPreview && <LinkPreviewComponent {...linkPreview} />,
    [linkPreview],
  );

  const mediaProps: React.ReactNode = React.useMemo(
    () => media && <Media type="comment" reverse={reverse} {...media} />,
    [media, reverse],
  );

  const mediasProps: React.ReactNode = React.useMemo(
    () =>
      medias &&
      medias.map(md => <Media type="comment" reverse={reverse} {...md} />),
    [medias, reverse],
  );

  const blockitElement: React.ReactNode = React.useMemo(
    () =>
      blockit?.blocks.map(block => (
        <BlockitRenderer
          type={blockit.type || "message"}
          reverse={reverse}
          key={`thread_${uuid()}`}
          block={block}
        />
      )),
    [blockit, reverse],
  );

  return {
    ...baseProps,
    user: author,
    headerProps,
    avatarProps,
    linkPreviewProps,
    mediaProps,
    mediasProps,
    blockitElement,
    handleTitleClick,
  };
}
