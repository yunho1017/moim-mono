import { normalize } from "normalizr";
import { paymentListEntity } from ".";
import {
  productVariantEntity,
  productVariantListEntity,
  sellerEntity,
  sellerListEntity,
  productEntity,
  productListEntity,
  productSetEntity,
  productSetListEntity,
  commerceCategoryEntity,
  commerceCategoryListEntity,
  cartResponseEntity,
  purchaseListEntity,
  paymentEntity,
  shippingAddressEntity,
  shippingAddressListEntity,
  deliveryGroupEntity,
  deliveryGroupListEntity,
  couponEntity,
  couponListEntity,
} from "./entity";

export const productVariantNormalizer = (
  variant: Moim.Commerce.IProductVariant,
) =>
  normalize<
    Moim.Commerce.IProductVariant,
    Moim.Entity.INormalizedData,
    Moim.Id
  >(variant, productVariantEntity);

export const productVariantListNormalizer = (
  input:
    | Moim.IListResponse<Moim.Commerce.IProductVariant>
    | Moim.IPaginatedListResponse<Moim.Commerce.IProductVariant>,
) =>
  normalize<
    | Moim.IListResponse<Moim.Commerce.IProductVariant>
    | Moim.IPaginatedListResponse<Moim.Commerce.IProductVariant>,
    Moim.Entity.INormalizedData,
    Moim.IListResponse<Moim.Id> | Moim.IPaginatedListResponse<Moim.Id>
  >(input, productVariantListEntity);

export const sellerNormalizer = (seller: Moim.Commerce.ISeller) =>
  normalize<Moim.Commerce.ISeller, Moim.Entity.INormalizedData, Moim.Id>(
    seller,
    sellerEntity,
  );

export const sellerListNormalizer = (
  input:
    | Moim.IListResponse<Moim.Commerce.ISeller>
    | Moim.IPaginatedListResponse<Moim.Commerce.ISeller>,
) =>
  normalize<
    | Moim.IListResponse<Moim.Commerce.ISeller>
    | Moim.IPaginatedListResponse<Moim.Commerce.ISeller>,
    Moim.Entity.INormalizedData,
    Moim.IListResponse<Moim.Id>
  >(input, sellerListEntity);

export const productNormalizer = (input: Moim.Commerce.IProduct) =>
  normalize<Moim.Commerce.IProduct, Moim.Entity.INormalizedData, Moim.Id>(
    input,
    productEntity,
  );

export const productListNormalizer = (
  input: Moim.IPaginatedListResponse<Moim.Commerce.IProduct>,
) =>
  normalize<
    Moim.IPaginatedListResponse<Moim.Commerce.IProduct>,
    Moim.Entity.INormalizedData,
    Moim.IPaginatedListResponse<Moim.Id>
  >(input, productListEntity);

export const productSetNormalizer = (input: Moim.Commerce.IProductSet) =>
  normalize<Moim.Commerce.IProductSet, Moim.Entity.INormalizedData, Moim.Id>(
    input,
    productSetEntity,
  );

export const productSetListNormalizer = (
  input: Moim.IPaginatedListResponse<Moim.Commerce.IProductSet>,
) =>
  normalize<
    Moim.IPaginatedListResponse<Moim.Commerce.IProductSet>,
    Moim.Entity.INormalizedData,
    Moim.IPaginatedListResponse<Moim.Id>
  >(input, productSetListEntity);

export const commerceCategoryNormalizer = (input: Moim.Commerce.ICategory) =>
  normalize<Moim.Commerce.ICategory, Moim.Entity.INormalizedData, Moim.Id>(
    input,
    commerceCategoryEntity,
  );

export const commerceCategoryListNormalizer = (
  input: Moim.IListResponse<Moim.Commerce.ICategory>,
) =>
  normalize<
    Moim.IListResponse<Moim.Commerce.ICategory>,
    Moim.Entity.INormalizedData,
    Moim.IListResponse<Moim.Id>
  >(input, commerceCategoryListEntity);

export const cartResponseNormalizer = (input: Moim.Commerce.ICartResponse) =>
  normalize<Moim.Commerce.ICartResponse, Moim.Entity.INormalizedData, Moim.Id>(
    input,
    cartResponseEntity,
  );

export const purchaseListNormalizer = (
  input: Moim.IPaginatedListResponse<Moim.Commerce.IPurchase>,
) =>
  normalize<
    Moim.IPaginatedListResponse<Moim.Commerce.IPurchase>,
    Moim.Entity.INormalizedData,
    Moim.IPaginatedListResponse<Moim.Id>
  >(input, purchaseListEntity);

export const paymentNormalizer = (input: Moim.Commerce.IPayment) =>
  normalize<Moim.Commerce.IPayment, Moim.Entity.INormalizedData, Moim.Id>(
    input,
    paymentEntity,
  );

export const paymentListNormalizer = (
  input: Moim.IPaginatedListResponse<Moim.Commerce.IPayment>,
) =>
  normalize<
    Moim.IPaginatedListResponse<Moim.Commerce.IPayment>,
    Moim.Entity.INormalizedData,
    Moim.IPaginatedListResponse<Moim.Id>
  >(input, paymentListEntity);

export const shippingAddressNormalizer = (
  input: Moim.Commerce.ICommerceShippingAddress,
) =>
  normalize<
    Moim.Commerce.ICommerceShippingAddress,
    Moim.Entity.INormalizedData,
    Moim.Id
  >(input, shippingAddressEntity);

export const shippingAddressListNormalizer = (
  input: Moim.IListResponse<Moim.Commerce.ICommerceShippingAddress>,
) =>
  normalize<
    Moim.IListResponse<Moim.Commerce.ICommerceShippingAddress>,
    Moim.Entity.INormalizedData,
    Moim.IListResponse<Moim.Id>
  >(input, shippingAddressListEntity);

export const deliveryGroupNormalizer = (input: Moim.Commerce.IPayment) =>
  normalize<Moim.Commerce.IDeliveryGroup, Moim.Entity.INormalizedData, Moim.Id>(
    input,
    deliveryGroupEntity,
  );

export const deliveryGroupListNormalizer = (
  input: Moim.IPaginatedListResponse<Moim.Commerce.IDeliveryGroup>,
) =>
  normalize<
    Moim.IPaginatedListResponse<Moim.Commerce.IDeliveryGroup>,
    Moim.Entity.INormalizedData,
    Moim.IPaginatedListResponse<Moim.Id>
  >(input, deliveryGroupListEntity);

export const couponNormalizer = (input: Moim.Commerce.ICoupons) =>
  normalize<Moim.Commerce.ICoupons, Moim.Entity.INormalizedData, Moim.Id>(
    input,
    couponEntity,
  );

export const couponListNormalizer = (
  input: Moim.IPaginatedListResponse<Moim.Commerce.ICoupons>,
) =>
  normalize<
    Moim.IPaginatedListResponse<Moim.Commerce.ICoupons>,
    Moim.Entity.INormalizedData,
    Moim.IPaginatedListResponse<Moim.Id>
  >(input, couponListEntity);
