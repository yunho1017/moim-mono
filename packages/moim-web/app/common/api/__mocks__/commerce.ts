import { CancelToken } from "axios";
import { RAW } from "app/__mocks__";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";

export default class CommerceAPI {
  public async getBasicInfo(): Promise<
    Moim.ISingleItemResponse<Moim.Commerce.ICommerceBasicInfo>
  > {
    return RAW.COMMERCE.info;
  }

  public async batchCoupon(
    _ids: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IDownloadableCoupon>> {
    return RAW.COMMERCE.BATCH_DOWNLOADABLE_COUPONS;
  }

  public async batchProduct(
    _ids: Moim.Id[],
  ): Promise<
    Moim.IPaginatedListResponse<Omit<Moim.Commerce.IProduct, "seller">>
  > {
    return RAW.COMMERCE.products;
  }

  public async batchProductSet(
    _ids: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IProductSet>> {
    return RAW.COMMERCE.productSets;
  }

  public async batchSeller(
    _ids: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.ISeller>> {
    return RAW.COMMERCE.subSellers;
  }

  public async batchVariants(
    _ids: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IProductVariant>> {
    return RAW.COMMERCE.variants;
  }

  public async myAdministratedSellers(): Promise<
    Moim.IPaginatedListResponse<Omit<Moim.Commerce.ISeller, "accounts">>
  > {
    return {
      data: [RAW.COMMERCE.hubSeller],
      paging: {},
    };
  }

  public async getSellerData(
    _sellerId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.Commerce.ISeller> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return RAW.COMMERCE.hubSeller;
  }

  public async getSellerCategories(
    _sellerId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.IListResponse<Moim.Commerce.ICategory>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return RAW.COMMERCE.categories;
  }

  public async getSellerSubSellers(
    _sellerId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.IListResponse<Omit<Moim.Commerce.ISeller, "accounts">>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return RAW.COMMERCE.subSellers;
  }

  public async getSellerProducts(
    _sellerId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<
    Moim.IPaginatedListResponse<Omit<Moim.Commerce.IProduct, "seller">>
  > {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return RAW.COMMERCE.products;
  }

  public async getSellerProductSets(
    _sellerId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IProductSet>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return RAW.COMMERCE.productSets;
  }

  public async getProductData(
    _productId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<Required<Moim.Commerce.IProduct>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return RAW.COMMERCE.productShow;
  }

  public async searchSellerProducts(
    _sellerId: Moim.Id,
    _options: any,
    cancelToken?: CancelToken,
  ): Promise<
    Moim.IPaginatedListResponse<Omit<Moim.Commerce.IProduct, "seller">>
  > {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return RAW.COMMERCE.products;
  }

  public async getPayments(
    cancelToken?: CancelToken,
  ): Promise<Moim.IPaginatedListResponse<any>> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [],
      paging: {},
    };
  }

  public async getPayment(
    _paymenteId: Moim.Id,
    cancelToken?: CancelToken,
  ): Promise<any> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {};
  }

  public async paymentCancel(_: Moim.Id, __: string): Promise<any> {
    return {};
  }

  public async getRefund(_: Moim.Id, cancelToken?: CancelToken): Promise<any> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {};
  }

  public async manualPurchaseConfirm(
    _: Moim.Id[],
  ): Promise<Moim.IPaginatedListResponse<Moim.Commerce.IPurchase>> {
    return {
      data: [],
      paging: {},
    };
  }

  public async calcPayment(
    _: Moim.Id,
    __: any,
    cancelToken?: CancelToken,
  ): Promise<Moim.Commerce.IPaymentCalcResponse> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }
    return RAW.COMMERCE.paymentCalc;
  }

  public async productVote(
    _: Moim.Id,
    __: Moim.Enums.VoteStatus,
  ): Promise<Moim.Commerce.IProduct> {
    return RAW.COMMERCE.productShow;
  }

  public async visitProductShow(_: Moim.Id): Promise<Moim.Commerce.IProduct> {
    return RAW.COMMERCE.productShow;
  }

  public async getCart(): Promise<Moim.Commerce.ICartResponse> {
    return RAW.COMMERCE.carts;
  }

  public async addToCart(): Promise<Moim.Commerce.ICartResponse> {
    return RAW.COMMERCE.carts;
  }
  public async updateCart(): Promise<Moim.Commerce.ICartResponse> {
    return RAW.COMMERCE.carts;
  }

  public async getMyCreditHistory(): Promise<
    Moim.IPaginatedListResponse<Moim.Commerce.ICreditHistoryItem>
  > {
    return RAW.COMMERCE.myCreditHistories;
  }

  public async getMyAvailableCoupons(
    _1: Moim.Id,
    _2: Moim.Commerce.ICartSellerItem[],
  ): Promise<
    Moim.IPaginatedListResponse<Moim.Commerce.IAvailableStatusCoupon>
  > {
    return RAW.COMMERCE.myAvailableCoupons;
  }

  public async getMyCoupons(
    _: Moim.Id,
  ): Promise<
    Moim.IPaginatedListResponse<Moim.Commerce.IAvailableStatusCoupon>
  > {
    return RAW.COMMERCE.myAvailableCoupons;
  }

  public async createShippingAddress() {
    return RAW.COMMERCE.shippingAddress;
  }

  public async getShippingAddress() {
    return RAW.COMMERCE.shippingAddressList;
  }

  public async updateShippingAddress() {
    return RAW.COMMERCE.shippingAddress;
  }

  public async setAsDefaultShippingAddress() {
    return RAW.COMMERCE.shippingAddress;
  }

  public async deleteShippingAddress() {
    return {
      data: {
        success: true,
      },
    };
  }

  public async getPaidFund(
    _productId: Moim.Id,
    _after?: string,
    _limit?: number,
  ) {
    return RAW.COMMERCE.purchaseItemFunItem;
  }

  public async postDownloadCoupon(
    _id: Moim.Id,
    _cancelToken?: CancelToken,
  ): Promise<Moim.Commerce.ICoupon> {
    return RAW.COMMERCE.DOWNLOADABLE_COUPON;
  }

  public async searchDownloadCoupons(
    _: Moim.Id,
    _2?: {
      limit?: number;
      query?: string;
      sellerId?: Moim.Id;
      after?: Moim.PagingValue;
    },
  ) {
    return RAW.COMMERCE.SEARCH_DOWNLOADABLE_COUPONS;
  }
}
