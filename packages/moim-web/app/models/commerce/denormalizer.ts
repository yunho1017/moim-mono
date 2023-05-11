import { paymentListEntity } from ".";
import { denormalize } from "..";
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
  purchaseListEntity,
  paymentEntity,
  shippingAddressEntity,
  shippingAddressListEntity,
} from "./entity";

export const productVariantDenormalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Commerce.IProductVariant>(
    input,
    productVariantEntity,
    entities,
  );

export const productVariantListDenormalizer = (
  input: Moim.IListResponse<Moim.Id> | Moim.IPaginatedListResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.IListResponse<Moim.Id> | Moim.IPaginatedListResponse<Moim.Id>,
    | Moim.IListResponse<Moim.Commerce.IProductVariant>
    | Moim.IPaginatedListResponse<Moim.Commerce.IProductVariant>
  >(input, productVariantListEntity, entities);

export const sellerDenomalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) => denormalize<Moim.Id, Moim.Commerce.ISeller>(input, sellerEntity, entities);

export const sellerListDenomalizer = (
  input: Moim.IListResponse<Moim.Id> | Moim.IPaginatedListResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.IListResponse<Moim.Id> | Moim.IPaginatedListResponse<Moim.Id>,
    | Moim.IListResponse<Moim.Commerce.ISeller>
    | Moim.IPaginatedListResponse<Moim.Commerce.ISeller>
  >(input, sellerListEntity, entities);

export const productDenomalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Commerce.IProduct>(input, productEntity, entities);

export const productListDenomalizer = (
  input: Moim.IPaginatedListResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.IPaginatedListResponse<Moim.Id>,
    Moim.IPaginatedListResponse<Moim.Commerce.IProduct>
  >(input, productListEntity, entities);

export const productSetDenomalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Commerce.IProductSet>(
    input,
    productSetEntity,
    entities,
  );

export const productSetListDenomalizer = (
  input: Moim.IPaginatedListResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.IPaginatedListResponse<Moim.Id>,
    Moim.IPaginatedListResponse<Moim.Commerce.IProductSet>
  >(input, productSetListEntity, entities);

export const commerceCategoryDenomalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Commerce.ICategory>(
    input,
    commerceCategoryEntity,
    entities,
  );

export const commerceCategoryListDenomalizer = (
  input: Moim.IListResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.IListResponse<Moim.Id>,
    Moim.IListResponse<Moim.Commerce.ICategory>
  >(input, commerceCategoryListEntity, entities);

export const purchaseListDenomalizer = (
  input: Moim.IPaginatedListResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.IPaginatedListResponse<Moim.Id>,
    Moim.IPaginatedListResponse<Moim.Commerce.IPurchase>
  >(input, purchaseListEntity, entities);

export const paymentDenomalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Commerce.IPayment>(input, paymentEntity, entities);

export const paymentListDenomalizer = (
  input: Moim.IPaginatedListResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.IPaginatedListResponse<Moim.Id>,
    Moim.IPaginatedListResponse<Moim.Commerce.IPayment>
  >(input, paymentListEntity, entities);

export const shippingAddressDenormalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Commerce.ICommerceShippingAddress>(
    input,
    shippingAddressEntity,
    entities,
  );

export const shippingAddressListDenormalizer = (
  input: Moim.IListResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.IListResponse<Moim.Id>,
    Moim.IListResponse<Moim.Commerce.ICommerceShippingAddress>
  >(input, shippingAddressListEntity, entities);
