import * as React from "react";
import { CancelToken } from "axios";

// hooks
import { useActions } from "app/store";
import { getProductQuestions } from "app/actions/commerce";
// components
import { QuestionItem } from "./questionItem";
import { QuestionWrapper, WrapperStyle } from "./styled";
import ProductThreadList from "../common/threadList";

import ProductThreadListContext, {
  useProductThreadListContextValue,
} from "../context";
import { QNA_PAGE_ITEM_COUNT } from "app/modules/commerce/containers/productShow/constants";

interface IProps {
  questions: Moim.IIndexedPagingList<string>;
  productId?: Moim.Id;
  sellerId?: Moim.Id;
}

const ProductQuestions: React.FC<IProps> = ({
  productId,
  sellerId,
  questions,
}) => {
  const contextValue = useProductThreadListContextValue(
    "question",
    productId,
    sellerId,
  );

  const { dispatchGetProductQuestions } = useActions({
    dispatchGetProductQuestions: getProductQuestions,
  });

  const handleGetProductQuestions = React.useCallback(
    (index: number, cancelToken: CancelToken) => {
      if (sellerId && productId) {
        return dispatchGetProductQuestions(
          {
            channelId: sellerId,
            threadId: productId,
            sort: "createdAt",
            order: "DESC",
            from: index * QNA_PAGE_ITEM_COUNT,
            limit: QNA_PAGE_ITEM_COUNT,
          },
          cancelToken,
          index,
        );
      } else {
        return Promise.resolve();
      }
    },
    [sellerId, productId, dispatchGetProductQuestions],
  );

  const renderQuestion = React.useCallback(
    (
      question: Moim.Forum.IThread<
        | Moim.Forum.IProductQuestionThreadMeta
        | Moim.Forum.IProductQuestionReplyThreadMeta
      >,
    ) => (
      <QuestionWrapper key={`question_${question.id}`}>
        <QuestionItem type="question" question={question} />
      </QuestionWrapper>
    ),
    [],
  );

  return (
    <ProductThreadListContext.Provider value={contextValue}>
      <ProductThreadList
        threads={questions}
        renderThread={renderQuestion}
        getThreads={handleGetProductQuestions}
        emptyTextKey="product_show_qna_empty"
        maxCount={QNA_PAGE_ITEM_COUNT}
        wrapperStyle={WrapperStyle}
      />
    </ProductThreadListContext.Provider>
  );
};

export default React.memo(ProductQuestions);
