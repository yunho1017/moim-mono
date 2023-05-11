import React from "react";
import styled from "styled-components";
import DownArrowIconBase from "@icon/18-downarrow-g.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

const DownArrowIcon = styled(DownArrowIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  padding: ${px2rem(16)} ${px2rem(16)} 0;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(8)} ${px2rem(16)} 0;
  }
`;

const LoadMoreButton = styled.div.attrs({ role: "button" })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${px2rem(36)};
  height: ${px2rem(36)};
  border-radius: 50%;

  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const HistoryList: React.FC<{
  hasMore: boolean;
  onLoadMore(): void;
}> = ({ onLoadMore, hasMore, children }) => {
  return (
    <Wrapper>
      {children}
      {hasMore && (
        <LoadMoreButton onClick={onLoadMore}>
          <DownArrowIcon />
        </LoadMoreButton>
      )}
    </Wrapper>
  );
};
