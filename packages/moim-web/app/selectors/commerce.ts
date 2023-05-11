import { createSelector } from "reselect";
import {
  productSetDenomalizer,
  commerceCategoryDenomalizer,
  commerceCategoryListDenomalizer,
  paymentListDenomalizer,
  paymentDenomalizer,
  shippingAddressDenormalizer,
} from "app/models/commerce";
import { entitiesSelector } from ".";
import { IAppState } from "app/rootReducer";
import { productVariantDenormalizer } from "app/models/commerce/denormalizer";
import { threadListDenormalizer } from "app/models";

export const getCommerceAllCategoryIdSelector = createSelector(
  (state: IAppState) => state.commerce.categories,
  (state: IAppState) => state.entities.commerce_category,
  (categoryIds, entities) => {
    const allCate = categoryIds.data.find(item => entities[item]?.isAll);
    return allCate;
  },
);

export const getCommerceCategorySelector = createSelector(
  (_: IAppState, id: Moim.Id) => id,
  entitiesSelector,
  (productId, entities): Moim.Commerce.ICategory | undefined =>
    commerceCategoryDenomalizer(productId, entities),
);

export const getStoreCommerceCategoriesSelector = createSelector(
  (state: IAppState) => state.commerce.categories,
  entitiesSelector,
  (categories, entities) =>
    commerceCategoryListDenomalizer(categories, entities),
);

export const getSellerSelector = (state: IAppState, id: Moim.Id) =>
  state.entities.commerce_seller[id];

export const getProductSelector = (state: IAppState, id: Moim.Id) =>
  state.entities.commerce_product[id];

export const getProductsSelector = createSelector(
  (_: IAppState, ids: Moim.Id[]) => ids,
  (state: IAppState) => state.entities.commerce_product,
  (productIds, entities) => ({
    data: productIds.map(pId => entities[pId]).filter(pd => Boolean(pd)),
  }),
);

export const getProductSetSelector = createSelector(
  (_: IAppState, id: Moim.Id) => id,
  entitiesSelector,
  (productId, entities): Moim.Commerce.IProductSet | undefined =>
    productSetDenomalizer(productId, entities),
);

export const getProductVariantById = (
  variants: Moim.Commerce.IProductVariant[],
  variantId: Moim.Id,
) => variants.find(item => item.id === variantId);

export const getStoreProductVariantById = createSelector(
  (_: IAppState, id: Moim.Id) => id,
  entitiesSelector,
  (variantId, entities): Moim.Commerce.IProductVariant | undefined =>
    productVariantDenormalizer(variantId, entities),
);

export const getProductOptionItemsByVariantValues = (
  options: Moim.Commerce.IProductOption[],
  variantValues: Record<string, string>,
) => {
  const targetOptionItems: Moim.Commerce.IProductOptionItem[] = [];
  Object.entries(variantValues).forEach(([key, value]) => {
    const optItem = options
      .find(opt => opt.key === key)
      ?.items.find(item => item.value === value);
    if (optItem) {
      targetOptionItems.push(optItem);
    }
  });

  return targetOptionItems;
};

export const getPoints = (
  product?: Moim.Commerce.IProduct,
  qty?: number,
  variantId?: Moim.Id,
  variants: Moim.Commerce.IProductVariant[] = [],
  hubSeller?: Moim.Commerce.ISeller,
) => {
  if (!product) return undefined;
  const { price: pPrice, creditRatio } = product;
  const subCreditRatio = product.seller?.creditRatio ?? hubSeller?.creditRatio;
  const ratio = creditRatio ?? subCreditRatio;
  const quantity = qty ?? 1;
  let price = pPrice;
  const valueSafeVariants = variants.filter(i => Boolean(i));

  if (variantId && Boolean(valueSafeVariants.length)) {
    const variant = getProductVariantById(valueSafeVariants, variantId);
    if (variant) {
      price = variant.price;
    }
  }
  if (ratio === undefined) {
    return undefined;
  }

  const totalPrice = price * quantity;

  return ratio ? Math.round(totalPrice * (ratio / 100)) : undefined;
};

export const pointsSelector = createSelector(
  (state: IAppState, productId: string) =>
    state.entities.commerce_product[productId],
  (_state: IAppState, _productId: string, qty?: number) => qty,
  (state: IAppState, _productId: string, _qty?: number, variantId?: Moim.Id) =>
    variantId ? state.entities.commerce_variants[variantId] : undefined,
  (state: IAppState) => {
    if (state.app.currentGroupId) {
      const sellerId =
        state.entities.groups[state.app.currentGroupId]?.seller_id;

      if (sellerId) {
        return state.entities.commerce_seller[sellerId];
      }
    }
  },

  (state: IAppState, productId: string) => {
    const sellerId = state.entities.commerce_product[productId]?.sellerId;

    if (sellerId) {
      return state.entities.commerce_seller[sellerId];
    }
  },
  (product, qty, variant, hubSeller, seller) => {
    if (!product) return undefined;
    const { price: pPrice, creditRatio } = product;
    const subCreditRatio = seller?.creditRatio ?? hubSeller?.creditRatio;
    const ratio = creditRatio ?? subCreditRatio;
    const quantity = qty ?? 1;
    let price = pPrice;

    if (variant) {
      price = variant.price;
    }
    if (ratio === undefined) {
      return undefined;
    }

    const totalPrice = price * quantity;

    return ratio ? Math.round(totalPrice * (ratio / 100)) : undefined;
  },
);

export const paymentListSelector = createSelector(
  (_: IAppState, ids: Moim.IPaginatedListResponse<Moim.Id>) => ids,
  entitiesSelector,
  (
    ids,
    entities,
  ): Moim.IPaginatedListResponse<Moim.Commerce.IPayment> | undefined =>
    paymentListDenomalizer(ids, entities) ?? undefined,
);

export const paymentSelector = createSelector(
  (_: IAppState, id: Moim.Id) => id,
  entitiesSelector,
  (id, entities): Moim.Commerce.IPayment | undefined =>
    paymentDenomalizer(id, entities) ?? undefined,
);

export const getShippingAddressList = createSelector(
  (state: IAppState) => state.commerce.shippingAddress,
  state => state.entities.commerce_shipping_address,
  (ids, entities) => {
    const composed = ids.data.map(
      id => entities[id] as Moim.Commerce.ICommerceShippingAddress,
    );
    return composed.sort((x, y) =>
      x.sortKey > y.sortKey ? -1 : x.sortKey < y.sortKey ? 1 : 0,
    );
  },
);

export const getShippingAddressById = createSelector(
  (_: IAppState, id: Moim.Id | undefined) => id,
  entitiesSelector,
  (id, entities) =>
    id ? shippingAddressDenormalizer(id, entities) : undefined,
);

export const getProductReviewsSelector = createSelector(
  (state: IAppState, id: Moim.Id) => state.commerce.productReviews[id],
  entitiesSelector,
  (
    reviewsData,
    entities,
  ): Moim.IIndexedPagingList<Moim.Forum.IDenormalizedThread> | undefined => {
    return reviewsData
      ? {
          ...reviewsData,
          items:
            threadListDenormalizer({ data: reviewsData.items }, entities)
              .data ?? [],
        }
      : undefined;
  },
);

export const getProductQuestionsSelector = createSelector(
  (state: IAppState, id: Moim.Id) => state.commerce.productQuestions[id],
  entitiesSelector,
  (
    questionsData,
    entities,
  ): Moim.IIndexedPagingList<Moim.Forum.IDenormalizedThread> | undefined => {
    return questionsData
      ? {
          ...questionsData,
          items:
            threadListDenormalizer({ data: questionsData.items }, entities)
              .data ?? [],
        }
      : undefined;
  },
);

export const getProductCommentsSelector = createSelector(
  (state: IAppState, id: Moim.Id) => state.commerce.productComments[id],
  entitiesSelector,
  (
    commentsData,
    entities,
  ): Moim.IIndexedPagingList<Moim.Forum.IDenormalizedThread> | undefined => {
    return commentsData
      ? {
          ...commentsData,
          items:
            threadListDenormalizer({ data: commentsData.items }, entities)
              .data ?? [],
        }
      : undefined;
  },
);

// export const getProductParticipantSelector = createSelector(
//   (state: IAppState, id: Moim.Id) => state.commerce.productParticipants[id],
// );
