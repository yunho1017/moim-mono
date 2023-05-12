declare namespace Moim {
  declare namespace Commerce {
    interface IReduxState {
      info: ICommerceBasicInfo;
      categories: IListResponse<Id>;
      shippingAddress: IListResponse<Id>;
      getCategoriesLoading: boolean;
      productReviews: Record<Id, IIndexedPagingList<Id>>;
      productQuestions: Record<Id, IIndexedPagingList<Id>>;
      productComments: Record<Id, IIndexedPagingList<Id>>;
      productParticipants: Record<
        Id,
        IPaginatedListResponse<IPurchaseItemPurchase>
      >;
      purchasedProducts: Moim.IPaginatedListResponse<Id>;
    }

    interface ICommerceBasicInfo {
      nicepayBankCodes: { name: string; code: string }[];
      sweetTrackerCodes: { name: string; code: string }[];
    }

    interface IRefundBankMethod {
      name: string;
      account: string;
      bankCode: string;
    }

    type PAGE_TYPE = "infinite" | "paginated";

    interface ICategory {
      id: Id;
      name: string;
      sellerId: Id;
      parentId: Id;
      sortKey: string;
      createdAt: number;
      updatedAt: number;
      imageUrl?: string;
      isAll?: boolean;
      items: ICategory[];
    }

    interface IAccount {
      id: Id;
      type: string;
      name: string;
      callbackUrl: string;
      failureUrl: string;
      mid: string;
      createdAt: number;
    }

    interface ISellerConfig {
      cartEnabled: boolean;
      couponEnabled: boolean;
      creditEnabled: boolean;
      buyNowEnabled: boolean;
      afterAddingItemToCart: "giveOptions" | "moveToCartForce";
    }

    type SellerTextSetKey = "delivery_memo_title" | "delivery_memo_placeholder";

    interface ISellerTextSet {
      en: { singular: string; plural: string };
      ko: { singular: string; plural: string };
    }

    type ReviewCreditCaseType =
      | {
          policy: "normal";
          basic: number;
        }
      | {
          policy: "textOrMedia";
          text: number;
          media: number;
        }
      | {
          policy: "textOrImageOrVideo";
          text: number;
          image: number;
          video: number;
        };
    interface ISellerCreditCase {
      onWriteProductReview?: ReviewCreditCaseType;
    }
    interface ISeller {
      id: Id;
      groupId: Id;
      name: string;
      imageUrl?: string;
      parentId?: Id;
      currency?: string;
      accountIds: Id[];
      createdAt: number;
      updatedAt: number;
      config: ISellerConfig;
      creditPolicy?: string;
      creditRatio?: number;
      returnReplacementPolicy?: string;
      accounts?: IAccount[];
      productDetailKeys?: string[];
      customStatusDefinition?: {
        [value: string]: { [locale: string]: string };
      };
      creditCase?: ISellerCreditCase;
      textSet: Record<SellerTextSetKey, ISellerTextSet>;
      deliveryInformation?: {
        isAllowedAbroadShipping: boolean;
      };
    }

    type PRODUCT_TYPE = "normal" | "subscription" | "fund";
    type PRODUCT_STATUS = "onSale" | "scheduled" | "soldOut" | "completed";
    interface IImage extends Blockit.ImageProps {
      url: string;
      src?: string;
    }

    type CommerceCurrency = "KRW" | "USD";

    interface IProductOptionItem {
      value: string;
      title: Record<string, string>;
      description?: Record<string, string>;
      imageUrl?: string;
    }

    interface IProductOption {
      key: string;
      label: Record<string, string>;
      items: IProductOptionItem[];
    }

    interface IProductVariant {
      id: Moim.Id;
      productId: Moim.Id;
      status: PRODUCT_STATUS;
      additionalFees?: IProductAdditionalFee[];
      originalPrice: number;
      originalPrice_price: IProductPrice;
      price: number;
      price_price: IProductPrice;
      shippingFee: number;
      shippingFee_price: IProductPrice;
      creditAmount?: number;
      creditAmount_price?: IProductPrice;
      soldCount: number;
      stockCount: number;
      estimatedDeliveryAt: number;
      createdAt: number;
      updatedAt: number;
      values: Record<string, string>; // ex, {OPTION1: "VALUE1"}
      buyable: boolean;
    }

    interface IProductCustomField {
      isRequired: boolean;
      isSecret: boolean;
      type: "input" | "checkbox" | "textarea";
      label: string; // NOTE: title 역할
      description?: string;
      checkBoxLabel?: string;
    }

    interface IProductDetail {
      key: string;
      value: string;
    }

    interface ITimeSaleEntity {
      badgeBackgroundColor: string; // ex. "#f00808"
      badgeText: string; // "만선알림"
      discountedPrice: number; // 1000
      id: Id; // productSet id
      showTimeSaleTimer: boolean;
      timeSaleEndAt: number;
      timeSaleStartAt: number;
    }
    interface IProductAdditionalFee {
      type: "coin";
      resourceId?: Id;
      info?: Record<string, string>;
      amount: number;
    }

    interface IProductPrice {
      currency: string;
      value: string;
    }
    // Ref: https://vingle.atlassian.net/wiki/spaces/BT/pages/108560615/product
    interface IProduct {
      id: Id;
      type: PRODUCT_TYPE;
      sellerId: Id;
      categoryIds?: Id[];
      userId?: Id; // canpass userId
      name: string;
      description?: string;
      isDisplayed?: boolean;
      primaryDetails?: IProductDetail[];
      details?: IProductDetail[]; // Unknown type, 상품 고시정보
      images?: {
        web: IImage[];
        mobile: IImage[];
      };
      content?: Blockit.Blocks[];
      detailImages?: {
        web: IImage[];
        mobile: IImage[];
      };
      returnReplacementPolicy?: string; // NOTE: 환불/반품 정보(없는 경우 seller의 값을 참고.)
      repliesCount: number;
      reviewsCount: number;
      avgRate: number;
      status: PRODUCT_STATUS;
      sellingStart?: number;
      sellingEnd?: number;
      additionalFees?: IProductAdditionalFee[];
      additionalFeeInfos?: { type: "coin"; resourceId?: Id }[];
      price: number;
      originalPrice?: number;
      shippingFee?: number;
      creditAmount?: number;
      currency: CommerceCurrencyTypes | string;
      price_price: IProductPrice;
      originalPrice_price: IProductPrice;
      shippingFee_price: IProductPrice;
      creditAmount_price?: IProductPrice;
      creditRatio?: number; // NOTE: 적립률. (없는 경우 seller의 값을 참고.)
      creditExpiration?: number; // NOTE: 적립금 유효기간(unit: 일) (없는 경우 seller의 값을 참고.)
      stockCount?: number; // NOTE: 값이 없다면 제한이 없는 상품
      soldCount: number; // NOTE: 총수량은 stockCount + soldCount.
      soldAmount: number; // NOTE: 총 판매 금액
      buyersCount: number; // NOTE: 총 구매자 수
      goalAmount?: number; // NOTE: 목표 금액(펀딩 상품에만 적용)
      options?: IProductOption[];

      // purchase section, 구매시 필요한 정보.
      shippingRequired: boolean;
      phoneNumberRequired: boolean;
      pidRequired: boolean;
      commentsCount?: number;
      comment?: {
        title: string;
        description?: string;
      };
      customFields?: IProductCustomField[];
      accountIds: Id[];
      completeMessage?: any;
      completeImageUrl?: string;
      productSets?: ITimeSaleEntity[];
      recommendProductIds?: Moim.Id[];

      // 구독 상품에서만 존재.
      subsInterval?: "monthly" | "annual" | "test";
      subsTrialDays?: number; // unit: 일
      paypalPlanId?: string;

      createdAt: number;
      updatedAt: number;
      // productVariants?: IProductVariant[]; // Product show api return raw variant array
      productVariants?: Moim.Id[]; // 상품 옵션 들. it's normalized
      seller?: ISeller;
      imageUrls?: string[]; // DEPRECATE:

      vote_score: number;
      up_vote_score: number;
      down_vote_score: number;
      vote?: Forum.ISimpleVote;
      view_count: number;
      view_count_member: number;

      shippingRequired: boolean;
      buyable: boolean;
      deliveryGroupId?: Id;
      deliveryPolicies?: DeliveryPolicy[];
      selectedReviews?: {
        title: string;
        description?: string;
        queries: Moim.ContentsGroup.IQuery;
      };
    }

    interface IProductSet {
      id: Id;
      sellerId: Id;
      title: string;
      description: string;
      productIds: Id[];
      createdAt: number;
      updatedAt: number;

      // NOTE: TimeSale 같은 이벤트가 열리면 아래 필드들 활성화
      badgeBackgroundColor?: string; // ex. "#f00808"
      badgeText?: string;
      bannerImages?: {
        mobile: { url: string; width: number; height: number }[];
        web: { url: string; width: number; height: number }[];
      };
      timeSaleStatus?: "active" | "scheduled" | "completed";
      showTimeSaleTimer?: boolean;
      timeSalePrices?: {
        discountedPrice: number;
        productId: Id;
        productVariantId?: Id;
      }[];
      timeSaleStartAt?: number;
      timeSaleEndAt?: number;
    }

    interface IProductSet extends IProductSet {
      products: IProduct[];
    }

    interface IPurchaseReadyItem {
      productId: Id;
      sellerId: Id;
      variantId?: Id;
      qty: number;
    }

    interface ICartItemDatum {
      productId: Id;
      deliveryGroupId?: Id;
      productVariantId?: Id;
      quantity: number;
      checked: boolean;
      disabled: boolean;
      disabledReason?:
        | "INVALID_PRODUCT_STATUS"
        | "INVALID_PRODUCT_VARIANT_ID"
        | "EXCEEDED_STOCK_COUNT";
      // 사용 금지 entity 에 저장용
      product?: IProduct;
      productVariant?: IProductVariant;
    }

    type IFlattenedCartItemDatum = Omit<
      ICartItemDatum,
      "product" | "productVariant"
    >;

    type DeliveryProductGroupType =
      | "deliveryGroup"
      | "deliveryAlone"
      | "noDelivery";
    interface IDeliveryProductGroup<T> {
      type: DeliveryProductGroupType;
      items: T[];
    }
    interface ICartProductGroup extends IDeliveryProductGroup<ICartItemDatum> {
      id?: Id;
      deliveryGroupModel?: {
        name: string;
        description: string;
        policies: DeliveryPolicy[];
      };
    }

    interface ICartSellerItem {
      sellerId: Id;
      items: ICartProductGroup[];
    }

    interface IFlattenedCartSellerItem extends ICartSellerItem {
      items: IFlattenedCartItemDatum[];
    }

    interface IGroupedByDeliveryOptionItemDatum {
      id?: string;
      optionId?: string;
      items: IFlattenedCartItemDatum[];
    }

    interface IGroupedByDeliveryOptionCartSellerItem
      extends Omit<ICartSellerItem, "items"> {
      groupedItems: IGroupedByDeliveryOptionItemDatum[];
    }

    interface ICartResponse {
      id: Id;
      sellerId: Id;
      scopedUserId: Id;
      items: ICartSellerItem[];
      createdAt: number;
      updatedAt: number;
    }

    interface IFlattenedCartResponse extends ICartResponse {
      items: IFlattenedCartSellerItem[];
    }
    interface IGroupedByDeliveryOptionResponse extends ICartResponse {
      items: IGroupedByDeliveryOptionCartSellerItem[];
    }

    interface IPaymentCalcItem {
      sellerId: Id;
      totalPrice: number;
      totalPrice_price: IProductPrice;
      deliveryFee: number;
      deliveryFee_price: IProductPrice;
      items: IPaymentCalcItemProductGroup[];
    }

    interface IPaymentCalcItemProductGroup
      extends IDeliveryProductGroup<{
        productId: Id;
        quantity: number;
        deliveryErrorMessage: "MISSING_ADDRESS";
        deliveryFee: number;
        deliveryFee_price: IProductPrice;
      }> {
      id?: string;
      totalPrice: number;
      totalPrice_price: IProductPrice;
      deliveryFee: number;
      deliveryFee_price: IProductPrice;
      totalAdditionalFees?: IProductAdditionalFee[];
    }

    interface IUserCoupon {
      id: string;
      coupon: ICoupon;
      couponId: string;
      targetId?: string[];
      used: boolean;
      priceDiscount: number;
      priceDiscount_price: IProductPrice;
      shippingFeeDiscount: number;
      shippingFeeDiscount_price: IProductPrice;
      unableReason?:
        | "CART_COUPON_UNABLE_PRODUCT"
        | "CART_COUPON_UNABLE_PRICE"
        | "CART_COUPON_UNABLE_PERIOD"
        | "UNABLE_AMOUNT_COUPON_WITH_THIS_CURRENCY";
    }

    interface IPaymentCalcResponse {
      rawTotalPrice: number;
      rawTotalPrice_price: IProductPrice;
      totalPrice: number;
      totalAdditionalFees?: (IProductAdditionalFee & {
        errorCode?: "EXCEED_AMOUNT";
        errorMessage?: string;
      })[];
      totalPrice_price: IProductPrice;
      items: IPaymentCalcItem[];
      userCoupons: IUserCoupon[];
      userCouponsV2: IUserCoupon[];
      couponDiscount: number;
      couponDiscount_price: IProductPrice;
      estimatedCreditAmount: number;
      estimatedCreditAmount_price: IProductPrice;

      usedCoin?: {
        totalPrice?: number;
        maxPrice?: number;
        errorCode?: string;
        errorMessage?: string;
        coins?: ICalculateUsedCoin[];
      };
    }

    interface ICalculateUsedCoin {
      coinId: string;
      usedAmount: number;
      usedPrice: number;
      totalAmount: number;
      minimumAmount: number;
    }

    interface IRefundItemAttrs {
      productId: string;
      productVariantId?: string;
      quantity: number;
      productPrice: number;
      couponDiscount: number;
      deliveryFee: number;
    }

    // NOTE: 7/20, refunded 랑 cancelled만 보고 나머지는 나중에 확인.
    type IRefundStatus = "requested" | "refunded" | "rejected" | "cancelled";

    interface IRefund {
      id: Id;
      userId: Id;
      paymentId: Id;
      purchaseId: Id;
      reason: string;
      amount: number;
      items: IRefundItemAttrs[];
      refundedCoins?: { coinId: string; amount: number; price: number }[];
      refundedCredit: number;
      status: IRefundStatus;
      adminMessage?: string;
      createdAt: number;
      updatedAt: number;
      refundedAt?: number;
      refundBankMethod?: {
        name: string;
        account: string;
        bankCode: string;
      };
      additionalFees?: IProductAdditionalFee[];
    }

    interface IPayment {
      id: Id;
      userId: Id;
      sellerId: Id;
      accountId: Id;
      mid: Id;
      externalId?: Id;
      vbankName?: string;
      vbankNum?: string;
      vbankExpireAt?: number;
      status: PurchaseStatusType;
      payMethod: PaymentMethodType;
      detail?: { cardName?: string; cardNum?: string };
      buyerName: string;
      buyerEmail?: string;
      buyerPhone?: string;
      currency: CommerceCurrency | string;
      amount: number;
      amount_price: IProductPrice;
      additionalFees?: IProductAdditionalFee[];
      refundedAmount: number;
      refundedCredit: number;
      productName: string;
      paidAt: number;
      createdAt: number;
      updatedAt: number;
      refundedAt?: number;
      ediDate: string;
      usedCredit: number;
      purchases: IPurchase[];
      couponDiscount: number;
      userCoupons?: IUserCoupon[];
      cancellable: boolean;
      refunds?: IRefund[];
      signUrl?: string;
      usedCoins?: { coinId: string; amount: number; price: number }[];
    }

    interface IPurchaseDeliveryProductGroup
      extends IDeliveryProductGroup<IPurchaseItem> {
      deliveryFee: number;
      totalPrice: number;
      totalAdditionalFees?: IProductAdditionalFee[];
    }
    interface IPurchase {
      id: string;
      parentSellerId: string;
      sellerId: string;
      status: PurchaseStatusType;
      paymentId?: string;
      userId: string;
      username: string;
      userImgUrl: string;
      sourceUrl?: string;
      totalPrice: number;
      deliveryFee: number;
      buyerName: string;
      buyerPhone: string;
      recipientName?: string;
      recipientPhone?: string;
      address?: string;
      address2?: string;
      zipcode?: string;
      memo?: string;
      currency: CommerceCurrency | string;
      memo: string;
      anonymous: boolean;
      createdAt: number;
      updatedAt: number;
      refundedAt?: number;
      payment: IPayment;
      purchaseItems: IDenormalizedPurchaseItem[];
      items: IPurchaseDeliveryProductGroup[];
      zipcode: string;
      couponDiscount?: number;
      cancelledCouponDiscount?: number;
      refundedDeliveryFee?: number;
      refundedProductPrice?: number;
    }

    interface IPurchaseItemPurchase {
      totalPrice: number;
      currency: CommerceCurrency | string;
      buyerName: string;
      userId: Id;
      profileId?: Id;
      username: string;
      comment?: string;
      createAt?: number;
      anonymous?: boolean;
      userImageUrl?: string;
    }

    interface ISellerCustomButton {
      link: string;
    }
    interface IPurchaseItem {
      id: Id;
      purchaseId: string;
      userId: Id;
      profileId?: Id; // use for different moim user
      sellerId: Id;
      productId: Id;
      productName: string;
      imageUrl?: string;
      price: number;
      price_price: IProductPrice;
      additionalFees?: IProductAdditionalFee[];
      quantity: number;
      refundedQuantity: number;
      anonymous: boolean;
      productVariantId?: string;
      productVariantValue?: Record<string, Record<string, string>>;
      createdAt: number;
      updatedAt: number;
      paidAt: number;
      creditAmount?: number;
      creditExpiration?: number;
      status: PurchaseStatusType;
      customStatus?: string;
      reviewable: "alreadyWritten" | "canWrite";
      deliveryId?: Id;
      comment?: string;
      customFields?: {
        key: string;
        label?: { [key: string]: string };
        value: string | boolean;
      }[];
      shippingRequired: boolean;
      purchase?: IPurchaseItemPurchase;
      reviewId?: string;
      deliveryGroup?: {
        policy: DeliveryPolicy;
      };
      customButtons?: ISellerCustomButton[];
    }

    interface IDenormalizedPurchaseItem extends IPurchaseItem {
      product?: IProduct;
      seller: ISeller;
    }

    type PurchaseStatusType =
      | "deliveryDelayed"
      | "created"
      | "vbankPending"
      | "vbankExpired"
      | "paymentError"
      | "paid"
      | "preparingForDelivery"
      | "waitingToBePickedUp"
      | "inTransit"
      | "deliveryCompleted"
      | "refundRequested"
      | "refunded"
      | "purchaseCompleted"
      | "cancelled"
      | "waitingForDevlieryReception"
      | "waitingForSign";

    type CreditEventType =
      | "received"
      | "used"
      | "expired"
      | "returned"
      | "cancelled";
    type CreditSourceType =
      | "purchaseItem"
      | "payment"
      | "refund"
      | "productReview"
      | "signUp"
      | "promotion"
      | "seller";

    interface ICreditHistoryItem {
      id: Id;
      amount: number;
      currency: string;
      sellerId: Id;
      scopedUserId: Id;
      description: string;
      sourceType: CreditSourceType;
      sourceId: Id;
      sourceUrl?: string;
      customTitle?: string;
      event: CreditEventType;
      createdAt: number;
      expireAt?: number;
    }

    type PaymentMethodType = "CARD" | "VBANK" | "PAYPAL" | "BANK_TRANSFER";

    type CouponStatus = "active" | "used" | "expired" | "deleted" | "scheduled";
    type CouponBenefitTarget = "price" | "shippingFee";
    type CouponBenefitType = "rate" | "amount";
    interface ICouponBenefit {
      type: CouponBenefitType;
      value: number;
      maxAmount?: number;
    }

    interface ICouponCondition {
      minPurchaseAmount?: number;
      singleItem?: boolean;
    }

    type ICoupons = ICoupon | IDownloadableCoupon;

    interface IDownloadConfig {
      maxCount: number;
      period: {
        start?: number;
        end: number;
      };
    }

    interface ICoupon {
      id: Id;
      sellerId: Id;
      userId: Id;
      name: string;
      description: string;
      targetIds: Id[]; // productId / categoryId...
      targets: {
        id: Id;
        label: string;
        type: "product" | "seller" | "product_set" | "category";
      }[];
      currency: string; // KRW, USD ...
      parentSellerId: Id;
      benefitTarget: CouponBenefitTarget;
      benefit: ICouponBenefit;
      status: CouponStatus;
      usedCount: number;
      condition?: ICouponCondition;
      startAt?: number;
      endAt: number;
      maxCount?: number; // 쿠폰의 총량
      userCouponsCount?: number; // 유저에게 발급된 쿠폰수
      createdAt: number;
      updatedAt: number;

      // NOTE: this fields are exist for type safe
      donwloadedCount?: number;
      downloadConfig?: IDownloadConfig;
      isDownloaded?: boolean;
    }

    interface IDownloadableCoupon extends ICoupon {
      donwloadedCount: number;
      downloadConfig: IDownloadConfig;
      isDownloaded: boolean;
    }

    interface IAvailableStatusCoupon {
      enabled: boolean; // 사용 가능 여부
      id: Id;
      parentSellerId: Id;
      sellerId: Id;
      userId: Id;
      scopedUserId: Id;
      couponId: Id;
      status: CouponStatus;
      enableAt?: number;
      expireAt: number;
      createdAt: number;
      updatedAt: number;
      priceDiscount: number;
      shippingFeeDiscount: number;
      coupon: ICoupon;
    }

    interface IProductItemVisibilityOption {
      disableImage?: boolean;
      disableClipButton?: boolean;
      disableTitle?: boolean;
      disableDescription?: boolean;
      disableDiscountPrice?: boolean;
      disablePrice?: boolean;
      disableRate?: boolean;
      disableShippingFee?: boolean;
      disableLeftStock?: boolean;
      disableCredit?: boolean;
      disableEngage?: boolean;
      disableSeller?: boolean;
      disableCartButton?: boolean;
      disableBuyNowButton?: boolean;
      disableBottomPadding?: boolean;

      descriptionShaveLine?: number;
    }

    interface ICommerceShippingRecipientPhonInfo {
      regionCode: string; // ex, KR, US
      countryCode: string; // ex, 82
      nationalNumber: string;
    }

    interface ICommerceShippingAddress {
      id: string;
      userId: string;
      name: string;
      recipientName: string;
      recipientPhoneInfo: ICommerceShippingRecipientPhonInfo;
      recipientPhoneNumber: string;
      address: string;
      address2?: string;
      countryCode?: string;
      zipCode: string;
      state?: string;
      city?: string;
      memo?: string;
      sortKey: string;
    }

    type DeliveryPolicy =
      | { id: string; name: string; description?: string; type: "max" }
      | {
          id: string;
          name: string;
          description?: string;
          type: "priceList";
          target: "price";
          priceList: { lt?: number; gte?: number; price: number }[];
        }
      | ({
          id: string;
          name: string;
          description?: string;
          type: "custom";
        } & Record<string, any>);

    interface IDeliveryGroup {
      id: Id;
      parentSellerId: Id;
      sellerId: Id;
      activeSellerId: Id;
      name: string;
      description: string;
      policies: DeliveryPolicy[];

      createdAt: number;
      updatedAt: number;
    }
  }
}
