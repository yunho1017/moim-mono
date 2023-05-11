import produce from "immer";
import { AllActions } from "app/actions";
import { EntityTypes, CommerceTypes } from "app/actions/types";
import { VoteStatus } from "app/enums";
import { isEqual } from "lodash";
import { commerceCategoryListNormalizer } from "app/models/commerce";

export const INITIAL_STATE_SELLER: Record<Moim.Id, Moim.Commerce.ISeller> = {
  ...(window.__sellerData
    ? {
        [window.__sellerData.id]: {
          ...window.__sellerData,
          cachedAt: -1,
        } as any,
      }
    : undefined),
};
export const INITIAL_STATE_PRODUCT: Record<
  Moim.Id,
  Moim.Commerce.IProduct
> = {};
export const INITIAL_STATE_PRODUCT_SET: Record<
  Moim.Id,
  Moim.Commerce.IProductSet
> = {};
export const INITIAL_STATE_CATEGORY: Record<
  Moim.Id,
  Moim.Commerce.ICategory
> = {
  ...(window.__categoryData
    ? commerceCategoryListNormalizer(window.__categoryData).entities
        .commerce_category
    : undefined),
};
export const INITIAL_STATE_CART: Record<
  Moim.Id,
  Moim.Commerce.ICartResponse
> = {};

export const INITIAL_STATE_PURCHASE_ITEM: Record<
  Moim.Id,
  Moim.Commerce.IDenormalizedPurchaseItem
> = {};

export const INITIAL_STATE_PAYMENT: Record<
  Moim.Id,
  Moim.Commerce.IPayment
> = {};

export const INITIAL_STATE_PURCHASE: Record<
  Moim.Id,
  Moim.Commerce.IPurchase
> = {};

export const INITIAL_STATE_VARIANT: Record<
  Moim.Id,
  Moim.Commerce.IProductVariant
> = {};

export const INITIAL_STATE_SHIPPING_ADDRESS: Record<
  Moim.Id,
  Moim.Commerce.ICommerceShippingAddress
> = {};

export const INITIAL_STATE_DELIVERY_GROUP: Record<
  Moim.Id,
  Moim.Commerce.IDeliveryGroup
> = {};

export const INITIAL_STATE_COUPON: Record<Moim.Id, Moim.Commerce.ICoupons> = {};

export function sellerReducer(
  state = INITIAL_STATE_SELLER,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.commerce_seller) {
          Object.entries(action.payload.commerce_seller).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
          return draft;
        }
        break;
      }
    }
  });
}

export function productReducer(
  state = INITIAL_STATE_PRODUCT,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.commerce_product) {
          Object.entries(action.payload.commerce_product).forEach(
            ([key, value]) => {
              draft[key] = {
                ...value,
                productVariants: value.productVariants
                  ? value.productVariants
                  : draft[key]?.productVariants,
              };
            },
          );
          return draft;
        }
        break;
      }

      case CommerceTypes.SUCCEED_CREATE_PRODUCT_REVIEW: {
        if (draft[action.payload.productId]) {
          draft[action.payload.productId].reviewsCount++;
        }
        break;
      }

      case CommerceTypes.SUCCEED_DELETE_PRODUCT_REVIEW: {
        if (draft[action.payload.productId]) {
          draft[action.payload.productId].reviewsCount--;
        }
        break;
      }

      case CommerceTypes.SUCCEED_CREATE_PRODUCT_QUESTION: {
        if (draft[action.payload.productId]) {
          draft[action.payload.productId].repliesCount++;
        }

        break;
      }

      case CommerceTypes.SUCCEED_DELETE_PRODUCT_QUESTION: {
        if (draft[action.payload.productId]) {
          draft[action.payload.productId].repliesCount--;
        }
        break;
      }

      case CommerceTypes.SUCCEED_CREATE_FUND_COMMENT: {
        if (draft[action.payload.productId]) {
          draft[action.payload.productId].commentsCount =
            (draft[action.payload.productId].commentsCount ?? 0) + 1;
        }

        break;
      }

      case CommerceTypes.SUCCEED_DELETE_FUND_COMMENT: {
        if (draft[action.payload.productId]) {
          draft[action.payload.productId].commentsCount =
            (draft[action.payload.productId].commentsCount ?? 0) - 1;
        }
        break;
      }

      // Product support Like type
      case CommerceTypes.FAILED_PUT_PRODUCT_VOTE:
      case CommerceTypes.START_PUT_PRODUCT_VOTE: {
        if (action.payload.status === VoteStatus.POSITIVE) {
          draft[action.payload.productId].vote = {
            type: action.payload.status,
            updated_at: Date.now(),
          };
          draft[action.payload.productId].up_vote_score++;
          draft[action.payload.productId].vote_score++;
        } else {
          draft[action.payload.productId].vote = undefined;
          draft[action.payload.productId].up_vote_score--;
          draft[action.payload.productId].vote_score--;
        }

        break;
      }
    }
  });
}

export function productSetReducer(
  state = INITIAL_STATE_PRODUCT_SET,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.commerce_productSet) {
          Object.entries(action.payload.commerce_productSet).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
          return draft;
        }
        break;
      }
    }
  });
}

export function commerceCategoryReducer(
  state = INITIAL_STATE_CATEGORY,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.commerce_category) {
          Object.entries(action.payload.commerce_category).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
          return draft;
        }
        break;
      }
    }
  });
}

export function cartResponseReducer(
  state = INITIAL_STATE_CART,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.commerce_carts) {
          Object.entries(action.payload.commerce_carts).forEach(
            ([key, value]) => {
              if (!draft[key] || (draft[key] && !isEqual(draft[key], value))) {
                draft[key] = value;
              }
            },
          );
          return draft;
        }
        break;
      }
    }
  });
}
export function commercePurchaseItemReducer(
  state = INITIAL_STATE_PURCHASE_ITEM,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        const purchaseItems = action.payload.commerce_purchaseItems;
        if (purchaseItems) {
          const keys = Object.keys(purchaseItems);
          keys.forEach(key => {
            if (purchaseItems[key]) {
              draft[key] = {
                ...draft[key],
                ...purchaseItems[key],
                reviewable:
                  draft[key]?.reviewable === "alreadyWritten"
                    ? "alreadyWritten"
                    : purchaseItems[key].reviewable,
              };
            }
          });
        }

        break;
      }

      case CommerceTypes.SUCCEED_CREATE_PRODUCT_REVIEW: {
        if (action.payload.purchaseId && action.payload.purchaseItemId) {
          draft[
            `${action.payload.purchaseId}_${action.payload.purchaseItemId}`
          ].reviewable = "alreadyWritten";
        }
        break;
      }
    }
  });
}

export function paymentReducer(
  state = INITIAL_STATE_PAYMENT,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.commerce_payments) {
          Object.entries(action.payload.commerce_payments).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
          return draft;
        }
        break;
      }

      case CommerceTypes.SUCCEED_CANCEL_PAYMENT: {
        if (draft[action.payload.paymentId]) {
          draft[action.payload.paymentId].status = "refunded";
          draft[action.payload.paymentId].cancellable = false;
        }

        break;
      }
    }
  });
}

export function purchaseReducer(
  state = INITIAL_STATE_PURCHASE,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.commerce_purchases) {
          Object.entries(action.payload.commerce_purchases).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
          return draft;
        }
        break;
      }
    }
  });
}

export function variantReducer(
  state = INITIAL_STATE_VARIANT,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.commerce_variants) {
          Object.entries(action.payload.commerce_variants).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
          return draft;
        }
        break;
      }
    }
  });
}

export function shippingAddressReducer(
  state = INITIAL_STATE_SHIPPING_ADDRESS,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.commerce_shipping_address) {
          Object.entries(action.payload.commerce_shipping_address).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
          return draft;
        }
        break;
      }
    }
  });
}

export function deliveryGroupReducer(
  state = INITIAL_STATE_DELIVERY_GROUP,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.commerce_delivery_group) {
          Object.entries(action.payload.commerce_delivery_group).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
          return draft;
        }
        break;
      }
    }
  });
}

export function couponReducer(
  state = INITIAL_STATE_COUPON,
  action: AllActions,
) {
  return produce(state, draft => {
    switch (action.type) {
      case EntityTypes.ADD_ENTITY: {
        if (action.payload.commerce_coupons) {
          Object.entries(action.payload.commerce_coupons).forEach(
            ([key, value]) => {
              draft[key] = value;
            },
          );
          return draft;
        }
        break;
      }

      case CommerceTypes.SUCCEED_DOWNLOAD_COUPON: {
        const { id } = action.payload;
        if (draft[id]) {
          draft[id].isDownloaded = true;
          draft[id].donwloadedCount = (draft[id].donwloadedCount ?? 0) + 1;
        }
        break;
      }
    }
  });
}
