import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
// hooks
import { useCommonFactoryProps } from "../hooks";
import { useForumThreadInput } from "../components/threadInput/hooks";
// components
import Factory, { Row } from "../components/factory";
import { TextBody } from "../components/textBody";
import Engage from "../components/engage";
import MultiImage from "../components/media/multiImage";
import { Spacer } from "common/components/designSystem/spacer";
import { IBaseProps } from "..";

const CommentHiddenReactionArea = styled.div`
  height: ${px2rem(6)};
`;

interface ICommentProps extends IBaseProps {
  commentId: Moim.Id;
  engage?: React.ComponentProps<typeof Engage>;
}

const Comment = React.forwardRef<HTMLDivElement | null, ICommentProps>(
  ({ engage, commentId, ...baseProps }, ref) => {
    const {
      size = "m",
      headerProps,
      avatarProps,
      linkPreviewProps,
      mediaProps,
      hover,
      contents,
      menus,
      selected,
      editState,
      blockitElement,
    } = useCommonFactoryProps(baseProps);
    const hookProps = useForumThreadInput.useProps();
    const {
      handleEditThread: handleEditThreadBase,
    } = useForumThreadInput.useHandlers(hookProps);

    const handleEditThread = React.useCallback(
      (newContents: Moim.Blockit.Blocks[]) => {
        handleEditThreadBase(undefined, newContents);
        editState?.onEnter();
      },
      [handleEditThreadBase, editState],
    );

    const engageProps: React.ReactNode = React.useMemo(
      () => (engage ? <Engage {...engage} /> : <CommentHiddenReactionArea />),
      [engage],
    );

    const textBodyProps: React.ReactNode = React.useMemo(() => {
      const { isEditMode, onCancel } = editState;
      const imageBlocks =
        contents?.filter<Moim.Blockit.IImageBlock>(
          ((blk: Moim.Blockit.Blocks) => blk.type === "image") as any,
        ) ?? [];

      return (
        <>
          {imageBlocks.length > 0 && !Boolean(isEditMode) && (
            <>
              <Spacer value={8} />
              <MultiImage
                parentId={commentId}
                images={imageBlocks.map(imgBlock => ({
                  fileId: imgBlock.fileId,
                  url: imgBlock.src,
                  blurhash: imgBlock.blurHash,
                  fallbackSrc: imgBlock.fallbackSrc,
                  srcSet: imgBlock.srcSet,
                }))}
              />
              <Spacer value={8} />
            </>
          )}
          <TextBody
            id={commentId}
            contents={contents}
            editState={{
              isEditMode: Boolean(isEditMode),
              onEnter: handleEditThread,
              onCancel,
            }}
          />
        </>
      );
    }, [commentId, contents, editState, handleEditThread]);

    return (
      <Factory
        ref={ref}
        type="comment"
        size={size}
        hover={hover}
        menus={menus}
        selected={selected || editState.isEditMode}
        isFullWidthRight={true}
        isAnonymous={baseProps.isAnonymous}
        header={headerProps}
        avatar={avatarProps}
      >
        {textBodyProps && <Row key="comment-text-row">{textBodyProps}</Row>}
        {linkPreviewProps && (
          <Row key="comment-linkpreview-row">{linkPreviewProps}</Row>
        )}
        {!editState.isEditMode && mediaProps && (
          <Row key="comment-media-row">{mediaProps}</Row>
        )}
        {blockitElement && (
          <Row key="comment-blockit-row">{blockitElement}</Row>
        )}
        {engageProps && <Row key="comment-engage-row">{engageProps}</Row>}
      </Factory>
    );
  },
);

export default React.memo(Comment);
