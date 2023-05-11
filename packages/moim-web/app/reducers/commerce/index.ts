import produce from "immer";
import { AllActions } from "app/actions";
import { CommerceTypes } from "app/actions/types";
import {
  REVIEW_PAGE_ITEM_COUNT,
  QNA_PAGE_ITEM_COUNT,
} from "app/modules/commerce/containers/productShow/constants";
import { commerceCategoryListNormalizer } from "app/models";

export const INITIAL_STATE: Moim.Commerce.IReduxState = {
  info: {
    nicepayBankCodes: [],
    sweetTrackerCodes: [],
  },
  categories: window.__categoryData
    ? commerceCategoryListNormalizer(window.__categoryData).result
    : { data: [] },
  shippingAddress: { data: [] },
  getCategoriesLoading: true,
  productReviews: {},
  productQuestions: {},
  productComments: {},
  productParticipants: {},
  purchasedProducts: { data: [], paging: {} },
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case CommerceTypes.START_FETCH_SELLER_CATEGORIES: {
        draft.getCategoriesLoading = true;
        break;
      }
      case CommerceTypes.SUCCEED_FETCH_SELLER_CATEGORIES: {
        draft.getCategoriesLoading = false;
        draft.categories = action.payload.data;
        break;
      }
      case CommerceTypes.FAILED_FETCH_SELLER_CATEGORIES: {
        draft.getCategoriesLoading = false;
        break;
      }

      case CommerceTypes.SUCCEED_GET_BASIC_INFO: {
        draft.info = action.payload.data;
        break;
      }

      case CommerceTypes.SUCCEED_FETCH_SHIPPING_ADDRESS_LIST: {
        if (!draft.shippingAddress) {
          // NOTE: for data migration.
          draft.shippingAddress = { data: [] };
        }
        draft.shippingAddress.data = action.payload.ids;
        break;
      }

      case CommerceTypes.SUCCEED_CREATE_SHIPPING_ADDRESS: {
        if (draft.shippingAddress.data.length > 0) {
          draft.shippingAddress.data = [
            ...draft.shippingAddress.data.slice(0, 1),
            action.payload.id,
            ...draft.shippingAddress.data.slice(1),
          ];
        } else {
          draft.shippingAddress.data = [action.payload.id];
        }
        break;
      }

      case CommerceTypes.SUCCEED_DELETE_SHIPPING_ADDRESS: {
        draft.shippingAddress.data = draft.shippingAddress.data.filter(
          id => id !== action.payload.id,
        );
        break;
      }

      case CommerceTypes.SUCCEED_FETCH_PRODUCT_REVIEWS: {
        draft.productReviews[action.payload.productId] = {
          items: action.payload.reviews.data,
          currentIndex: action.payload.callIndex,
          total: action.payload.reviews.paging.total ?? 0,
        };
        break;
      }

      case CommerceTypes.SUCCEED_CREATE_PRODUCT_REVIEW: {
        if (!draft.productReviews[action.payload.productId]) {
          draft.productReviews[action.payload.productId] = {
            items: [],
            total: 0,
            currentIndex: 0,
          };
        }
        draft.productReviews[action.payload.productId].total++;
        if (draft.productReviews[action.payload.productId].currentIndex === 0) {
          draft.productReviews[action.payload.productId].items = [
            action.payload.reviewId,
          ]
            .concat(draft.productReviews[action.payload.productId].items)
            .slice(0, REVIEW_PAGE_ITEM_COUNT);
        }
        break;
      }

      case CommerceTypes.SUCCEED_DELETE_PRODUCT_REVIEW: {
        draft.productReviews[
          action.payload.productId
        ].items = draft.productReviews[action.payload.productId].items.filter(
          i => i !== action.payload.reviewId,
        );
        if (action.payload.parentId === action.payload.productId) {
          draft.productReviews[action.payload.productId].total--;
        }
        break;
      }

      case CommerceTypes.SUCCEED_FETCH_PRODUCT_QUESTIONS: {
        draft.productQuestions[action.payload.productId] = {
          items: action.payload.questions.data,
          currentIndex: action.payload.callIndex,
          total: action.payload.questions.paging.total ?? 0,
        };
        break;
      }

      case CommerceTypes.SUCCEED_CREATE_PRODUCT_QUESTION: {
        if (!draft.productQuestions[action.payload.productId]) {
          draft.productQuestions[action.payload.productId] = {
            items: [],
            total: 0,
            currentIndex: 0,
          };
        }
        draft.productQuestions[action.payload.productId].total++;
        if (
          draft.productQuestions[action.payload.productId].currentIndex === 0
        ) {
          draft.productQuestions[action.payload.productId].items = [
            action.payload.questionId,
          ]
            .concat(draft.productQuestions[action.payload.productId].items)
            .slice(0, QNA_PAGE_ITEM_COUNT);
        }

        break;
      }

      case CommerceTypes.SUCCEED_DELETE_PRODUCT_QUESTION: {
        draft.productQuestions[
          action.payload.productId
        ].items = draft.productQuestions[action.payload.productId].items.filter(
          i => i !== action.payload.questionId,
        );
        if (action.payload.parentId === action.payload.productId) {
          draft.productQuestions[action.payload.productId].total--;
        }
        break;
      }

      case CommerceTypes.SUCCEED_FETCH_FUND_COMMENTS: {
        draft.productComments[action.payload.productId] = {
          items: action.payload.comments.data,
          currentIndex: action.payload.callIndex,
          total: action.payload.comments.paging.total ?? 0,
        };
        break;
      }

      case CommerceTypes.SUCCEED_CREATE_FUND_COMMENT: {
        if (!draft.productComments[action.payload.productId]) {
          draft.productComments[action.payload.productId] = {
            items: [],
            total: 0,
            currentIndex: 0,
          };
        }
        draft.productComments[action.payload.productId].total++;
        if (
          draft.productComments[action.payload.productId].currentIndex === 0
        ) {
          draft.productComments[action.payload.productId].items = [
            action.payload.commentId,
          ]
            .concat(draft.productComments[action.payload.productId].items)
            .slice(0, QNA_PAGE_ITEM_COUNT);
        }

        break;
      }

      case CommerceTypes.SUCCEED_DELETE_FUND_COMMENT: {
        draft.productComments[
          action.payload.productId
        ].items = draft.productComments[action.payload.productId].items.filter(
          i => i !== action.payload.commentId,
        );
        if (action.payload.parentId === action.payload.productId) {
          draft.productComments[action.payload.productId].total--;
        }
        break;
      }

      case CommerceTypes.SUCCEED_FETCH_FUND_PURCHASE_ITEM_LIST: {
        const target = draft.productParticipants[action.payload.productId];
        if (target) {
          const extractedPurchase = action.payload.participantList;
          target.data =
            action.payload.loadType === "loadMore"
              ? target.data.concat(extractedPurchase)
              : extractedPurchase;
          target.paging = action.payload.paging;
        } else {
          draft.productParticipants[action.payload.productId] = {
            data: action.payload.participantList,
            paging: action.payload.paging,
          };
        }
        break;
      }

      case CommerceTypes.SUCCEED_FETCH_PURCHASED_PRODUCT_LIST: {
        draft.purchasedProducts = action.payload;
        break;
      }
    }
  });
}
