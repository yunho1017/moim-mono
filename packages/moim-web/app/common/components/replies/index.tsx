import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import DownArrowIconBase from "@icon/18-downarrow-g.svg";
import { B4RegularStyle } from "../designSystem/typos";
import { px2rem } from "common/helpers/rem";

const LoadMoreButton = styled.div`
  width: 100%;
  height: ${px2rem(32)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 ${px2rem(16)};

  span {
    margin-right: ${px2rem(12)};
    color: ${props => props.theme.colorV2.colorSet.grey300};
    ${B4RegularStyle};
  }
`;

const DownArrowIcon = styled(DownArrowIconBase).attrs({ size: "xs" })``;

interface IProps {
  open: boolean;
  rootId: Moim.Id; // e.g. forumId
  parentId: Moim.Id; // e.g. threadId
  paging: Moim.IPaging;
  leftItemCount: number;
  onClickLoadMore(
    rootId: Moim.Id,
    parentId: Moim.Id,
    paging: Moim.IPaging,
  ): void;
}

const Replies: React.FC<IProps> = ({
  open,
  rootId,
  parentId,
  paging,
  children,
  leftItemCount,
  onClickLoadMore,
}) => {
  const handleClickLoadMore = React.useCallback(() => {
    onClickLoadMore(rootId, parentId, paging);
  }, [onClickLoadMore, paging, parentId, rootId]);
  if (!open) return null;
  return (
    <>
      {children}
      {paging.after && (
        <LoadMoreButton role="button" onClick={handleClickLoadMore}>
          <span>
            <FormattedMessage
              id="replies_load_more"
              values={{ count: leftItemCount }}
            />
          </span>
          <DownArrowIcon />
        </LoadMoreButton>
      )}
    </>
  );
};

export default Replies;
