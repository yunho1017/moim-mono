import _, { isEmpty } from "lodash";
import { CancelToken } from "axios";
import {
  ActionCreators as AppActionCreators,
  AddEntities,
  loadEntities,
  loadEntitiesDirect,
} from "app/actions/entity";
import { ActionUnion } from "app/actions/helpers";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import { CommerceTypes } from "app/actions/types";
import {
  commerceCategoryListNormalizer,
  paymentListNormalizer,
  productListNormalizer,
  productNormalizer,
  productSetListNormalizer,
  sellerListNormalizer,
  sellerNormalizer,
} from "app/models/commerce";
import {
  cartResponseNormalizer,
  couponListNormalizer,
  couponNormalizer,
  paymentNormalizer,
  purchaseListNormalizer,
  shippingAddressListNormalizer,
  shippingAddressNormalizer,
} from "app/models/commerce/normalizer";
import {
  threadListNormalizer,
  threadSingleItemNormalizer,
} from "app/models/thread";
import { getCartItemBuyableSelector } from "app/modules/commerce/components/carts/helpers";
import { ThunkPromiseResult } from "app/store";
import CommerceAPI, { ISearchOptions } from "common/api/commerce";
import ForumAPI from "common/api/forum";
import { errorParseData } from "common/helpers/APIErrorParser";
import {
  batchCommerceProduct,
  batchCommerceProductSet,
  batchCommerceSeller,
  batchCommerceVariant,
  batchCommerceCoupon,
  batchCoin,
} from "common/helpers/batchService";
import buffer from "common/helpers/buffer";
import SessionHandler from "common/helpers/sessionHandler";
import { currentGroupSelector } from "app/selectors/app";

function createAction<T extends { type: CommerceTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  startGetBasicInfo: () =>
    createAction({ type: CommerceTypes.START_GET_BASIC_INFO }),
  succeedGetBasicInfo: (
    payload: Moim.ISingleItemResponse<Moim.Commerce.ICommerceBasicInfo>,
  ) => createAction({ type: CommerceTypes.SUCCEED_GET_BASIC_INFO, payload }),
  failedGetBasicInfo: () =>
    createAction({ type: CommerceTypes.FAILED_GET_BASIC_INFO }),

  openCheckoutRedirectLoadingDialog: (
    items: Moim.Commerce.ICartSellerItem[],
    isFromCart: boolean = false,
    userCoupons?: string[],
    usedCoins?: { coinId: string; amount: number }[],
  ) =>
    createAction({
      type: CommerceTypes.OPEN_CHECKOUT_REDIRECT_LOADING_DIALOG,
      payload: {
        items,
        isFromCart,
        userCoupons,
        usedCoins,
      },
    }),
  closeCheckoutRedirectLoadingDialog: () =>
    createAction({
      type: CommerceTypes.CLOSE_CHECKOUT_REDIRECT_LOADING_DIALOG,
    }),

  startBatchCoupon: () =>
    createAction({ type: CommerceTypes.START_BATCH_COUPON }),
  succeedBatchCoupon: (coupons: Moim.IListResponse<Moim.Id>) =>
    createAction({
      type: CommerceTypes.SUCCEED_BATCH_COUPON,
      payload: { coupons },
    }),
  failedBatchCoupon: () =>
    createAction({ type: CommerceTypes.FAILED_BATCH_COUPON }),

  startBatchProduct: () =>
    createAction({ type: CommerceTypes.START_BATCH_PRODUCT }),
  succeedBatchProduct: (products: Moim.IListResponse<Moim.Id>) =>
    createAction({
      type: CommerceTypes.SUCCEED_BATCH_PRODUCT,
      payload: { products },
    }),
  failedBatchProduct: () =>
    createAction({ type: CommerceTypes.FAILED_BATCH_PRODUCT }),

  startBatchProductSet: () =>
    createAction({ type: CommerceTypes.START_BATCH_PRODUCT_SET }),
  succeedBatchProductSet: (productSets: Moim.IListResponse<Moim.Id>) =>
    createAction({
      type: CommerceTypes.SUCCEED_BATCH_PRODUCT_SET,
      payload: {
        productSets,
      },
    }),
  failedBatchProductSet: () =>
    createAction({ type: CommerceTypes.FAILED_BATCH_PRODUCT_SET }),

  startBatchSeller: () =>
    createAction({ type: CommerceTypes.START_BATCH_SELLER }),
  succeedBatchSeller: (sellers: Moim.IListResponse<Moim.Id>) =>
    createAction({
      type: CommerceTypes.SUCCEED_BATCH_SELLER,
      payload: {
        sellers,
      },
    }),
  failedBatchSeller: () =>
    createAction({ type: CommerceTypes.FAILED_BATCH_SELLER }),

  startFetchMyAdminSellers: () =>
    createAction({ type: CommerceTypes.START_FETCH_MY_ADMINISTRATED_SELLERS }),
  succeedFetchMyAdminSellers: () =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_MY_ADMINISTRATED_SELLERS,
    }),
  failedFetchMyAdminSellers: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_MY_ADMINISTRATED_SELLERS }),

  startFetchSellerData: () =>
    createAction({ type: CommerceTypes.START_FETCH_SELLER_DATA }),
  succeedFetchSellerData: (payload: { sellerId: Moim.Id }) =>
    createAction({ type: CommerceTypes.SUCCEED_FETCH_SELLER_DATA, payload }),
  failedFetchSellerData: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_SELLER_DATA }),

  startFetchSellerCategories: () =>
    createAction({ type: CommerceTypes.START_FETCH_SELLER_CATEGORIES }),
  succeedFetchSellerCategories: (payload: {
    id: Moim.Id;
    data: Moim.IListResponse<Moim.Id>;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_SELLER_CATEGORIES,
      payload,
    }),
  failedFetchSellerCategories: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_SELLER_CATEGORIES }),

  startFetchSellerSubSellers: () =>
    createAction({ type: CommerceTypes.START_FETCH_SELLER_SUB_SELLERS }),
  succeedFetchSellerSubSellers: (payload: {
    id: Moim.Id;
    data: Moim.IListResponse<Moim.Id>;
    pageType: Moim.Commerce.PAGE_TYPE;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_SELLER_SUB_SELLERS,
      payload,
    }),
  failedFetchSellerSubSellers: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_SELLER_SUB_SELLERS }),
  clearFetchSellerSubSellers: () =>
    createAction({ type: CommerceTypes.CLEAR_FETCH_SELLER_SUB_SELLERS }),

  startFetchSellerProducts: () =>
    createAction({ type: CommerceTypes.START_FETCH_SELLER_PRODUCTS }),
  succeedFetchSellerProducts: (payload: {
    id: Moim.Id;
    data: Moim.IPaginatedListResponse<Moim.Id>;
    pageType: Moim.Commerce.PAGE_TYPE;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_SELLER_PRODUCTS,
      payload,
    }),
  failedFetchSellerProducts: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_SELLER_PRODUCTS }),
  clearFetchSellerProducts: (payload: { id: Moim.Id }) =>
    createAction({ type: CommerceTypes.CLEAR_FETCH_SELLER_PRODUCTS, payload }),

  startFetchSellerProductSets: () =>
    createAction({ type: CommerceTypes.START_FETCH_SELLER_PRODUCT_SETS }),
  succeedFetchSellerProductSets: (payload: {
    id: Moim.Id;
    data: Moim.IPaginatedListResponse<string>;
    pageType: Moim.Commerce.PAGE_TYPE;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_SELLER_PRODUCT_SETS,
      payload,
    }),
  failedFetchSellerProductSets: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_SELLER_PRODUCT_SETS }),
  clearFetchSellerProductSets: () =>
    createAction({ type: CommerceTypes.CLEAR_FETCH_SELLER_PRODUCT_SETS }),

  startFetchSellerProductData: () =>
    createAction({ type: CommerceTypes.START_FETCH_SELLER_PRODUCT_DATA }),
  succeedFetchSellerProductData: (payload: { productId: Moim.Id }) =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_SELLER_PRODUCT_DATA,
      payload,
    }),
  failedFetchSellerProductData: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_SELLER_PRODUCT_DATA }),

  startSearchSellerProducts: () =>
    createAction({ type: CommerceTypes.START_SEARCH_SELLER_PRODUCTS }),
  succeedSearchSellerProducts: (payload: {
    id: Moim.Id;
    data: Moim.IPaginatedListResponse<Moim.Id>;
    pageType: Moim.Commerce.PAGE_TYPE;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_SEARCH_SELLER_PRODUCTS,
      payload,
    }),
  failedSearchSellerProducts: () =>
    createAction({ type: CommerceTypes.FAILED_SEARCH_SELLER_PRODUCTS }),
  clearSearchSellerProducts: (payload: { id: Moim.Id }) =>
    createAction({ type: CommerceTypes.CLEAR_SEARCH_SELLER_PRODUCTS, payload }),

  startSearchProductsByQuery: () =>
    createAction({ type: CommerceTypes.START_SEARCH_PRODUCTS_BY_QUERY }),
  succeedSearchProductsByQuery: (payload: {
    data: Moim.IPaginatedListResponse<Moim.Id>;
    pageType: Moim.Commerce.PAGE_TYPE;
    callIndex?: number;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_SEARCH_PRODUCTS_BY_QUERY,
      payload,
    }),
  failedSearchProductsByQuery: () =>
    createAction({ type: CommerceTypes.FAILED_SEARCH_PRODUCTS_BY_QUERY }),
  clearSearchProductsByQuery: () =>
    createAction({ type: CommerceTypes.CLEAR_SEARCH_PRODUCTS_BY_QUERY }),

  startFetchPayments: () =>
    createAction({ type: CommerceTypes.START_FETCH_PAYMENTS }),
  succeedFetchPayments: () =>
    createAction({ type: CommerceTypes.SUCCEED_FETCH_PAYMENTS }),
  failedFetchPayments: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_PAYMENTS }),

  startFetchPayment: () =>
    createAction({ type: CommerceTypes.START_FETCH_PAYMENT }),
  succeedFetchPayment: () =>
    createAction({ type: CommerceTypes.SUCCEED_FETCH_PAYMENT }),
  failedFetchPayment: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_PAYMENT }),

  startFetchRefund: () =>
    createAction({ type: CommerceTypes.START_FETCH_REFUND }),
  succeedFetchRefund: () =>
    createAction({ type: CommerceTypes.SUCCEED_FETCH_REFUND }),
  failedFetchRefund: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_REFUND }),

  startCancelPayment: () =>
    createAction({ type: CommerceTypes.START_CANCEL_PAYMENT }),
  succeedCancelPayment: (payload: { paymentId: Moim.Id }) =>
    createAction({ type: CommerceTypes.SUCCEED_CANCEL_PAYMENT, payload }),
  failedCancelPayment: () =>
    createAction({ type: CommerceTypes.FAILED_CANCEL_PAYMENT }),

  // #region Product Review
  startFetchProductReviews: () =>
    createAction({ type: CommerceTypes.START_FETCH_PRODUCT_REVIEWS }),
  succeedFetchProductReviews: (payload: {
    productId: Moim.Id;
    reviews: Moim.IPaginatedListResponse<Moim.Id>;
    callIndex: number;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_PRODUCT_REVIEWS,
      payload,
    }),
  failedFetchProductReviews: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_PRODUCT_REVIEWS }),

  startCreateProductReview: () =>
    createAction({ type: CommerceTypes.START_CREATE_PRODUCT_REVIEW }),
  succeedCreateProductReview: (payload: {
    productId: Moim.Id;
    reviewId: Moim.Id;
    purchaseItemId?: Moim.Id;
    purchaseId?: Moim.Id;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_CREATE_PRODUCT_REVIEW,
      payload,
    }),
  failedCreateProductReview: () =>
    createAction({ type: CommerceTypes.FAILED_CREATE_PRODUCT_REVIEW }),

  startUpdateProductReview: () =>
    createAction({ type: CommerceTypes.START_UPDATE_PRODUCT_REVIEW }),
  succeedUpdateProductReview: (payload: { reviewId: Moim.Id }) =>
    createAction({
      type: CommerceTypes.SUCCEED_UPDATE_PRODUCT_REVIEW,
      payload,
    }),
  failedUpdateProductReview: () =>
    createAction({ type: CommerceTypes.FAILED_UPDATE_PRODUCT_REVIEW }),

  startDeleteProductReview: () =>
    createAction({ type: CommerceTypes.START_DELETE_PRODUCT_REVIEW }),
  succeedDeleteProductReview: (payload: {
    productId: Moim.Id;
    parentId: Moim.Id;
    reviewId: Moim.Id;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_DELETE_PRODUCT_REVIEW,
      payload,
    }),
  failedDeleteProductReview: () =>
    createAction({ type: CommerceTypes.FAILED_DELETE_PRODUCT_REVIEW }),

  startFetchProductReviewAnswers: () =>
    createAction({ type: CommerceTypes.START_FETCH_PRODUCT_REVIEW_REPLIES }),
  succeedFetchProductReviewAnswers: (payload: {
    parentID: Moim.Id;
    answers: Moim.IPaginatedListResponse<Moim.Id>;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_PRODUCT_REVIEW_REPLIES,
      payload,
    }),
  failedFetchProductReviewAnswers: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_PRODUCT_REVIEW_REPLIES }),

  startCreateProductReviewReply: () =>
    createAction({ type: CommerceTypes.START_CREATE_PRODUCT_REVIEW_REPLY }),
  succeedCreateProductReviewReply: (payload: {
    productId: Moim.Id;
    reviewId: Moim.Id;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_CREATE_PRODUCT_REVIEW_REPLY,
      payload,
    }),
  failedCreateProductReviewReply: () =>
    createAction({ type: CommerceTypes.FAILED_CREATE_PRODUCT_REVIEW_REPLY }),

  startUpdateProductReviewReply: () =>
    createAction({ type: CommerceTypes.START_UPDATE_PRODUCT_REVIEW_REPLY }),
  succeedUpdateProductReviewReply: (payload: { reviewId: Moim.Id }) =>
    createAction({
      type: CommerceTypes.SUCCEED_UPDATE_PRODUCT_REVIEW_REPLY,
      payload,
    }),
  failedUpdateProductReviewReply: () =>
    createAction({ type: CommerceTypes.FAILED_UPDATE_PRODUCT_REVIEW_REPLY }),
  // #endregion

  // #region Production Question
  startFetchProductQuestions: () =>
    createAction({ type: CommerceTypes.START_FETCH_PRODUCT_QUESTIONS }),
  succeedFetchProductQuestions: (payload: {
    productId: Moim.Id;
    questions: Moim.IPaginatedListResponse<Moim.Id>;
    callIndex: number;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_PRODUCT_QUESTIONS,
      payload,
    }),
  failedFetchProductQuestions: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_PRODUCT_QUESTIONS }),

  startCreateProductQuestion: () =>
    createAction({ type: CommerceTypes.START_CREATE_PRODUCT_QUESTION }),
  succeedCreateProductQuestion: (payload: {
    productId: Moim.Id;
    questionId: Moim.Id;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_CREATE_PRODUCT_QUESTION,
      payload,
    }),
  failedCreateProductQuestion: () =>
    createAction({ type: CommerceTypes.FAILED_CREATE_PRODUCT_QUESTION }),

  startUpdateProductQuestion: () =>
    createAction({ type: CommerceTypes.START_UPDATE_PRODUCT_QUESTION }),
  succeedUpdateProductQuestion: (payload: { questionId: Moim.Id }) =>
    createAction({
      type: CommerceTypes.SUCCEED_UPDATE_PRODUCT_QUESTION,
      payload,
    }),
  failedUpdateProductQuestion: () =>
    createAction({ type: CommerceTypes.FAILED_UPDATE_PRODUCT_QUESTION }),

  startDeleteProductQuestion: () =>
    createAction({ type: CommerceTypes.START_DELETE_PRODUCT_QUESTION }),
  succeedDeleteProductQuestion: (payload: {
    productId: Moim.Id;
    parentId: Moim.Id;
    questionId: Moim.Id;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_DELETE_PRODUCT_QUESTION,
      payload,
    }),
  failedDeleteProductQuestion: () =>
    createAction({ type: CommerceTypes.FAILED_DELETE_PRODUCT_QUESTION }),

  startFetchProductAnswers: () =>
    createAction({ type: CommerceTypes.START_FETCH_PRODUCT_ANSWERS }),
  succeedFetchProductAnswers: (payload: {
    parentId: Moim.Id;
    answers: Moim.IPaginatedListResponse<Moim.Id>;
    callIndex: number;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_PRODUCT_ANSWERS,
      payload,
    }),
  failedFetchProductAnswers: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_PRODUCT_ANSWERS }),

  startCreateProductAnswer: () =>
    createAction({ type: CommerceTypes.START_CREATE_PRODUCT_ANSWER }),
  succeedCreateProductAnswer: (payload: {
    parentId: Moim.Id;
    questionId: Moim.Id;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_CREATE_PRODUCT_ANSWER,
      payload,
    }),
  failedCreateProductAnswer: () =>
    createAction({ type: CommerceTypes.FAILED_CREATE_PRODUCT_ANSWER }),

  startUpdateProductAnswer: () =>
    createAction({ type: CommerceTypes.START_UPDATE_PRODUCT_ANSWER }),
  succeedUpdateProductAnswer: (payload: { questionId: Moim.Id }) =>
    createAction({
      type: CommerceTypes.SUCCEED_UPDATE_PRODUCT_ANSWER,
      payload,
    }),
  failedUpdateProductAnswer: () =>
    createAction({ type: CommerceTypes.FAILED_UPDATE_PRODUCT_ANSWER }),

  startDeleteProductAnswer: () =>
    createAction({ type: CommerceTypes.START_DELETE_PRODUCT_ANSWER }),
  succeedDeleteProductAnswer: (payload: {
    parentId: Moim.Id;
    questionId: Moim.Id;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_DELETE_PRODUCT_ANSWER,
      payload,
    }),
  failedDeleteProductAnswer: () =>
    createAction({ type: CommerceTypes.FAILED_DELETE_PRODUCT_ANSWER }),

  // #endregion

  // #region
  startFetchFundComments: () =>
    createAction({ type: CommerceTypes.START_FETCH_FUND_COMMENTS }),
  succeedFetchFundComments: (payload: {
    productId: Moim.Id;
    comments: Moim.IPaginatedListResponse<Moim.Id>;
    callIndex: number;
  }) =>
    createAction({ type: CommerceTypes.SUCCEED_FETCH_FUND_COMMENTS, payload }),
  failedFetchFundComments: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_FUND_COMMENTS }),

  startCreateFundComment: () =>
    createAction({ type: CommerceTypes.START_CREATE_FUND_COMMENT }),
  succeedCreateFundComment: (payload: {
    productId: Moim.Id;
    commentId: Moim.Id;
  }) =>
    createAction({ type: CommerceTypes.SUCCEED_CREATE_FUND_COMMENT, payload }),
  failedCreateFundComment: () =>
    createAction({ type: CommerceTypes.FAILED_CREATE_FUND_COMMENT }),

  startUpdateFundComment: () =>
    createAction({ type: CommerceTypes.START_UPDATE_FUND_COMMENT }),
  succeedUpdateFundComment: (payload: { commentId: Moim.Id }) =>
    createAction({ type: CommerceTypes.SUCCEED_UPDATE_FUND_COMMENT, payload }),
  failedUpdateFundComment: () =>
    createAction({ type: CommerceTypes.FAILED_UPDATE_FUND_COMMENT }),

  startDeleteFundComment: () =>
    createAction({ type: CommerceTypes.START_DELETE_FUND_COMMENT }),
  succeedDeleteFundComment: (payload: {
    productId: Moim.Id;
    parentId: Moim.Id;
    commentId: Moim.Id;
  }) =>
    createAction({ type: CommerceTypes.SUCCEED_DELETE_FUND_COMMENT, payload }),
  failedDeleteFundComment: () =>
    createAction({ type: CommerceTypes.FAILED_DELETE_FUND_COMMENT }),

  // #endregion

  startPutProductVote: (payload: {
    productId: Moim.Id;
    status: Moim.Enums.VoteStatus;
  }) =>
    createAction({
      type: CommerceTypes.START_PUT_PRODUCT_VOTE,
      payload,
    }),
  succeedPutProductVote: (payload: {
    productId: Moim.Id;
    status: Moim.Enums.VoteStatus;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_PUT_PRODUCT_VOTE,
      payload,
    }),
  failedPutProductVote: (payload: {
    productId: Moim.Id;
    status: Moim.Enums.VoteStatus;
  }) =>
    createAction({
      type: CommerceTypes.FAILED_PUT_PRODUCT_VOTE,
      payload,
    }),

  // #region CART
  startFetchCart: () => createAction({ type: CommerceTypes.START_FETCH_CART }),
  succeedFetchCart: (payload: { cart: Moim.Id }) =>
    createAction({ type: CommerceTypes.SUCCEED_FETCH_CART, payload }),
  failedFetchCart: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_CART }),

  startAddToCart: () => createAction({ type: CommerceTypes.START_ADD_TO_CART }),
  succeedAddToCart: (payload: { cart: Moim.Id }) =>
    createAction({ type: CommerceTypes.SUCCEED_ADD_TO_CART, payload }),
  failedAddToCart: () =>
    createAction({ type: CommerceTypes.FAILED_ADD_TO_CART }),

  startUpdateCart: () =>
    createAction({ type: CommerceTypes.START_UPDATE_CART }),
  succeedUpdateCart: (payload: { cart: Moim.Id }) =>
    createAction({ type: CommerceTypes.SUCCEED_UPDATE_CART, payload }),
  failedUpdateCart: () =>
    createAction({ type: CommerceTypes.FAILED_UPDATE_CART }),
  // #endregion

  startPaymentCalc: () =>
    createAction({ type: CommerceTypes.START_PAYMENT_CALC }),
  succeedPaymentCalc: () =>
    createAction({ type: CommerceTypes.SUCCEED_PAYMENT_CALC }),
  failedPaymentCalc: () =>
    createAction({ type: CommerceTypes.FAILED_PAYMENT_CALC }),

  startFetchMyCreditHistories: () =>
    createAction({ type: CommerceTypes.START_FETCH_MY_CREDIT_HISTORIES }),
  succeedFetchMyCreditHistories: (payload: {
    type: "append" | "new";
    response: Moim.IPaginatedListResponse<Moim.Commerce.ICreditHistoryItem>;
    totalAmount?: number;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_MY_CREDIT_HISTORIES,
      payload,
    }),

  failedFetchMyCreditHistories: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_MY_CREDIT_HISTORIES }),

  openReviewWriteDialog: (payload: {
    mode: "new" | "edit";
    productId: Moim.Id;
    sellerId: Moim.Id;
    purchaseId: Moim.Id;
    meta?: Moim.Forum.IProductReviewThreadMeta;
    reviewId?: Moim.Id;
  }) => createAction({ type: CommerceTypes.OPEN_REVIEW_WRITE_DIALOG, payload }),
  closeReviewWriteDialog: () =>
    createAction({ type: CommerceTypes.CLOSE_REVIEW_WRITE_DIALOG }),

  openCancelPaymentDialog: (payload: {
    type: "payment" | "purchaseItems";
    targetPaymentId: Moim.Id | null;
    targetPurchaseItemIds: Moim.Id[];
    paymentStatus: Moim.Commerce.PurchaseStatusType;
    paymentMethodType: Moim.Commerce.PaymentMethodType;
  }) =>
    createAction({ type: CommerceTypes.OPEN_CANCEL_PAYMENT_DIALOG, payload }),
  closeCancelPaymentDialog: () =>
    createAction({ type: CommerceTypes.CLOSE_CANCEL_PAYMENT_DIALOG }),

  startFetchMyCoupons: () =>
    createAction({ type: CommerceTypes.START_FETCH_MY_COUPONS }),
  succeedFetchMyCoupons: (payload: {
    coupons: Moim.IPaginatedListResponse<Moim.Commerce.IAvailableStatusCoupon>;
    type: "active" | "deactive";
    isAppend: boolean;
  }) => createAction({ type: CommerceTypes.SUCCEED_FETCH_MY_COUPONS, payload }),
  failedFetchMyCoupons: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_MY_COUPONS }),

  startFetchMyAvailableCoupons: () =>
    createAction({ type: CommerceTypes.START_FETCH_MY_AVAILABLE_COUPONS }),
  succeedFetchMyAvailableCoupons: () =>
    createAction({ type: CommerceTypes.SUCCEED_FETCH_MY_AVAILABLE_COUPONS }),
  failedFetchMyAvailableCoupons: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_MY_AVAILABLE_COUPONS }),

  startManualPurchaseItemConfirm: () =>
    createAction({ type: CommerceTypes.START_MANUAL_PURCHASE_ITEM_CONFIRM }),
  succeedManualPurchaseItemConfirm: () =>
    createAction({ type: CommerceTypes.SUCCEED_MANUAL_PURCHASE_ITEM_CONFIRM }),
  failedManualPurchaseItemConfirm: () =>
    createAction({ type: CommerceTypes.FAILED_MANUAL_PURCHASE_ITEM_CONFIRM }),

  startCreateShippingAddress: () =>
    createAction({
      type: CommerceTypes.START_CREATE_SHIPPING_ADDRESS,
    }),
  succeedCreateShippingAddress: (payload: { id: Moim.Id }) =>
    createAction({
      type: CommerceTypes.SUCCEED_CREATE_SHIPPING_ADDRESS,
      payload,
    }),
  failedCreateShippingAddress: () =>
    createAction({
      type: CommerceTypes.FAILED_CREATE_SHIPPING_ADDRESS,
    }),

  startUpdateShippingAddress: () =>
    createAction({
      type: CommerceTypes.START_UPDATE_SHIPPING_ADDRESS,
    }),
  succeedUpdateShippingAddress: () =>
    createAction({
      type: CommerceTypes.SUCCEED_UPDATE_SHIPPING_ADDRESS,
    }),
  failedUpdateShippingAddress: () =>
    createAction({
      type: CommerceTypes.FAILED_UPDATE_SHIPPING_ADDRESS,
    }),

  startSetDefaultShippingAddress: () =>
    createAction({
      type: CommerceTypes.START_SET_AS_DEFAULT_SHIPPING_ADDRESS,
    }),
  succeedSetDefaultShippingAddress: () =>
    createAction({
      type: CommerceTypes.SUCCEED_SET_AS_DEFAULT_SHIPPING_ADDRESS,
    }),
  failedSetDefaultShippingAddress: () =>
    createAction({
      type: CommerceTypes.FAILED_SET_AS_DEFAULT_SHIPPING_ADDRESS,
    }),

  startDeleteShippingAddress: () =>
    createAction({
      type: CommerceTypes.START_DELETE_SHIPPING_ADDRESS,
    }),
  succeedDeleteShippingAddress: (payload: { id: Moim.Id }) =>
    createAction({
      type: CommerceTypes.SUCCEED_DELETE_SHIPPING_ADDRESS,
      payload,
    }),
  failedDeleteShippingAddress: () =>
    createAction({
      type: CommerceTypes.FAILED_DELETE_SHIPPING_ADDRESS,
    }),

  startFetchShippingAddressList: () =>
    createAction({
      type: CommerceTypes.START_FETCH_SHIPPING_ADDRESS_LIST,
    }),
  succeedFetchShippingAddressList: (payload: { ids: Moim.Id[] }) =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_SHIPPING_ADDRESS_LIST,
      payload,
    }),
  failedFetchShippingAddressList: () =>
    createAction({
      type: CommerceTypes.FAILED_FETCH_SHIPPING_ADDRESS_LIST,
    }),

  startFetchFundPurchaseItemList: () =>
    createAction({ type: CommerceTypes.START_FETCH_FUND_PURCHASE_ITEM_LIST }),
  succeedFetchFundPurchaseItemList: (payload: {
    loadType: "loadMore" | "new";
    productId: Moim.Id;
    participantList: Moim.Commerce.IPurchaseItemPurchase[];
    paging: Moim.IPaging;
  }) =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_FUND_PURCHASE_ITEM_LIST,
      payload,
    }),
  failedFetchFundPurchaseItemList: () =>
    createAction({ type: CommerceTypes.FAILED_FETCH_FUND_PURCHASE_ITEM_LIST }),

  succeedFetchPurchasedProductList: (
    result: Moim.IPaginatedListResponse<Moim.Id>,
  ) =>
    createAction({
      type: CommerceTypes.SUCCEED_FETCH_PURCHASED_PRODUCT_LIST,
      payload: {
        ...result,
      },
    }),

  startDownloadCoupon: () =>
    createAction({ type: CommerceTypes.START_DOWNLOAD_COUPON }),
  succeedDownloadCoupon: (id: Moim.Id) =>
    createAction({
      type: CommerceTypes.SUCCEED_DOWNLOAD_COUPON,
      payload: {
        id,
      },
    }),
  failedDownloadCoupon: () =>
    createAction({ type: CommerceTypes.FAILED_DOWNLOAD_COUPON }),

  startSearchDownloadCoupons: () =>
    createAction({ type: CommerceTypes.START_SEARCH_DOWNLOAD_COUPONS }),
  succeedSearchDownloadCoupons: () =>
    createAction({
      type: CommerceTypes.SUCCEED_SEARCH_DOWNLOAD_COUPONS,
    }),
  failedSearchDownloadCoupons: () =>
    createAction({ type: CommerceTypes.FAILED_SEARCH_DOWNLOAD_COUPONS }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getCommerceBasicInfo(): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startGetBasicInfo());
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).commerce.getBasicInfo();
      dispatch(ActionCreators.succeedGetBasicInfo(result));
    } catch (err) {
      dispatch(ActionCreators.failedGetBasicInfo());
    }
  };
}

export function getSellerProducts(
  sellerId: Moim.Id,
  cancelToken?: CancelToken,
  pageType: Moim.Commerce.PAGE_TYPE = "infinite",
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchSellerProducts());
    try {
      const result = productListNormalizer(
        await apiSelector(getState(), dispatch).commerce.getSellerProducts(
          sellerId,
          cancelToken,
        ),
      );
      dispatch(loadEntities(result.entities));
      dispatch(
        ActionCreators.succeedFetchSellerProducts({
          id: sellerId,
          data: result.result,
          pageType,
        }),
      );
    } catch {
      dispatch(ActionCreators.failedFetchSellerProducts());
    }
  };
}

export function getSellerCategories(
  ...args: Parameters<typeof CommerceAPI.prototype.getSellerCategories>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchSellerCategories());
    try {
      const result = commerceCategoryListNormalizer(
        await apiSelector(getState(), dispatch).commerce.getSellerCategories(
          ...args,
        ),
      );
      dispatch(loadEntities(result.entities));
      dispatch(
        ActionCreators.succeedFetchSellerCategories({
          id: args[0],
          data: result.result,
        }),
      );
    } catch {
      dispatch(ActionCreators.failedFetchSellerCategories());
    }
  };
}

export function getSellerSubSellers(
  sellerId: Moim.Id,
  cancelToken?: CancelToken,
  pageType: Moim.Commerce.PAGE_TYPE = "infinite",
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchSellerSubSellers());
    try {
      const result = sellerListNormalizer(
        await apiSelector(getState(), dispatch).commerce.getSellerSubSellers(
          sellerId,
          cancelToken,
        ),
      );
      dispatch(loadEntities(result.entities));
      dispatch(
        ActionCreators.succeedFetchSellerSubSellers({
          id: sellerId,
          data: result.result,
          pageType,
        }),
      );
    } catch {
      dispatch(ActionCreators.failedFetchSellerSubSellers());
    }
  };
}

export function getSellerProductSets(
  sellerId: Moim.Id,
  cancelToken?: CancelToken,
  pageType: Moim.Commerce.PAGE_TYPE = "infinite",
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchSellerProductSets());
    try {
      const result = productSetListNormalizer(
        await apiSelector(getState(), dispatch).commerce.getSellerProductSets(
          sellerId,
          cancelToken,
        ),
      );
      dispatch(loadEntities(result.entities));
      dispatch(
        ActionCreators.succeedFetchSellerProductSets({
          id: sellerId,
          data: result.result,
          pageType,
        }),
      );
    } catch {
      dispatch(ActionCreators.failedFetchSellerProductSets());
    }
  };
}

let bufferedBatchProductsInstance:
  | ((ids: Moim.Id[]) => Promise<void>)
  | undefined;

export function bufferedBatchProducts(ids: Moim.Id[]): ThunkPromiseResult {
  return async dispatch => {
    try {
      if (bufferedBatchProductsInstance) {
        bufferedBatchProductsInstance(ids);
      } else {
        bufferedBatchProductsInstance = buffer({
          ms: 150,
          async subscribedFn(mergeIds: Moim.Id[][]) {
            const flattenIds = _.flatten(mergeIds);
            const entities = await batchCommerceProduct(flattenIds);
            dispatch(loadEntities(entities));
          },
        });
        bufferedBatchProductsInstance(ids);
      }
    } catch {}
  };
}

export function getBatchProducts(productIds: Moim.Id[]): ThunkPromiseResult {
  return async dispatch => {
    const entities = await batchCommerceProduct(productIds);

    dispatch(AddEntities(entities));
    const sellerIds = _.uniq(
      Object.values(entities.commerce_product).reduce<Moim.Id[]>(
        (result, current: Moim.Commerce.IProduct) =>
          result.concat(current.sellerId),
        [],
      ),
    );
    dispatch(getBatchSeller(sellerIds));
    const coinIds = _.uniq(
      Object.values(entities.commerce_product).reduce<Moim.Id[]>(
        (result, current: Moim.Commerce.IProduct) =>
          result.concat(
            current.additionalFeeInfos
              ?.map(info => info.resourceId)
              .filter((id): id is string => Boolean(id)) ?? [],
          ),
        [],
      ),
    );
    dispatch(getBatchCoin(coinIds));
  };
}

export function getBatchProductSets(
  setId: Moim.Id,
  maxCount?: number,
): ThunkPromiseResult {
  return async dispatch => {
    const entities = await batchCommerceProductSet([setId]);
    if (!isEmpty(entities)) {
      dispatch(AppActionCreators.addEntity(entities));
      const productIds = _.uniq(
        Object.values(entities.commerce_productSet).reduce<Moim.Id[]>(
          (result, current: Moim.Commerce.IProductSet) =>
            result.concat(current.productIds),
          [],
        ),
      ).slice(0, maxCount);
      dispatch(getBatchProducts(productIds));
    }
  };
}

export function getBatchSeller(ids: Moim.Id[]): ThunkPromiseResult {
  return async dispatch => {
    batchCommerceSeller(ids).then(entities => {
      dispatch(AddEntities(entities));
    });
  };
}
export function getBatchCoin(ids: Moim.Id[]): ThunkPromiseResult {
  return async dispatch => {
    batchCoin(ids).then(entities => {
      dispatch(AddEntities(entities));
    });
  };
}

export function getBatchVariant(ids: Moim.Id[]): ThunkPromiseResult {
  return async dispatch => {
    batchCommerceVariant(ids).then(entities => {
      dispatch(AddEntities(entities));
    });
  };
}

let bufferedBatchCouponInstance:
  | ((ids: Moim.Id[]) => Promise<void>)
  | undefined;

export function bufferedBatchCoupon(ids: Moim.Id[]): ThunkPromiseResult {
  return async dispatch => {
    try {
      if (bufferedBatchCouponInstance) {
        bufferedBatchCouponInstance(ids);
      } else {
        bufferedBatchCouponInstance = buffer({
          ms: 150,
          async subscribedFn(mergeIds: Moim.Id[][]) {
            const flattenIds = _.flatten(mergeIds);
            const entities = await batchCommerceCoupon(flattenIds);
            dispatch(loadEntities(entities));
          },
        });
        bufferedBatchCouponInstance(ids);
      }
      // eslint-disable-next-line no-empty
    } catch {}
  };
}

export function simpleSearchSellerProducts(
  sellerId: Moim.Id,
  options: ISearchOptions = {},
  isAll?: boolean,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.IPaginatedListResponse<Moim.Id>> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const { entities, result } = productListNormalizer(
        await apiSelector(getState(), dispatch).commerce.searchSellerProducts(
          sellerId,
          {
            ...options,
            categoryIds: isAll ? undefined : options.categoryIds,
          },
          cancelToken,
        ),
      );
      dispatch(AppActionCreators.addEntity(entities));
      const sellerIds = entities.commerce_product
        ? _.uniq(
            Object.values(entities.commerce_product).reduce<Moim.Id[]>(
              (result, current: Moim.Commerce.IProduct) =>
                result.concat(current.sellerId),
              [],
            ),
          )
        : null;

      if (sellerIds) {
        dispatch(getBatchSeller(sellerIds));
      }

      const coinIds = _.uniq(
        Object.values(entities.commerce_product).reduce<Moim.Id[]>(
          (result, current: Moim.Commerce.IProduct) =>
            result.concat(
              current.additionalFeeInfos
                ?.map(info => info.resourceId)
                .filter((id): id is string => Boolean(id)) ?? [],
            ),
          [],
        ),
      );
      if (coinIds) {
        dispatch(getBatchCoin(coinIds));
      }

      return result;
    } catch (err) {
      throw err;
    }
  };
}

export function searchSellerProducts(
  sellerId: Moim.Id,
  options: ISearchOptions = {},
  isAll?: boolean,
  cancelToken?: CancelToken,
  pageType: Moim.Commerce.PAGE_TYPE = "infinite",
): ThunkPromiseResult<Moim.IPaginatedListResponse<Moim.Id>> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startSearchSellerProducts());
    try {
      const { entities, result } = productListNormalizer(
        await apiSelector(getState(), dispatch).commerce.searchSellerProducts(
          sellerId,
          {
            ...options,
            categoryIds: isAll ? undefined : options.categoryIds,
          },
          cancelToken,
        ),
      );
      dispatch(AppActionCreators.addEntity(entities));
      const sellerIds = entities.commerce_product
        ? _.uniq(
            Object.values(entities.commerce_product).reduce<Moim.Id[]>(
              (result, current: Moim.Commerce.IProduct) =>
                result.concat(current.sellerId),
              [],
            ),
          )
        : null;

      if (sellerIds) {
        dispatch(getBatchSeller(sellerIds));
      }

      const coinIds = _.uniq(
        Object.values(entities.commerce_product).reduce<Moim.Id[]>(
          (result, current: Moim.Commerce.IProduct) =>
            result.concat(
              current.additionalFeeInfos
                ?.map(info => info.resourceId)
                .filter((id): id is string => Boolean(id)) ?? [],
            ),
          [],
        ),
      );
      if (coinIds) {
        dispatch(getBatchCoin(coinIds));
      }
      dispatch(
        ActionCreators.succeedSearchSellerProducts({
          id: `${sellerId}${
            options.categoryIds ? `-${options.categoryIds.join("-")}` : ""
          }${options.deliveryGroupId ? `-${options.deliveryGroupId}` : ""}`,
          data: result,
          pageType,
        }),
      );
      return result;
    } catch (err) {
      dispatch(ActionCreators.failedSearchSellerProducts());
      throw err;
    }
  };
}

export function searchProductsByQuery(
  sellerId: Moim.Id,
  options: ISearchOptions = {},
  callIndex?: number,
  isAll?: boolean,
  cancelToken?: CancelToken,
  pageType: Moim.Commerce.PAGE_TYPE = "paginated",
): ThunkPromiseResult<Moim.IPaginatedListResponse<Moim.Id>> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startSearchProductsByQuery());
    try {
      const { entities, result } = productListNormalizer(
        await apiSelector(getState(), dispatch).commerce.searchSellerProducts(
          sellerId,
          {
            ...options,
            categoryIds: isAll ? undefined : options.categoryIds,
          },
          cancelToken,
        ),
      );
      dispatch(loadEntities(entities));
      dispatch(
        ActionCreators.succeedSearchProductsByQuery({
          data: result,
          pageType,
          callIndex,
        }),
      );
      return result;
    } catch (err) {
      dispatch(ActionCreators.failedSearchProductsByQuery());
      throw err;
    }
  };
}

const visitedProducts: string[] = JSON.parse(
  SessionHandler.get("VISITED_PRODUCTS", "[]") ?? "[]",
);

const checkAlreadyVisited = (productId: Moim.Id) =>
  new Set(visitedProducts).has(productId);

const writeVisitedProduct = (productId: Moim.Id) => {
  const visitedProductSet = new Set(visitedProducts);
  visitedProductSet.add(productId);
  SessionHandler.set(
    "VISITED_PRODUCTS",
    JSON.stringify(Array.from(visitedProductSet)),
  );
};

export function getProductDataWithoutView(
  productId: Moim.Id,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchSellerProductData());
    try {
      const productDataResponse = await apiSelector(
        getState(),
        dispatch,
      ).commerce.getProductData(productId);

      const response = productNormalizer(productDataResponse);

      dispatch(loadEntities(response.entities));
      dispatch(
        ActionCreators.succeedFetchSellerProductData({
          productId,
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedFetchSellerProductData());
      throw err;
    }
  };
}

export function getProductData(
  productId: Moim.Id,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.Commerce.IProduct> {
  return async (dispatch, getState, { apiSelector }) => {
    let result: Moim.Commerce.IProduct;

    dispatch(ActionCreators.startFetchSellerProductData());
    try {
      const [
        productDataResponse,
        threadDataResponse,
      ] = await Promise.allSettled([
        apiSelector(getState(), dispatch).commerce.getProductData(
          productId,
          cancelToken,
        ),
        apiSelector(getState(), dispatch).forum.getThreadShow(productId),
      ]);

      if (productDataResponse.status === "rejected") {
        throw new Error();
      }
      if (threadDataResponse.status === "fulfilled") {
        const thread = threadDataResponse.value;
        const threadData = threadSingleItemNormalizer(thread);
        dispatch(loadEntities(threadData.entities));
      }

      result = productDataResponse.value;
      const response = productNormalizer(result);

      dispatch(loadEntities(response.entities));
      dispatch(
        ActionCreators.succeedFetchSellerProductData({
          productId,
        }),
      );

      if (
        !checkAlreadyVisited(productId) &&
        getState().app.currentUserId === null
      ) {
        apiSelector(getState(), dispatch).commerce.visitProductShow(productId);
        writeVisitedProduct(productId);
      } else if (getState().app.currentUserId) {
        apiSelector(getState(), dispatch).commerce.visitProductShow(productId);
      }

      return result;
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedFetchSellerProductData());
      throw err;
    }
  };
}

export function getSellerData(
  sellerId: Moim.Id,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchSellerData());
    try {
      const response = sellerNormalizer(
        await apiSelector(getState(), dispatch).commerce.getSellerData(
          sellerId,
          cancelToken,
        ),
      );
      dispatch(loadEntities(response.entities));
      dispatch(
        ActionCreators.succeedFetchSellerData({
          sellerId,
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedFetchSellerData());
      throw err;
    }
  };
}

export function getProductThreads(
  type: Moim.Forum.THREAD_TYPE,
  params: Parameters<typeof ForumAPI.prototype.getCommentList>[0],
  cancelToken: Parameters<typeof ForumAPI.prototype.getCommentList>[1],
): ThunkPromiseResult<Moim.IPaginatedListResponse<string>> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const threads = threadListNormalizer(
        await apiSelector(getState(), dispatch).forum.getCommentList(
          { ...params, type },
          cancelToken,
        ),
      );

      dispatch(loadEntities(threads.entities));

      return threads.result;
    } catch (err) {
      if (err instanceof Error) {
        const error = errorParseData(err);
        if (error?.message) {
          dispatch(
            SnackBarActionCreators.openSnackbar({
              text: error?.message,
            }),
          );
        }
      }
      throw err;
    }
  };
}

export function getProductReviews(
  params: Parameters<typeof ForumAPI.prototype.getCommentList>[0],
  cancelToken: Parameters<typeof ForumAPI.prototype.getCommentList>[1],
  callIndex: number,
): ThunkPromiseResult {
  return async dispatch => {
    dispatch(ActionCreators.startFetchProductReviews());
    try {
      const reviews = await dispatch(
        getProductThreads("productReview", params, cancelToken),
      );

      dispatch(
        ActionCreators.succeedFetchProductReviews({
          productId: params.threadId,
          reviews,
          callIndex,
        }),
      );
    } catch (err) {
      dispatch(ActionCreators.failedFetchProductReviews());
      throw err;
    }
  };
}

export function createProductReview(
  purchaseId?: Moim.Id,
  purchaseItemId?: Moim.Id,
  ...params: Parameters<typeof ForumAPI.prototype.postReply>
): ThunkPromiseResult<Moim.Forum.IThread | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startCreateProductReview());
    try {
      const review = await apiSelector(getState(), dispatch).forum.postReply(
        {
          ...params[0],
          type: "productReview",
        },
        params[1],
      );
      const normalized = threadSingleItemNormalizer(review);
      dispatch(loadEntities(normalized.entities));
      dispatch(
        ActionCreators.succeedCreateProductReview({
          productId: params[0].threadId,
          reviewId: normalized.result.data,
          purchaseItemId,
          purchaseId,
        }),
      );

      dispatch(
        SnackBarActionCreators.openSnackbar({
          textKey: "toast_message_write_review_success",
          type: "success",
        }),
      );

      return review.data;
    } catch (err) {
      dispatch(
        SnackBarActionCreators.openSnackbar({
          textKey: "toast_message_write_review_failure",
          type: "error",
        }),
      );

      dispatch(ActionCreators.failedCreateProductReview());
      throw err;
    }
  };
}

export function updateProductReview(
  ...params: Parameters<typeof ForumAPI.prototype.editComment>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startUpdateProductReview());
    try {
      const review = threadSingleItemNormalizer(
        await apiSelector(getState(), dispatch).forum.editComment({
          ...params[0],
          type: "productReview",
        }),
      );
      dispatch(loadEntities(review.entities));
      dispatch(
        ActionCreators.succeedUpdateProductReview({
          reviewId: review.result.data,
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedUpdateProductReview());
      throw err;
    }
  };
}

export function deleteProductReview(
  sellerId: Moim.Id,
  productId: Moim.Id,
  parentId: Moim.Id,
  reviewId: Moim.Id,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startDeleteProductReview());
    try {
      await apiSelector(getState(), dispatch).forum.deleteReply({
        forumId: sellerId,
        threadId: productId,
        replyId: reviewId,
      });
      dispatch(
        ActionCreators.succeedDeleteProductReview({
          productId,
          parentId,
          reviewId,
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedDeleteProductReview());
      throw err;
    }
  };
}

export function getProductQuestions(
  params: Parameters<typeof ForumAPI.prototype.getCommentList>[0],
  cancelToken: Parameters<typeof ForumAPI.prototype.getCommentList>[1],
  callIndex: number,
): ThunkPromiseResult {
  return async dispatch => {
    dispatch(ActionCreators.startFetchProductQuestions());
    try {
      const questions = await dispatch(
        getProductThreads("productQuestion", params, cancelToken),
      );
      dispatch(
        ActionCreators.succeedFetchProductQuestions({
          productId: params.threadId,
          questions,
          callIndex,
        }),
      );
    } catch (err) {
      dispatch(ActionCreators.failedFetchProductQuestions());
      throw err;
    }
  };
}

export function createProductQuestion(
  ...params: Parameters<typeof ForumAPI.prototype.postReply>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startCreateProductQuestion());
    try {
      const review = threadSingleItemNormalizer(
        await apiSelector(getState(), dispatch).forum.postReply(
          {
            ...params[0],
            type: "productQuestion",
          },
          params[1],
        ),
      );
      dispatch(loadEntities(review.entities));
      dispatch(
        ActionCreators.succeedCreateProductQuestion({
          productId: params[0].threadId,
          questionId: review.result.data,
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedCreateProductQuestion());
      throw err;
    }
  };
}

export function updateProductQuestion(
  ...params: Parameters<typeof ForumAPI.prototype.editComment>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startUpdateProductQuestion());
    try {
      const review = threadSingleItemNormalizer(
        await apiSelector(getState(), dispatch).forum.editComment({
          ...params[0],
          type: "productQuestion",
        }),
      );
      dispatch(loadEntities(review.entities));
      dispatch(
        ActionCreators.succeedUpdateProductQuestion({
          questionId: review.result.data,
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedUpdateProductQuestion());
      throw err;
    }
  };
}

export function deleteProductQuestion(
  sellerId: Moim.Id,
  productId: Moim.Id,
  parentId: Moim.Id,
  questionId: Moim.Id,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startDeleteProductQuestion());
    try {
      await apiSelector(getState(), dispatch).forum.deleteReply({
        forumId: sellerId,
        threadId: productId,
        replyId: questionId,
      });
      dispatch(
        ActionCreators.succeedDeleteProductQuestion({
          productId,
          parentId,
          questionId,
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedDeleteProductQuestion());
      throw err;
    }
  };
}

export function getFundComments(
  params: Parameters<typeof ForumAPI.prototype.getCommentList>[0],
  cancelToken: Parameters<typeof ForumAPI.prototype.getCommentList>[1],
  callIndex: number,
): ThunkPromiseResult {
  return async dispatch => {
    dispatch(ActionCreators.startFetchFundComments());
    try {
      const comments = await dispatch(
        getProductThreads("productComment", params, cancelToken),
      );
      dispatch(
        ActionCreators.succeedFetchFundComments({
          productId: params.threadId,
          comments,
          callIndex,
        }),
      );
    } catch (err) {
      dispatch(ActionCreators.failedFetchFundComments());
      throw err;
    }
  };
}

export function createFundComment(
  ...params: Parameters<typeof ForumAPI.prototype.postReply>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startCreateFundComment());
    try {
      const review = threadSingleItemNormalizer(
        await apiSelector(getState(), dispatch).forum.postReply(
          {
            ...params[0],
            type: "productComment",
          },
          params[1],
        ),
      );
      dispatch(loadEntities(review.entities));
      dispatch(
        ActionCreators.succeedCreateFundComment({
          productId: params[0].threadId,
          commentId: review.result.data,
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedCreateFundComment());
      throw err;
    }
  };
}

export function updateFundComment(
  ...params: Parameters<typeof ForumAPI.prototype.editComment>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startUpdateFundComment());
    try {
      const review = threadSingleItemNormalizer(
        await apiSelector(getState(), dispatch).forum.editComment({
          ...params[0],
          type: "productComment",
        }),
      );
      dispatch(loadEntities(review.entities));
      dispatch(
        ActionCreators.succeedUpdateFundComment({
          commentId: review.result.data,
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedUpdateFundComment());
      throw err;
    }
  };
}

export function deleteFundComment(
  sellerId: Moim.Id,
  productId: Moim.Id,
  parentId: Moim.Id,
  commentId: Moim.Id,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startDeleteFundComment());
    try {
      await apiSelector(getState(), dispatch).forum.deleteReply({
        forumId: sellerId,
        threadId: productId,
        replyId: commentId,
      });
      dispatch(
        ActionCreators.succeedDeleteFundComment({
          productId,
          parentId,
          commentId,
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedDeleteFundComment());
      throw err;
    }
  };
}

export function getVotedProductList(
  payload: Moim.IPaging,
): ThunkPromiseResult<Moim.IPaginatedListResponse<
  Moim.Commerce.IProduct
> | null> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).commerce.getVotedProductList(payload);

      dispatch(AddEntities(productListNormalizer(result).entities));
      return result;
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }

      return null;
    }
  };
}
export function putProductVote(
  productId: Moim.Id,
  prevStatus: Moim.Enums.VoteStatus,
  nextStatus: Moim.Enums.VoteStatus,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(
      ActionCreators.startPutProductVote({ productId, status: nextStatus }),
    );

    try {
      const result = productNormalizer(
        await apiSelector(getState(), dispatch).commerce.productVote(
          productId,
          nextStatus,
        ),
      );
      dispatch(loadEntities(result.entities));
      dispatch(
        ActionCreators.succeedPutProductVote({ productId, status: nextStatus }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }

      dispatch(
        ActionCreators.failedPutProductVote({ productId, status: prevStatus }),
      );
      throw err;
    }
  };
}

export function getCarts(sellerId: Moim.Id): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchCart());
    try {
      const result = await apiSelector(getState(), dispatch).commerce.getCart(
        sellerId,
      );
      const normalized = cartResponseNormalizer(result);
      dispatch(AddEntities(normalized.entities));

      dispatch(
        AddEntities({
          ...(await batchCommerceSeller(
            result.items.map(item => item.sellerId).filter(id => Boolean(id)),
          )),
          ...(await batchCoin(
            _.uniq(
              Object.values(normalized.entities.commerce_product).reduce<
                string[]
              >((result, current) => {
                if (current.additionalFeeInfos) {
                  result.push(
                    ...current.additionalFeeInfos?.reduce<string[]>(
                      (result_1, current_1) => {
                        if (current_1.resourceId) {
                          result_1.push(current_1.resourceId);
                        }

                        return result_1;
                      },
                      [],
                    ),
                  );
                }

                return result;
              }, []),
            ),
          )),
        }),
      );

      dispatch(
        ActionCreators.succeedFetchCart({
          cart: normalized.result,
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.code !== "NOT_FOUND" && error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }

      dispatch(ActionCreators.failedFetchCart());
      throw err;
    }
  };
}

export function addToCart(
  hubSellerId: Moim.Id,
  items: Moim.Commerce.IFlattenedCartSellerItem[],
  onSuccess?: () => void,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startAddToCart());
    try {
      const result = await apiSelector(getState(), dispatch).commerce.addToCart(
        hubSellerId,
        items,
      );

      const normalized = cartResponseNormalizer(result);

      dispatch(
        AddEntities({
          ...normalized.entities,
          ...(await batchCommerceSeller(
            result.items.map(item => item.sellerId).filter(id => Boolean(id)),
          )),
        }),
      );

      dispatch(
        ActionCreators.succeedAddToCart({
          cart: normalized.result,
        }),
      );

      onSuccess?.();
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }

      dispatch(ActionCreators.failedAddToCart());
      throw err;
    }
  };
}

export function updateCart(
  hubSellerId: Moim.Id,
  items: Moim.Commerce.IFlattenedCartSellerItem[],
  successMessage?: string,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startUpdateCart());
    const state = getState();

    try {
      const result = await apiSelector(state, dispatch).commerce.updateCart(
        hubSellerId,
        items.map(item => ({
          items: item.items.map(x => {
            const buyable = getCartItemBuyableSelector(x, state);

            return { ...x, checked: buyable ? x.checked : false };
          }),
          sellerId: item.sellerId,
        })),
        cancelToken,
      );

      const normalized = cartResponseNormalizer(result);

      dispatch(
        AddEntities({
          ...normalized.entities,
          ...(await batchCommerceSeller(
            result.items.map(item => item.sellerId).filter(id => Boolean(id)),
          )),
        }),
      );

      dispatch(
        ActionCreators.succeedUpdateCart({
          cart: normalized.result,
        }),
      );

      if (successMessage) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: successMessage,
            type: "success",
          }),
        );
      }
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }

      dispatch(ActionCreators.failedUpdateCart());

      throw err;
    }
  };
}

export function paymentCalc(
  hubSellerId: Moim.Id,
  payload: {
    items: Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem[];
    userCouponIds?: string[];
    selectRecommendedCoupon?: boolean;
    useCoinMaxPrice?: boolean;
  },
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.Commerce.IPaymentCalcResponse> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startPaymentCalc());
    const { items, ...rest } = payload;
    try {
      const state = getState();
      const productVariantEntities = state.entities.commerce_variants;
      const productEntities = state.entities.commerce_product;
      const result = await apiSelector(state, dispatch).commerce.calcPayment(
        hubSellerId,
        {
          ...rest,
          items: payload.items
            .map(item => {
              const newItems = item.groupedItems.map<
                Moim.Commerce.IGroupedByDeliveryOptionItemDatum | undefined
              >(_item => ({
                ..._item,
                items: _item.items
                  .filter(i => {
                    const product = productEntities[i.productId];
                    const productVariant = i.productVariantId
                      ? productVariantEntities[i.productVariantId]
                      : undefined;

                    if (productVariant) {
                      return productVariant.status === "onSale";
                    } else if (product) {
                      return product.status === "onSale";
                    }
                    return true;
                  })
                  .map(
                    x =>
                      ({
                        productId: x.productId,
                        productVariantId: x.productVariantId,
                        quantity: x.quantity,
                        checked: x.checked,
                      } as any),
                  ),
              }));

              if (newItems.length === 0) return undefined;
              return {
                groupedItems: newItems,
                sellerId: item.sellerId,
              };
            })
            .filter(
              (i): i is Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem =>
                Boolean(i),
            ),
        },
        cancelToken,
      );

      dispatch(ActionCreators.succeedPaymentCalc());

      return result;
    } catch (err) {
      const error = errorParseData(err);
      if (error) {
        switch (error.code) {
          case CALC_422_CODE.SHIPPING_INFO_REQUIRED:
          case CALC_422_CODE.PID_REQUIRED:
          case CALC_422_CODE.REQUIRED_PARAMS:
          case CALC_422_CODE.CONFIRMATION_REQUIRED:
          case CALC_422_CODE.MULTIPLE_COUPONS_LIMITED:
          case CALC_422_CODE.INVALID_COUPON:
          case CALC_422_CODE.EXCEEDED_CREDIT:
          case CALC_422_CODE.INVALID_AMOUNT:
          case CALC_422_CODE.INVALID_PRODUCT_TYPE:
          case CALC_422_CODE.INVALID_CURRENCY:
          case CALC_422_CODE.INVALID_PRODUCT_VARIANT_ID:
          case CALC_422_CODE.INVALID_PRODUCT_STATUS:
          case CALC_422_CODE.INVALID_PRODUCT_SELLER:
          case CALC_422_CODE.PRODUCT_NOT_AVAILABLE:
          case CALC_422_CODE.EXCEEDED_STOCK_COUNT: {
            break;
          }

          case CALC_403_CODE.INVALID_HOLDER:
          case CALC_403_CODE.INVALID_LIMITATION: {
            break;
          }

          default: {
            dispatch(
              SnackBarActionCreators.openSnackbar({
                text: error?.message,
                type: "error",
              }),
            );
            break;
          }
        }
      }

      dispatch(ActionCreators.failedPaymentCalc());
      throw err;
    }
  };
}

const CALC_422_CODE = {
  SHIPPING_INFO_REQUIRED: "SHIPPING_INFO_REQUIRED", // 배송정보 누락
  PID_REQUIRED: "PID_REQUIRED", // PID 누락
  REQUIRED_PARAMS: "REQUIRED_PARAMS", // custom field required field 입력 누락
  CONFIRMATION_REQUIRED: "CONFIRMATION_REQUIRED", // confirmation check box 체크 누락
  MULTIPLE_COUPONS_LIMITED: "MULTIPLE_COUPONS_LIMITED", // (임시) 쿠폰 여러장 사용
  INVALID_COUPON: "INVALID_COUPON", // 사용 불가능한 쿠폰
  EXCEEDED_CREDIT: "EXCEEDED_CREDIT", // 적립금 초과 사용 (잔액보다 많이 사용)
  INVALID_AMOUNT: "INVALID_AMOUNT", // 적립금 조건 위반 (최소/최대 금액 미달 또는 초과)
  INVALID_PRODUCT_TYPE: "INVALID_PRODUCT_TYPE", // 구독상품을 장바구니에 담아서 결제 시도
  INVALID_CURRENCY: "INVALID_CURRENCY", // 지원하지 않는 currency
  INVALID_PRODUCT_VARIANT_ID: "INVALID_PRODUCT_VARIANT_ID", // 잘못된 variantId
  INVALID_PRODUCT_STATUS: "INVALID_PRODUCT_STATUS", // 구매불가능 상태 상품 포함
  INVALID_PRODUCT_SELLER: "INVALID_PRODUCT_SELLER", // 상품과 판매자 매칭 실패 (grouping 이 잘못됨)
  PRODUCT_NOT_AVAILABLE: "PRODUCT_NOT_AVAILABLE", // 판매 기간이 아님
  EXCEEDED_STOCK_COUNT: "EXCEEDED_STOCK_COUNT", // 재고 수량 부족
};

export const CALC_403_CODE = {
  INVALID_HOLDER: "INVALID_HOLDER", // Invalid Right Holder
  INVALID_LIMITATION: "INVALID_LIMITATION", // Invalid Right Limitation
};

// NOTE: THIS calcPayment API use is temporary
export function cartItemCheck(
  hubSellerId: Moim.Id,
  items: Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem[],
): ThunkPromiseResult<string | Moim.Commerce.IPaymentCalcResponse | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).commerce.calcPayment(hubSellerId, {
        items: items.map(item => ({
          groupedItems: item.groupedItems.map(groupedItem => ({
            ...groupedItem,
            items: groupedItem.items.map(x => ({
              productId: x.productId,
              productVariantId: x.productVariantId,
              quantity: x.quantity,
              checked: x.checked,
              disabled: x.disabled,
              disableReason: x.disabledReason,
            })),
          })),
          sellerId: item.sellerId,
        })),
      });

      return result;
    } catch (err) {
      const error = errorParseData(err);
      if (error) {
        switch (error.code) {
          case CALC_422_CODE.PRODUCT_NOT_AVAILABLE:
          case CALC_422_CODE.INVALID_PRODUCT_STATUS: {
            dispatch(
              SnackBarActionCreators.openSnackbar({
                type: "error",
                textKey: "buy_toast_message_error_product_unavailable",
              }),
            );
            break;
          }

          case CALC_403_CODE.INVALID_HOLDER: {
            break;
          }

          case CALC_403_CODE.INVALID_LIMITATION: {
            break;
          }

          default: {
            dispatch(
              SnackBarActionCreators.openSnackbar({
                textKey: "buy_toast_message_error_general",
                type: "error",
              }),
            );
            break;
          }
        }
      }

      return error?.code || "error";
    }
  };
}

export function getPayments(
  hubSellerId: Moim.Id,
  paging?: Moim.IPaging,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.IPaginatedListResponse<Moim.Id> | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchPayments());
    try {
      const result = paymentListNormalizer(
        await apiSelector(getState(), dispatch).commerce.getPayments(
          hubSellerId,
          paging,
          cancelToken,
        ),
      );
      dispatch(loadEntities(result.entities));
      dispatch(ActionCreators.succeedFetchPayments());
      return result.result;
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedFetchPayments());
      throw err;
    }
  };
}

export function getPayment(
  paymentId: string,
  cancelToken?: CancelToken,
): ThunkPromiseResult<Moim.Id | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchPayment());
    try {
      const result = paymentNormalizer(
        await apiSelector(getState(), dispatch).commerce.getPayment(
          paymentId,
          cancelToken,
        ),
      );
      dispatch(loadEntities(result.entities));
      dispatch(ActionCreators.succeedFetchPayment());
      return result.result;
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedFetchPayment());
      throw err;
    }
  };
}

export function cancelPayment(
  paymentId: Moim.Id,
  cancelReason: string,
  refundBankMethod?: Moim.Commerce.IRefundBankMethod,
  successMessage?: string,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startCancelPayment());
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).commerce.paymentCancel(paymentId, cancelReason, refundBankMethod);
      if (result.purchases.length) {
        const normalizedPurchases = purchaseListNormalizer({
          data: result.purchases.map(purchase => ({
            ...purchase,
            payment: result,
          })),
          paging: {},
        });
        dispatch(loadEntities(normalizedPurchases.entities));
      }
      dispatch(ActionCreators.succeedCancelPayment({ paymentId }));
      dispatch(
        SnackBarActionCreators.openSnackbar({
          text: successMessage,
          type: "success",
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedCancelPayment());
      throw err;
    }
  };
}

export function getRefund(
  paymentId: Moim.Id,
  cancelToken?: CancelToken,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchRefund());
    try {
      await apiSelector(getState(), dispatch).commerce.getRefund(
        paymentId,
        cancelToken,
      );
      dispatch(ActionCreators.succeedFetchRefund());
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedFetchRefund());
      throw err;
    }
  };
}

export function manualPurchaseItemConfirm(
  purchaseItemIds: Moim.Id[],
): ThunkPromiseResult<Moim.IPaginatedListResponse<Moim.Id> | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startManualPurchaseItemConfirm());
    try {
      const result = purchaseListNormalizer(
        await apiSelector(getState(), dispatch).commerce.manualPurchaseConfirm(
          purchaseItemIds,
        ),
      );
      dispatch(loadEntities(result.entities));
      dispatch(ActionCreators.succeedManualPurchaseItemConfirm());

      return result.result;
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(
        SnackBarActionCreators.openSnackbar({
          textKey: "error_confirm_purchase",
          type: "error",
        }),
      );
      dispatch(ActionCreators.failedManualPurchaseItemConfirm());
      throw err;
    }
  };
}

export function fetchMyCreditHistories(
  hubSellerId: Moim.Id,
  after?: Moim.PagingValue,
  limit?: number,
  includeTotalAmount?: boolean,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchMyCreditHistories());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).commerce.getMyCreditHistory(hubSellerId, {
        after,
        limit,
        includeTotalAmount,
      });
      dispatch(
        ActionCreators.succeedFetchMyCreditHistories({
          type: after ? "append" : "new",
          response,
          totalAmount: response.totalAmount,
        }),
      );
      return;
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedFetchMyCreditHistories());
      throw err;
    }
  };
}

export function fetchMyCoupons(
  hubSellerId: Moim.Id,
  type: "active" | "deactive",
  after?: Moim.PagingValue,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchMyCoupons());
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).commerce.getMyCoupons(hubSellerId, type, after);
      dispatch(
        ActionCreators.succeedFetchMyCoupons({
          coupons: result,
          type,
          isAppend: Boolean(after),
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedFetchMyCoupons());
      throw err;
    }
  };
}

export function fetchMyAvailableCoupons(
  hubSellerId: Moim.Id,
  items: Moim.Commerce.IFlattenedCartSellerItem[],
  after?: Moim.PagingValue,
): ThunkPromiseResult<
  Moim.IPaginatedListResponse<Moim.Commerce.IAvailableStatusCoupon>
> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchMyAvailableCoupons());
    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).commerce.getMyAvailableCoupons(hubSellerId, items, after);
      dispatch(ActionCreators.succeedFetchMyAvailableCoupons());
      return result;
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedFetchMyAvailableCoupons());
      throw err;
    }
  };
}

export function fetchMyShippingAddress(): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startFetchShippingAddressList());
    try {
      const result = shippingAddressListNormalizer(
        await apiSelector(getState(), dispatch).commerce.getShippingAddress(),
      );
      dispatch(loadEntities(result.entities));
      dispatch(
        ActionCreators.succeedFetchShippingAddressList({
          ids: result.result.data,
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedFetchShippingAddressList());
      throw err;
    }
  };
}

export function createShippingAddress(
  params: {
    name: string;
    recipientName: string;
    recipientPhone?: {
      countryCode: string;
      nationalNumber: string;
    };
    address: string;
    address2: string;
    zipCode: string;
    memo?: string;
    countryCode?: string;
    city?: string;
    state?: string;
  },
  setAsDefault?: boolean,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const hubSellerId = currentGroupSelector(getState())?.seller_id;
    dispatch(ActionCreators.startCreateShippingAddress());

    try {
      const result = shippingAddressNormalizer(
        await apiSelector(getState(), dispatch).commerce.createShippingAddress({
          ...params,
          hubSellerId,
        }),
      );

      if (setAsDefault) {
        dispatch(setAsDefaultShippingAddress(result.result));
      }
      dispatch(loadEntities(result.entities));
      dispatch(
        ActionCreators.succeedCreateShippingAddress({
          id: result.result,
        }),
      );
      dispatch(
        SnackBarActionCreators.openSnackbar({
          textKey: "add_address_toast_message_success",
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error) {
        switch (error.code) {
          case "INVALID_PHONE": {
            dispatch(
              SnackBarActionCreators.openSnackbar({
                textKey: "add_address_phone_number_error_invalid",
              }),
            );
            break;
          }
          default: {
            dispatch(
              SnackBarActionCreators.openSnackbar({
                textKey: "add_address_toast_message_failure",
              }),
            );
            break;
          }
        }
      } else {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            textKey: "add_address_toast_message_failure",
          }),
        );
      }
      dispatch(ActionCreators.failedCreateShippingAddress());

      throw err;
    }
  };
}

export function deleteShippingAddress(id: Moim.Id): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startDeleteShippingAddress());

    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).commerce.deleteShippingAddress(id);
      if (result.success) {
        dispatch(
          ActionCreators.succeedDeleteShippingAddress({
            id,
          }),
        );
        dispatch(
          SnackBarActionCreators.openSnackbar({
            textKey: "delete_address_toast_message_success",
          }),
        );
      } else {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            textKey: "delete_address_toast_message_failure",
          }),
        );
        dispatch(ActionCreators.failedDeleteShippingAddress());
      }
    } catch (err) {
      dispatch(
        SnackBarActionCreators.openSnackbar({
          textKey: "delete_address_toast_message_failure",
        }),
      );
      dispatch(ActionCreators.failedDeleteShippingAddress());
      throw err;
    }
  };
}

export function updateShippingAddress(
  ...params: Parameters<typeof CommerceAPI.prototype.updateShippingAddress>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startUpdateShippingAddress());

    try {
      const result = shippingAddressNormalizer(
        await apiSelector(getState(), dispatch).commerce.updateShippingAddress(
          ...params,
        ),
      );
      dispatch(loadEntities(result.entities));
      dispatch(ActionCreators.succeedUpdateShippingAddress());
      dispatch(
        SnackBarActionCreators.openSnackbar({
          textKey: "save_success_toast_message",
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error) {
        switch (error.code) {
          case "INVALID_PHONE": {
            dispatch(
              SnackBarActionCreators.openSnackbar({
                textKey: "add_address_phone_number_error_invalid",
              }),
            );
            break;
          }
          default: {
            dispatch(
              SnackBarActionCreators.openSnackbar({
                textKey: "save_failure_toast_message",
              }),
            );
            break;
          }
        }
      } else {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            textKey: "save_failure_toast_message",
          }),
        );
      }
      dispatch(ActionCreators.failedCreateShippingAddress());

      throw err;
    }
  };
}

export function setAsDefaultShippingAddress(id: Moim.Id): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startSetDefaultShippingAddress());

    try {
      const result = shippingAddressNormalizer(
        await apiSelector(
          getState(),
          dispatch,
        ).commerce.setAsDefaultShippingAddress(id),
      );
      dispatch(loadEntities(result.entities));
      dispatch(ActionCreators.succeedSetDefaultShippingAddress());
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedSetDefaultShippingAddress());
      throw err;
    }
  };
}

export function getPaidFund(
  loadType: "loadMore" | "new",
  ...args: Parameters<typeof CommerceAPI.prototype.getPaidFund>
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    const productId = args[0];
    dispatch(ActionCreators.startFetchFundPurchaseItemList());

    try {
      const result = await apiSelector(
        getState(),
        dispatch,
      ).commerce.getPaidFund(...args);

      const userIds: Moim.Id[] = [];
      const participantList: Moim.Commerce.IPurchaseItemPurchase[] = [];
      result.data.forEach(item => {
        if (item.purchase) {
          userIds.push(item.profileId ?? item.purchase.userId);
          participantList.push({
            ...item.purchase,
            totalPrice: item.price * item.quantity,
            profileId: item.profileId,
            userId: item.profileId ?? item.purchase.userId,
            anonymous: item.anonymous,
            comment: item.comment,
            createAt: item.createdAt,
          });
        }
      });

      dispatch(loadEntitiesDirect({ users: userIds }));
      dispatch(
        ActionCreators.succeedFetchFundPurchaseItemList({
          loadType,
          productId,
          participantList,
          paging: result.paging,
        }),
      );
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
      dispatch(ActionCreators.failedFetchFundPurchaseItemList());
      throw err;
    }
  };
}

export function getPurchasedProductList(
  cancelToken: CancelToken,
  limit?: number,
  after?: Moim.PagingValue,
): ThunkPromiseResult {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).commerce.getMyPurchasedProductList(cancelToken, limit, after);
      const { result, entities } = productListNormalizer(response);
      dispatch(loadEntities(entities));
      dispatch(ActionCreators.succeedFetchPurchasedProductList(result));
      // eslint-disable-next-line no-empty
    } catch {}
  };
}

export function downloadCoupon(
  id: Moim.Id,
  disableErrorMessage?: boolean,
): ThunkPromiseResult<Moim.Commerce.ICoupons> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startDownloadCoupon());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).commerce.postDownloadCoupon(id);
      const { entities } = couponNormalizer(response);
      dispatch(loadEntities(entities));
      dispatch(ActionCreators.succeedDownloadCoupon(id));
      return response;
    } catch (err) {
      if (!disableErrorMessage) {
        const error = errorParseData(err);
        if (error?.message) {
          dispatch(
            SnackBarActionCreators.openSnackbar({
              text: error?.message,
              type: "error",
            }),
          );
        }
      }
      dispatch(ActionCreators.failedDownloadCoupon());
      throw err;
    }
  };
}

export function searchDownloadCoupons(
  ...args: Parameters<typeof CommerceAPI.prototype.searchDownloadCoupons>
): ThunkPromiseResult<Moim.IPaginatedListResponse<Moim.Commerce.ICoupons>> {
  return async (dispatch, getState, { apiSelector }) => {
    dispatch(ActionCreators.startSearchDownloadCoupons());
    try {
      const response = await apiSelector(
        getState(),
        dispatch,
      ).commerce.searchDownloadCoupons(...args);
      const { entities } = couponListNormalizer(response);
      dispatch(loadEntities(entities));
      dispatch(ActionCreators.succeedSearchDownloadCoupons());
      return response;
    } catch (err) {
      const error = errorParseData(err);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
            type: "error",
          }),
        );
      }
      dispatch(ActionCreators.failedSearchDownloadCoupons());
      throw err;
    }
  };
}
