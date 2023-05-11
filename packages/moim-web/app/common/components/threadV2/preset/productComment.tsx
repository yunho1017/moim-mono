import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
// hooks
import { useCommonFactoryProps } from "../hooks";
// components
import { IBaseProps } from "..";
import MultiImage from "../components/media/multiImage";
import Factory, { Row } from "../components/factory";
import Chips from "../components/chips";
import { ProductOption, ReviewContent } from "../components/reviews";
import Engage from "../components/engage";
import { TextBodyBubble } from "../components/textBody";
import { Spacer } from "common/components/designSystem/spacer";

const ReviewHiddenReactionArea = styled.div`
  height: ${px2rem(6)};
`;

interface IProductCommentProps extends IBaseProps {
  type: "comment" | "comment-reply";
  commentId: Moim.Id;
  chips?: string[];
  productOption?: string;
  engage?: React.ComponentProps<typeof Engage>;
  onEditContent?(
    title: string | undefined,
    newContent: Moim.Blockit.Blocks[],
  ): void;
}

const Review = React.forwardRef<HTMLDivElement | null, IProductCommentProps>(
  (
    {
      type,
      engage,
      commentId,
      chips,
      productOption,
      onEditContent,
      ...baseProps
    },
    ref,
  ) => {
    const {
      size = "m",
      headerProps,
      avatarProps,
      mediaProps,
      hover,
      contents,
      menus,
      selected,
      editState,
    } = useCommonFactoryProps(baseProps);

    const handleEditThread = React.useCallback(
      (newTitle: string, newContents: Moim.Blockit.Blocks[]) => {
        onEditContent?.(newTitle ? newTitle : undefined, newContents);
        editState?.onEnter();
      },
      [onEditContent, editState],
    );

    const handleEditThreadReply = React.useCallback(
      (newContents: Moim.Blockit.Blocks[]) => {
        onEditContent?.(undefined, newContents);
        editState?.onEnter();
      },
      [onEditContent, editState],
    );

    const imageBlocks = React.useMemo(
      () =>
        contents?.filter<Moim.Blockit.IImageBlock>(
          ((blk: Moim.Blockit.Blocks) => blk.type === "image") as any,
        ) ?? [],
      [contents],
    );

    const engageProps: React.ReactNode = React.useMemo(
      () =>
        engage ? (
          <Engage {...engage} withoutVotePermissionCheck={true} />
        ) : (
          <ReviewHiddenReactionArea />
        ),
      [engage],
    );

    return (
      <Factory
        ref={ref}
        type="review"
        size={size}
        hover={hover}
        menus={menus}
        selected={selected || editState.isEditMode}
        isFullWidthRight={true}
        header={headerProps}
        avatar={avatarProps}
      >
        {productOption && (
          <Row key={`${type}-product-option-row`}>
            <ProductOption value={productOption} />
          </Row>
        )}
        {chips && (
          <Row key={`${type}-chips-row`}>
            <Chips chips={chips} />
          </Row>
        )}
        <Row
          key={`${type}-content-row`}
          marginBottom={!editState.isEditMode && mediaProps ? 4 : 2}
        >
          {type === "comment" ? (
            <ReviewContent
              id={commentId}
              title={""}
              contents={contents}
              editState={{
                isEditMode: editState.isEditMode,
                onEnter: handleEditThread,
                // eslint-disable-next-line @typescript-eslint/unbound-method
                onCancel: editState.onCancel,
              }}
            />
          ) : (
            <>
              {imageBlocks.length > 0 && !Boolean(editState.isEditMode) && (
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
              <TextBodyBubble
                id={commentId}
                isSimpleMode={false}
                isReply={true}
                contents={contents}
                editState={{
                  isEditMode: editState.isEditMode,
                  onEnter: handleEditThreadReply,
                  // eslint-disable-next-line @typescript-eslint/unbound-method
                  onCancel: editState.onCancel,
                }}
                reverse={false}
              />
            </>
          )}
        </Row>
        {!editState.isEditMode && mediaProps && (
          <Row key={`${type}-media-row`} marginBottom={2}>
            {mediaProps}
          </Row>
        )}
        {engageProps && <Row key={`${type}-engage-row`}>{engageProps}</Row>}
      </Factory>
    );
  },
);

export default Review;
