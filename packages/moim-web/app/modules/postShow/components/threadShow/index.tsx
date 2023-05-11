import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
// components
import RichEditor from "common/components/blockitEditorBase";
import TagItemList from "app/modules/forum/components/editor/components/tagItemList";
import { Wrapper, ContentWrapper, StickyWrapper } from "./styledComponent";
import PostAuthor from "./components/postAuthor";
import { Spacer } from "common/components/designSystem/spacer";
import Engage from "./components/engage";

import { PostShowContext } from "../../context";
import { tagSetsSelector } from "app/selectors/forum";
import { tagSetBlockExtractor } from "app/modules/forum/containers/forumEditor/helper";
import { useStoreState } from "app/store";
import { POST_SHOW_MAX_CONTENT_WIDTH } from "../../constants";
import { getTagByIds } from "app/selectors/tagSet";

interface IProps {
  tagSetIds?: Moim.Id[];
  followerCount: number;
  onClickTagItem?: (tagItem: Moim.TagSet.ITagItem) => void;
}

const PostShowComponent = ({
  tagSetIds,
  followerCount,
  onClickTagItem,
}: IProps) => {
  const { post, showConfig } = React.useContext(PostShowContext);
  const refWrapper = React.useRef<HTMLDivElement>(null);
  const [
    isUnderMaxContentWidth,
    setUnderMaxContentWidthStatus,
  ] = React.useState(false);
  const tagSets = useStoreState(state =>
    tagSetsSelector(state, tagSetIds ?? []),
  );

  const { contentsWithoutTagSet, selectedTagItemIds } = React.useMemo(
    () => tagSetBlockExtractor(tagSets ?? [], post?.content ?? []),
    [post?.content, tagSets],
  );

  const selectedTagItems = useStoreState(
    state => getTagByIds(state, selectedTagItemIds) as Moim.TagSet.ITagItem[],
  );

  const handleContentWrapperResize = React.useCallback((width: number) => {
    setUnderMaxContentWidthStatus(width <= POST_SHOW_MAX_CONTENT_WIDTH);
  }, []);

  return (
    <ReactResizeDetector
      handleWidth={true}
      onResize={handleContentWrapperResize}
    >
      <Wrapper ref={refWrapper}>
        {showConfig.author_config.position === "top" && (
          <PostAuthor
            position="top"
            showAuthor={showConfig.show_author}
            showDate={showConfig.show_date}
            author={post?.author}
            anonymous={post?.anonymous_data}
            createdAt={post?.created_at}
            followerCount={followerCount}
          />
        )}

        <ContentWrapper>
          <RichEditor
            id={post?.id}
            readonly={true}
            contents={contentsWithoutTagSet}
            forceFullWidthFiles={isUnderMaxContentWidth}
          />
          <TagItemList
            tagSets={tagSets}
            tagItems={selectedTagItems}
            onClickTagItem={onClickTagItem}
          />
          {showConfig.author_config.position === "bottom" && (
            <PostAuthor
              position="bottom"
              showAuthor={showConfig.show_author}
              showDate={showConfig.show_date}
              author={post?.author}
              anonymous={post?.anonymous_data}
              createdAt={post?.created_at}
              followerCount={followerCount}
            />
          )}
        </ContentWrapper>
        <Spacer value={40} />
        <StickyWrapper>
          <Engage />
        </StickyWrapper>
      </Wrapper>
    </ReactResizeDetector>
  );
};

export default React.memo(PostShowComponent);
