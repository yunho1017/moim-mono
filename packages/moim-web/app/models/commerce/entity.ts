import { schema } from "normalizr";
import { coinEntity } from "../community/coin";

export const ENTITY_PREFIX = "commerce";

// variants
export const productVariantDefinition = {
  additionalFees: new schema.Array({
    coin: coinEntity,
  }),
};
export const productVariantEntity = new schema.Entity<
  Moim.Commerce.IProductVariant
>(`${ENTITY_PREFIX}_variants`, productVariantDefinition, {
  processStrategy: value => ({
    ...value,
    additionalFees: value.additionalFees?.map(fee => ({
      ...fee,
      coin: fee.resourceId,
    })),
  }),
});
export const productVariantListEntity = new schema.Object<
  Moim.IListResponse<Moim.Commerce.IProductVariant>
>({
  data: new schema.Array(productVariantEntity),
});

// categories
export const commerceCategoryDefinition = {
  items: new schema.Array(
    new schema.Entity<Moim.Commerce.ICategory>(`${ENTITY_PREFIX}_category`, {}),
  ),
};

export const commerceCategoryEntity = new schema.Entity<
  Moim.Commerce.ICategory
>(`${ENTITY_PREFIX}_category`, commerceCategoryDefinition);

export const commerceCategoryListEntity = new schema.Object<
  Moim.IListResponse<Moim.Commerce.ICategory>
>({
  data: [commerceCategoryEntity],
});

// seller
export const sellerDefinition = {};
export const sellerEntity = new schema.Entity<Moim.Commerce.ISeller>(
  `${ENTITY_PREFIX}_seller`,
  sellerDefinition,
);
export const sellerListEntity = new schema.Object<
  | Moim.IListResponse<Moim.Commerce.ISeller>
  | Moim.IPaginatedListResponse<Moim.Commerce.ISeller>
>({ data: [sellerEntity] });

// delivery group
export const deliveryGroupDefinition = {};

export const deliveryGroupEntity = new schema.Entity<
  Moim.Commerce.IDeliveryGroup
>(`${ENTITY_PREFIX}_delivery_group`, deliveryGroupDefinition);

export const deliveryGroupListEntity = new schema.Object<
  Moim.IListResponse<Moim.Commerce.IDeliveryGroup>
>({
  data: new schema.Array(deliveryGroupEntity),
});

// product
export const productDefinition = {
  seller: sellerEntity,
  deliveryGroup: deliveryGroupEntity,
  categories: new schema.Array(commerceCategoryEntity),
  productVariants: new schema.Array(productVariantEntity),
  additionalFees: new schema.Array({
    coin: coinEntity,
  }),
  additionalFeeInfos: new schema.Array({
    coin: coinEntity,
  }),
};

export const productEntity = new schema.Entity<Moim.Commerce.IProduct>(
  `${ENTITY_PREFIX}_product`,
  productDefinition,
  {
    processStrategy: value => ({
      ...value,
      seller: value.seller ?? value.sellerId,
      deliveryGroup: value.deliveryGroupId,
      categories: value.categoryIds ?? [],
      additionalFees: value.additionalFees?.map(fee => ({
        ...fee,
        coin: fee.resourceId,
      })),
      additionalFeeInfos: value.additionalFeeInfos?.map(info => ({
        ...info,
        coin: info.resourceId,
      })),
    }),
  },
);
export const productListEntity = new schema.Object<
  Moim.IPaginatedListResponse<Moim.Commerce.IProduct>
>({
  data: [productEntity],
});

// product_set
export const productSetDefinition = {
  products: new schema.Array(productEntity),
};

export const productSetEntity = new schema.Entity<Moim.Commerce.IProductSet>(
  `${ENTITY_PREFIX}_productSet`,
  productSetDefinition,
  {
    processStrategy: value => ({
      ...value,
      products: value.productIds,
    }),
  },
);

export const productSetListEntity = new schema.Object<
  Moim.IPaginatedListResponse<Moim.Commerce.IProductSet>
>({
  data: [productSetEntity],
});

// cart
export const cartResponseDefinition = {
  seller: sellerEntity,
  items: new schema.Array({
    seller: sellerEntity,
    items: new schema.Array({
      items: new schema.Array({
        product: productEntity,
        productVariant: productVariantEntity,
      }),
    }),
  }),
};

export const cartResponseEntity = new schema.Entity<
  Moim.Commerce.ICartResponse
>(`${ENTITY_PREFIX}_carts`, cartResponseDefinition, {
  processStrategy: value => {
    const items = (value as Moim.Commerce.ICartResponse).items.map(item => {
      return {
        ...item,
        seller: item.sellerId,
      };
    });

    return {
      ...value,
      seller: value.sellerId,
      items,
    };
  },
});

export const purchaseItemDefinition = {
  seller: sellerEntity,
  product: productEntity,
  variant: productVariantEntity,
};

export const purchaseItemEntity = new schema.Entity<
  Moim.Commerce.IPurchaseItem
>(`${ENTITY_PREFIX}_purchaseItems`, purchaseItemDefinition, {
  processStrategy: value => ({
    ...value,
    seller: value.sellerId,
    product: value.productId,
    variant: value.variantId,
  }),
  idAttribute: value => `${value.purchaseId}_${value.id}`,
});

export const purchaseItemListEntity = new schema.Object<
  Moim.Commerce.IPurchaseItem
>({
  data: new schema.Array(purchaseItemEntity),
});

export const purchaseDefinition = {
  items: new schema.Array({ items: new schema.Array(purchaseItemEntity) }),
};

export const purchaseEntity = new schema.Entity<Moim.Commerce.IPurchase>(
  `${ENTITY_PREFIX}_purchases`,
  purchaseDefinition,
);

export const purchaseListEntity = new schema.Object<
  Moim.Commerce.IPurchaseItem
>({
  data: new schema.Array(purchaseEntity),
});

export const paymentDefinition = {
  purchases: new schema.Array(purchaseEntity),
};

export const paymentEntity = new schema.Entity<Moim.Commerce.IPurchase>(
  `${ENTITY_PREFIX}_payments`,
  paymentDefinition,
);

export const paymentListEntity = new schema.Object<Moim.Commerce.IPurchaseItem>(
  {
    data: new schema.Array(paymentEntity),
  },
);

export const shippingAddressDefinition = {};

export const shippingAddressEntity = new schema.Entity<
  Moim.Commerce.ICommerceShippingAddress
>(`${ENTITY_PREFIX}_shipping_address`, shippingAddressDefinition);

export const shippingAddressListEntity = new schema.Object<
  Moim.IListResponse<Moim.Commerce.ICommerceShippingAddress>
>({
  data: new schema.Array(shippingAddressEntity),
});

export const couponDefinition = {};
export const couponEntity = new schema.Entity<Moim.Commerce.ICoupons>(
  `${ENTITY_PREFIX}_coupons`,
  couponDefinition,
);
export const couponListEntity = new schema.Object<
  Moim.IListResponse<Moim.Commerce.ICoupons>
>({ data: new schema.Array(couponEntity) });
