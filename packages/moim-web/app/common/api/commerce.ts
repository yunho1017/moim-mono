import { CancelToken } from "axios";
import { getCommerceAPIDomain } from "app/common/helpers/domainMaker";
import { MoimCommerceAPI } from "./base/commerce";

export interface ISearchOptions {
  query?: string;
  sort?: string; // createdAt, updatedAt 같은 필드
  order?: "asc" | "desc";
  after?: Moim.PagingValue;
  from?: number;
  limit?: number;
  status?: Moim.Commerce.PRODUCT_STATUS;
  type?: Moim.Commerce.PRODUCT_TYPE;
  categoryIds?: string[];
  deliveryGroupId?: string;
}

export default class CommerceAPI extends MoimCommerceAPI {
  public async getBasicInfo(): Promise<
    Moim.ISingleItemResponse<Moim.Commerce.ICommerceBasicInfo>
  > {
    return (await this.get("/info", undefined, {})).data;
  }

  public async batchCoupon(
    ids: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IDownloadableCoupon>> {
    return (
      await this.post(
        `/coupons/_batch`,
        { ids },
        { baseURL: getCommerceAPIDomain() },
      )
    ).data;
  }

  public async batchProduct(
    ids: Moim.Id[],
  ): Promise<
    Moim.IPaginatedListResponse<Omit<Moim.Commerce.IProduct, "seller">>
  > {
    return (
      await this.post(
        "/products/_batch",
        { ids },
        { baseURL: getCommerceAPIDomain() },
      )
    ).data;
  }

  public async batchProductSet(
    ids: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IProductSet>> {
    return (
      await this.post(
        "/product_sets/_batch",
        { ids },
        { baseURL: getCommerceAPIDomain() },
      )
    ).data;
  }

  public async batchSeller(
    ids: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.ISeller>> {
    return (
      await this.post(
        "/sellers/_batch",
        { ids },
        { baseURL: getCommerceAPIDomain() },
      )
    ).data;
  }

  public async batchVariants(
    ids: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IProductVariant>> {
    return (
      await this.post(
        "/product_variants/_batch",
        { ids },
        { baseURL: getCommerceAPIDomain() },
      )
    ).data;
  }

  public async batchDeliveryGroups(
    ids: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IDeliveryGroup>> {
    return (
      await this.post(
        "/delivery_groups/_batch",
        { ids },
        { baseURL: getCommerceAPIDomain() },
      )
    ).data;
  }

  public async myAdministratedSellers(): Promise<
    Moim.IPaginatedListResponse<Omit<Moim.Commerce.ISeller, "accounts">>
  > {
    return (
      await this.get("/sellers", null, { baseURL: getCommerceAPIDomain() })
    ).data;
  }

  public async getSellerData(
    sellerId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.Commerce.ISeller> {
    return (
      await this.get(`/sellers/${sellerId}`, null, {
        cancelToken,
      })
    ).data;
  }

  public async getSellerCategories(
    sellerId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.IListResponse<Moim.Commerce.ICategory>> {
    return (
      await this.get(`/sellers/${sellerId}/categories`, null, {
        cancelToken,
      })
    ).data;
  }

  public async getSellerSubSellers(
    sellerId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.IListResponse<Omit<Moim.Commerce.ISeller, "accounts">>> {
    return (
      await this.get(`/sellers/${sellerId}/sub_sellers`, null, {
        cancelToken,
      })
    ).data;
  }

  public async getSellerProducts(
    sellerId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<
    Moim.IPaginatedListResponse<Omit<Moim.Commerce.IProduct, "seller">>
  > {
    return (
      await this.get(`/sellers/${sellerId}/products`, null, {
        cancelToken,
      })
    ).data;
  }

  public async getSellerProductSets(
    sellerId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IProductSet>> {
    return (
      await this.get(`/sellers/${sellerId}/product_sets`, null, {
        cancelToken,
      })
    ).data;
  }

  public async getProductData(
    productId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Required<Moim.Commerce.IProduct>> {
    return (
      await this.get(`/products/${productId}`, null, {
        cancelToken,
      })
    ).data;
  }

  public async searchSellerProducts(
    sellerId: Moim.Id,
    options: ISearchOptions = {},
    cancelToken?: CancelToken,
  ): Promise<
    Moim.IPaginatedListResponse<Omit<Moim.Commerce.IProduct, "seller">>
  > {
    return (
      await this.post(`/sellers/${sellerId}/products/search`, options, {
        cancelToken,
      })
    ).data;
  }

  public async getPayments(
    sellerId: Moim.Id,
    paging?: Moim.IPaging,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IPayment>> {
    return (
      await this.get(
        `/payments`,
        { ...paging, sellerId },
        {
          cancelToken,
        },
      )
    ).data;
  }

  public async getPayment(
    paymentId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.Commerce.IPayment> {
    return (
      await this.get(`/payments/${paymentId}`, null, {
        cancelToken,
      })
    ).data;
  }

  public async paymentCancel(
    paymentId: Moim.Id,
    cancelReason: string,
    refundBankMethod?: Moim.Commerce.IRefundBankMethod,
  ): Promise<Moim.Commerce.IPayment> {
    return (
      await this.post(
        `/payments/${paymentId}/cancel`,
        {
          cancelReason,
          refundBankMethod,
        },
        {},
      )
    ).data;
  }

  public async getRefund(
    paymentId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<any> {
    return (
      await this.get(`/refunds/${paymentId}`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async manualPurchaseConfirm(
    purchaseItemIds: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IPurchase>> {
    return (
      await this.post(
        `/purchase_items/confirm`,
        {
          itemIds: purchaseItemIds,
        },
        { baseURL: getCommerceAPIDomain() },
      )
    ).data;
  }

  public async calcPayment(
    hubSellerId: Moim.Id,
    payload: {
      items: Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem[];
      userCouponIds?: string[];
      selectRecommendedCoupon?: boolean;
      useCoinMaxPrice?: boolean;
    },

    cancelToken?: CancelToken,
  ): Promise<Moim.Commerce.IPaymentCalcResponse> {
    return (
      await this.post(
        `/payments/calculate`,
        {
          sellerId: hubSellerId,
          ...payload,
        },
        {
          cancelToken,
        },
      )
    ).data;
  }

  public async productVote(
    productId: Moim.Id,
    voteType: Moim.Enums.VoteStatus,
  ): Promise<Moim.Commerce.IProduct> {
    return (
      await this.put(
        `/products/${productId}/votes`,
        {
          vote: {
            type: voteType,
          },
        },
        {},
      )
    ).data;
  }
  public async getVotedProductList(
    payload: Moim.IPaging,
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IProduct>> {
    return (await this.get(`/products/voted`, payload, {})).data;
  }

  public async visitProductShow(
    productId: Moim.Id,
  ): Promise<Moim.Commerce.IProduct> {
    return (await this.post(`/products/${productId}/view`, undefined, {})).data;
  }

  public async getCart(
    sellerId: Moim.Id,
  ): Promise<Moim.Commerce.ICartResponse> {
    return (await this.get("/v2/carts", { sellerId }, {})).data;
  }

  public async addToCart(
    hubSellerId: Moim.Id,
    items: Moim.Commerce.IFlattenedCartSellerItem[],
  ): Promise<Moim.Commerce.ICartResponse> {
    return (
      await this.post(
        `/v2/carts`,
        {
          sellerId: hubSellerId,
          items,
          append: true,
        },
        {},
      )
    ).data;
  }

  public async updateCart(
    hubSellerId: Moim.Id,
    items: Moim.Commerce.IFlattenedCartSellerItem[],
    cancelToken?: CancelToken,
  ): Promise<Moim.Commerce.ICartResponse> {
    return (
      await this.post(
        `/v2/carts`,
        {
          sellerId: hubSellerId,
          items,
        },
        {
          cancelToken,
        },
      )
    ).data;
  }

  public async getMyCreditHistory(
    hubSellerId: Moim.Id,
    params: {
      after?: Moim.PagingValue;
      limit?: number;
      includeTotalAmount?: boolean;
      sourceType?: "referralReward-signUp";
    },
  ): Promise<
    Moim.IPaginatedListResponse<Moim.Commerce.ICreditHistoryItem> & {
      totalAmount?: number;
    }
  > {
    return (
      await this.get(`/sellers/${hubSellerId}/credit_histories`, params, {})
    ).data;
  }

  public async getMyAvailableCoupons(
    hubSellerId: Moim.Id,
    items: Moim.Commerce.IFlattenedCartSellerItem[],
    after?: Moim.PagingValue,
  ): Promise<
    Moim.IPaginatedListResponse<Moim.Commerce.IAvailableStatusCoupon>
  > {
    return (
      await this.post(
        `/user_coupons/available`,
        {
          sellerId: hubSellerId,
          items,
          after,
        },
        { baseURL: getCommerceAPIDomain() },
      )
    ).data;
  }

  public async getMyCoupons(
    hubSellerId: Moim.Id,
    type: "active" | "deactive",
    after?: Moim.PagingValue,
  ): Promise<
    Moim.IPaginatedListResponse<Moim.Commerce.IAvailableStatusCoupon>
  > {
    return (
      await this.get(
        `/user_coupons`,
        {
          sellerId: hubSellerId,
          active: type === "active",
          after,
        },
        { baseURL: getCommerceAPIDomain() },
      )
    ).data;
  }

  public async createShippingAddress(payload: {
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
    hubSellerId?: string;
  }): Promise<Moim.Commerce.ICommerceShippingAddress> {
    return (await this.post("/shipping_address", payload, {})).data;
  }

  public async getShippingAddress(): Promise<
    Moim.IListResponse<Moim.Commerce.ICommerceShippingAddress>
  > {
    return (await this.get("/shipping_address", undefined, {})).data;
  }

  public async updateShippingAddress(
    id: Moim.Id,
    payload: {
      name?: string;
      recipientName?: string;
      recipientPhone?: {
        countryCode: string;
        nationalNumber: string;
      };
      address?: string;
      address2?: string;
      zipCode?: string;
      memo?: string | null;
      target?: string;
      sortKey?: string;
      countryCode?: string;
      city?: string | null;
      state?: string | null;
    },
  ): Promise<Moim.Commerce.ICommerceShippingAddress> {
    return (await this.put(`/shipping_address/${id}`, payload, {})).data;
  }

  public async setAsDefaultShippingAddress(
    id: Moim.Id,
  ): Promise<Moim.Commerce.ICommerceShippingAddress> {
    return (
      await this.put(
        `/shipping_address/default`,
        {
          shippingAddressId: id,
        },
        {},
      )
    ).data;
  }

  public async deleteShippingAddress(
    id: Moim.Id,
  ): Promise<Moim.ISuccessResponse> {
    return (await this.delete(`/shipping_address/${id}`, undefined, {})).data;
  }

  public async getPaidFund(
    productId: Moim.Id,
    after?: string,
    limit?: number,
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IPurchaseItem>> {
    return (
      await this.get(
        `/purchase_items/paid_funds`,
        {
          productId,
          after,
          limit,
        },
        {},
      )
    ).data;
  }

  public async getMyPurchasedProductList(
    cancelToken: CancelToken,
    limit?: number,
    after?: Moim.PagingValue,
  ) {
    return (
      await this.get(
        "/products/purchased",
        { limit, after },
        {
          cancelToken,
        },
      )
    ).data;
  }

  public async getDeliveryGroup(id: string, cancelToken?: CancelToken) {
    return (
      await this.get(`/delivery_groups/${id}`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async postDownloadCoupon(
    id: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.Commerce.ICoupon> {
    return (
      await this.post(`/coupons/${id}/user_coupons`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async searchDownloadCoupons(
    parentSellerId: Moim.Id,
    payload?: {
      limit?: number;
      query?: string;
      sellerId?: Moim.Id;
      after?: Moim.PagingValue;
    },
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.ICoupons>> {
    return (
      await this.post(
        `/coupons/search`,
        {
          downloadable: true,
          parentSellerId,
          ...payload,
        },
        {
          cancelToken,
        },
      )
    ).data;
  }
}
