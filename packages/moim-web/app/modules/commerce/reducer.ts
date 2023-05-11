import produce from "immer";
import { AllActions } from "app/actions";
import { CommerceTypes } from "app/actions/types";

interface IPage {
  infinite: Moim.IPaginatedListResponse<Moim.Id> | null;
  paginated: Moim.IIndexedPagingList<Moim.Id>;
}

export interface IReduxState {
  cartId: Moim.Id | null;
  productListPages: Record<Moim.Id, IPage>;
  productSearchListPages: IPage;
  sellerListPages: Record<Moim.Id, IPage>;
  payments: any;
  myTotalCredits: number;
  myCreditHistory: Moim.IPaginatedListResponse<
    Moim.Commerce.ICreditHistoryItem
  >;

  reviewWriterDialog: {
    mode: "new" | "edit";
    open: boolean;
    purchaseId?: Moim.Id;
    reviewId?: Moim.Id;
    productId?: Moim.Id;
    sellerId?: Moim.Id;
    meta?: Moim.Forum.IProductReviewThreadMeta;
  };
  paymentCancelDialog: {
    open: boolean;
    type: "payment" | "purchaseItems";
    targetPaymentId: Moim.Id | null;
    targetPurchaseItemIds: Moim.Id[];
    paymentStatus: Moim.Commerce.PurchaseStatusType;
    paymentMethodType: Moim.Commerce.PaymentMethodType;
  };
  myCoupons: {
    active: Moim.IPaginatedListResponse<
      Moim.Commerce.IAvailableStatusCoupon
    > | null;
    deactive: Moim.IPaginatedListResponse<
      Moim.Commerce.IAvailableStatusCoupon
    > | null;
  };
  checkoutRedirectDialog: {
    open: boolean;
    payload: {
      items: Moim.Commerce.ICartSellerItem[];
      isFromCart: boolean;
      userCoupons?: string[];
      usedCoins?: { coinId: string; amount: number }[];
    } | null;
  };
}

export const INITIAL_STATE: IReduxState = {
  cartId: null,
  productListPages: {},
  productSearchListPages: {
    infinite: null,
    paginated: {
      items: [],
      currentIndex: 0,
      total: 0,
    },
  },
  sellerListPages: {},
  payments: null,
  myTotalCredits: 0,
  myCreditHistory: {
    data: [],
    paging: {},
  },
  reviewWriterDialog: {
    mode: "new",
    open: false,
  },
  paymentCancelDialog: {
    open: false,
    type: "payment",
    targetPaymentId: null,
    targetPurchaseItemIds: [],
    paymentStatus: "created",
    paymentMethodType: "CARD",
  },
  myCoupons: {
    active: null,
    deactive: null,
  },
  checkoutRedirectDialog: {
    open: false,
    payload: null,
  },
};

export function reducer(state = INITIAL_STATE, action: AllActions) {
  return produce(state, draft => {
    switch (action.type) {
      case CommerceTypes.SUCCEED_SEARCH_SELLER_PRODUCTS:
      case CommerceTypes.SUCCEED_FETCH_SELLER_PRODUCTS: {
        if (action.payload.pageType === "infinite") {
          if (
            draft.productListPages[action.payload.id] &&
            draft.productListPages[action.payload.id].infinite !== null
          ) {
            const uniqArraySet = new Set(
              draft.productListPages[action.payload.id].infinite!.data.concat(
                action.payload.data.data,
              ),
            );
            draft.productListPages[
              action.payload.id
            ].infinite!.data = Array.from(uniqArraySet);

            draft.productListPages[action.payload.id].infinite!.paging =
              action.payload.data.paging;
          } else {
            draft.productListPages[action.payload.id] = {
              infinite: action.payload.data,
              paginated: {
                items: [],
                currentIndex: 0,
                total: 0,
              },
            };
          }
        }
        break;
      }

      case CommerceTypes.CLEAR_SEARCH_SELLER_PRODUCTS:
      case CommerceTypes.CLEAR_FETCH_SELLER_PRODUCTS: {
        if (draft.productListPages[action.payload.id]) {
          draft.productListPages[action.payload.id] = {
            infinite: null,
            paginated: {
              items: [],
              currentIndex: 0,
              total: 0,
            },
          };
        }
        break;
      }

      case CommerceTypes.SUCCEED_SEARCH_PRODUCTS_BY_QUERY: {
        if (action.payload.pageType === "infinite") {
          if (draft.productSearchListPages.infinite !== null) {
            const uniqArraySet = new Set(
              draft.productSearchListPages.infinite.data.concat(
                action.payload.data.data,
              ),
            );
            draft.productSearchListPages.infinite.data = Array.from(
              uniqArraySet,
            );
            draft.productSearchListPages.infinite.paging =
              action.payload.data.paging;
          } else {
            draft.productSearchListPages.infinite = action.payload.data;
          }
        } else {
          draft.productSearchListPages.paginated = {
            items: action.payload.data.data,
            total: action.payload.data.paging.total ?? 0,
            currentIndex: action.payload.callIndex ?? 0,
          };
        }
        break;
      }

      case CommerceTypes.CLEAR_SEARCH_PRODUCTS_BY_QUERY: {
        draft.productSearchListPages = {
          infinite: null,
          paginated: {
            items: [],
            currentIndex: 0,
            total: 0,
          },
        };
        break;
      }

      case CommerceTypes.SUCCEED_FETCH_CART: {
        draft.cartId = action.payload.cart;
        break;
      }

      case CommerceTypes.SUCCEED_FETCH_MY_CREDIT_HISTORIES: {
        if (action.payload.type === "new") {
          draft.myCreditHistory = action.payload.response;
          draft.myTotalCredits = action.payload.totalAmount ?? 0;
        } else {
          draft.myCreditHistory.data = draft.myCreditHistory.data.concat(
            action.payload.response.data,
          );
          draft.myCreditHistory.paging = action.payload.response.paging;
        }
        break;
      }

      case CommerceTypes.OPEN_REVIEW_WRITE_DIALOG: {
        const {
          mode,
          purchaseId,
          reviewId,
          productId,
          sellerId,
          meta,
        } = action.payload;

        draft.reviewWriterDialog = {
          open: true,
          mode,
          purchaseId,
          reviewId,
          productId,
          sellerId,
          meta,
        };
        break;
      }

      case CommerceTypes.CLOSE_REVIEW_WRITE_DIALOG: {
        draft.reviewWriterDialog = {
          open: false,
          mode: "new",
          purchaseId: undefined,
          reviewId: undefined,
          productId: undefined,
          sellerId: undefined,
          meta: undefined,
        };
        break;
      }

      case CommerceTypes.SUCCEED_FETCH_MY_COUPONS: {
        if (action.payload.type === "active") {
          if (action.payload.isAppend) {
            draft.myCoupons.active = {
              data: (draft.myCoupons.active?.data ?? []).concat(
                action.payload.coupons.data,
              ),
              paging: action.payload.coupons.paging,
            };
          } else {
            draft.myCoupons.active = action.payload.coupons;
          }
        } else {
          if (action.payload.isAppend) {
            draft.myCoupons.deactive = {
              data: (draft.myCoupons.deactive?.data ?? []).concat(
                action.payload.coupons.data,
              ),
              paging: action.payload.coupons.paging,
            };
          } else {
            draft.myCoupons.deactive = action.payload.coupons;
          }
        }
        break;
      }

      case CommerceTypes.OPEN_CANCEL_PAYMENT_DIALOG: {
        draft.paymentCancelDialog = {
          ...action.payload,
          open: true,
        };
        break;
      }

      case CommerceTypes.CLOSE_CANCEL_PAYMENT_DIALOG: {
        draft.paymentCancelDialog.open = false;
        draft.paymentCancelDialog.targetPaymentId = null;
        draft.paymentCancelDialog.targetPurchaseItemIds = [];
        draft.paymentCancelDialog.paymentStatus = "created";
        break;
      }

      case CommerceTypes.OPEN_CHECKOUT_REDIRECT_LOADING_DIALOG: {
        draft.checkoutRedirectDialog.open = true;
        draft.checkoutRedirectDialog.payload = action.payload;
        break;
      }

      case CommerceTypes.CLOSE_CHECKOUT_REDIRECT_LOADING_DIALOG: {
        draft.checkoutRedirectDialog.open = false;
        draft.checkoutRedirectDialog.payload = null;
        break;
      }
    }
  });
}
