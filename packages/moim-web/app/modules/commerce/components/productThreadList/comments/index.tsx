import * as React from "react";
import { CancelToken } from "axios";

import { getFundComments } from "app/actions/commerce";
// hooks
import { useActions } from "app/store";
// components
import CommentItem from "./commentItem";
import { Divider } from "../common/styled";
import { CommentItemWrapper } from "./styled";
import ProductThreadList from "../common/threadList";

import ProductThreadListContext, {
  useProductThreadListContextValue,
} from "../context";
import { COMMENT_PAGE_ITEM_COUNT } from "app/modules/commerce/containers/productShow/constants";

interface IProps {
  comments: Moim.IIndexedPagingList<string>;
  productId?: Moim.Id;
  sellerId?: Moim.Id;
}

const ProductComments: React.FC<IProps> = ({
  productId,
  sellerId,
  comments,
}) => {
  const contextValue = useProductThreadListContextValue(
    "comment",
    productId,
    sellerId,
  );
  const { dispatchGetFundComments } = useActions({
    dispatchGetFundComments: getFundComments,
  });
  const handleGetProductComments = React.useCallback(
    (index: number, cancelToken: CancelToken) => {
      if (sellerId && productId) {
        return dispatchGetFundComments(
          {
            channelId: sellerId,
            threadId: productId,
            sort: "createdAt",
            order: "DESC",
            from: index * COMMENT_PAGE_ITEM_COUNT,
            limit: COMMENT_PAGE_ITEM_COUNT,
          },
          cancelToken,
          index,
        );
      } else {
        return Promise.resolve();
      }
    },
    [sellerId, productId, dispatchGetFundComments],
  );

  const renderComment = React.useCallback(
    (comment: Moim.Forum.IThread) => (
      <CommentItemWrapper key={`comment_${comment.id}`}>
        <Divider />
        <CommentItem type="comment" comment={comment} />
      </CommentItemWrapper>
    ),
    [],
  );

  return (
    <ProductThreadListContext.Provider value={contextValue}>
      <ProductThreadList
        threads={comments}
        renderThread={renderComment}
        getThreads={handleGetProductComments}
        emptyTextKey="funding_show/comments_empty"
        maxCount={COMMENT_PAGE_ITEM_COUNT}
      />
    </ProductThreadListContext.Provider>
  );
};

export default React.memo(ProductComments);
