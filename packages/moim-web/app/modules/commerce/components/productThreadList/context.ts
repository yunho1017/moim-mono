import React from "react";
import { useLocation, useRouteMatch } from "react-router";
import { MoimURL } from "common/helpers/url";

interface IContextValue {
  productId?: string;
  sellerId?: string;
  highlight: {
    threadId?: string;
    replyId?: string;
  };
}

const initialValue: IContextValue = { highlight: {} };

const ProductThreadListContext = React.createContext(initialValue);

export function useProductThreadListContextValue(
  type: "review" | "question" | "comment",
  productId?: string,
  sellerId?: string,
) {
  const location = useLocation();
  const match = useRouteMatch<Moim.IMatchParams>();
  const isHighlighted = React.useMemo(() => {
    switch (type) {
      case "review":
        return MoimURL.CommerceProductShowReview.isSame(location.pathname);
      case "question":
        return MoimURL.CommerceProductShowQnA.isSame(location.pathname);
      case "comment":
        return MoimURL.CommerceProductShowComment.isSame(location.pathname);
    }
  }, [type, location.pathname]);

  return React.useMemo(
    (): IContextValue => ({
      productId,
      sellerId,
      highlight: isHighlighted
        ? {
            threadId: match.params.threadId,
            replyId: match.params.replyId,
          }
        : {},
    }),
    [
      isHighlighted,
      match.params.threadId,
      match.params.replyId,
      productId,
      sellerId,
    ],
  );
}
export default ProductThreadListContext;
