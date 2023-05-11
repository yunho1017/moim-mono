import * as React from "react";
import styled, { css, FlattenInterpolation } from "styled-components";
import HoverDeleteIconWrapper from "common/components/hoverDeleteIconWrapper";

import useRedirect from "common/hooks/useRedirect";
import { MoimURL } from "common/helpers/url";

import { DeleteTemplateAlertContext } from "../../context";

import Title from "common/components/thread/templates/post/components/title";
import Engage from "common/components/thread/templates/post/components/engage";
import {
  Wrapper as PostItemWrapper,
  ContentWrapper,
} from "common/components/thread/templates/post/styled";
import Tags from "common/components/thread/templates/post/components/tags";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div<{
  wrapperStyle: FlattenInterpolation<any>;
}>`
  ${props => props.wrapperStyle}
`;

const StyledPostItemWrapper = styled(PostItemWrapper)<{ selected: boolean }>`
  margin: ${px2rem(8)} 0;
  padding: ${px2rem(8)} ${px2rem(16)};
  ${props =>
    props.selected &&
    css`
      background-color: ${props.theme.colorV2.colorSet.grey50};
    `}
`;

interface IProps {
  template: Moim.Forum.IPostTemplate;
  selected: boolean;
}

export default function ListItem({ template, selected }: IProps) {
  const redirect = useRedirect();
  const { open } = React.useContext(DeleteTemplateAlertContext);
  const tags = React.useMemo(
    () =>
      template.channels?.filter(i => Boolean(i)).map(channel => channel.name) ??
      [],
    [template.channels],
  );
  const handleClick = React.useCallback(() => {
    redirect(
      new MoimURL.PostTemplateShow({ postTemplateId: template.id }).toString(),
    );
  }, [redirect, template]);
  const handleClickDelete = React.useCallback(() => {
    open(template.id);
  }, [open, template]);

  return (
    <HoverDeleteIconWrapper onClickDelete={handleClickDelete}>
      {({ wrapperStyle, deleteElement }) => (
        <Wrapper wrapperStyle={wrapperStyle} onClick={handleClick}>
          <StyledPostItemWrapper selected={selected}>
            <ContentWrapper>
              <Title title={template.title} textAlign={"LEFT"} />

              <Engage
                threadId={template.id}
                upVoteCount={0}
                downVoteCount={0}
                commentCount={0}
                author={template.lastEditorId}
                createdAt={template.updatedAt}
                textAlign={"LEFT"}
                showReaction={false}
                showCommentCount={false}
                showAuthor={true}
                showDate={true}
              />
              <Tags shape="rectangle" tags={tags} />
            </ContentWrapper>
          </StyledPostItemWrapper>

          {deleteElement}
        </Wrapper>
      )}
    </HoverDeleteIconWrapper>
  );
}
