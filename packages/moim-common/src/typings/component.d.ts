declare namespace Moim {
  declare namespace Component {
    interface ILayoutConfig {
      productItem: {
        default: ProductItem.IWrapper;
        search?: ProductItem.IWrapper;
        seller?: ProductItem.IWrapper;
        listShow?: ProductItem.IWrapper;
        listPreview?: ProductItem.IWrapper;
        deliveryGroup?: ProductItem.IWrapper;
        recommendProduct?: ProductItem.IWrapper;
        embeddingProduct?: ProductItem.IWrapper;
        embeddingProduct_web?: ProductItem.IWrapper;
      };

      productShow: Record<
        Commerce.PRODUCT_TYPE,
        ProductShow.IProductShowLayout
      >;
    }

    declare namespace ProductItem {
      interface IBaseElement {
        flex?: number;
      }

      export interface IWrapper extends IBaseElement {
        type: "wrapper";
        // TODO: 이 부분 convert
        direction?: "column" | "row";
        horizontalAlign?: "start" | "center" | "end" | "space-around";
        verticalAlign?: "start" | "center" | "end" | "space-around";
        gap?: number;
        children: ProductCellBlockType[];
      }
      interface IImage extends IBaseElement {
        type: "image";
        ratio?: string; // ex) "4:3" "5:3"
        radius?: number;
        showWishButton?: boolean;
      }
      interface ITimer extends IBaseElement {
        type: "timer";
        color: Blockit.ColorValue;
      }
      interface IProductName extends IBaseElement {
        type: "product-name";
        maxLine?: number;
        textStyle?: Blockit.TEXT_SUB_TYPE;
      }
      interface IDescription extends IBaseElement {
        type: "description";
        maxLine?: number;
        textStyle?: Blockit.TEXT_SUB_TYPE;
      }
      interface IDiscountPrice extends IBaseElement {
        type: "discount-price";
        textStyle?: Blockit.TEXT_SUB_TYPE;
      }
      interface IPrice extends IBaseElement {
        type: "price";
        textStyle?: Blockit.TEXT_SUB_TYPE;
      }

      interface IRating extends IBaseElement {
        type: "rating";
        color: Blockit.ColorValue;
      }
      interface IShipping extends IBaseElement {
        type: "shipping";
      }
      interface IStatus extends IBaseElement {
        type: "status";
      }
      interface IStockCount extends IBaseElement {
        type: "stock-count";
      }
      interface ICredit extends IBaseElement {
        type: "credit";
      }

      interface IStat extends IBaseElement {
        type: "stat";
        showVoteScore?: boolean;
        showCommentCount?: boolean;
        showViewCount?: boolean;
      }
      interface ISeller extends IBaseElement {
        type: "seller";
        textStyle?: Blockit.TEXT_SUB_TYPE;
      }
      interface ICartButton extends IBaseElement {
        type: "add-cart-button";
      }
      interface IBuyNowButton extends IBaseElement {
        type: "buy-now-button";
      }
      interface IBuyersCount extends IBaseElement {
        type: "buyers-count";
        textStyle?: Blockit.TEXT_SUB_TYPE;
      }

      interface IProgressBar extends IBaseElement {
        type: "progress-bar";
        color: Blockit.ColorValue;
        border: number;
      }

      interface ISoldAmount extends IBaseElement {
        type: "sold-amount";
        color?: ColorValue;
        textStyle?: TextSubTypes;
        showPercentage?: boolean;
        showAmount?: boolean;
      }

      interface IGoalAmount extends IBaseElement {
        type: "goal-amount";
        color?: ColorValue;
        textStyle?: TextSubTypes;
      }

      type ProductCellBlockType =
        | IWrapper
        | IImage
        | ITimer
        | IProductName
        | IDescription
        | IDiscountPrice
        | IPrice
        | ICredit
        | IRating
        | IShipping
        | IStatus
        | IStockCount
        | IBuyersCount
        | IStat
        | ISeller
        | ICartButton
        | IBuyNowButton
        | IProgressBar
        | ISoldAmount
        | IGoalAmount;
    }
    declare namespace ProductShow {
      interface IProductSummaryBaseElement {
        dividerConfig?: {
          hasBottomDivider?: boolean;
        };
      }

      interface ITimer extends IProductSummaryBaseElement {
        type: "product-summary-timer";
      }

      interface IProductName extends IProductSummaryBaseElement {
        type: "product-summary-name";
        maxLine?: number; // default: 제한 없음
        textStyle?: Blockit.TEXT_SUB_TYPE; // default: h2
        color?: Blockit.ColorValue; // default: grey800 TBD
      }

      interface IDescription extends IProductSummaryBaseElement {
        type: "product-summary-description";
        maxLine?: number; // default: 제한없음
        textStyle?: Blockit.TEXT_SUB_TYPE; // default: p-body3
        color?: Blockit.ColorValue; // TBD
      }

      interface IDiscountPrice extends IProductSummaryBaseElement {
        type: "product-summary-discount-price";
        textStyle?: Blockit.TEXT_SUB_TYPE; // default: body3
      }

      interface IPrice extends IProductSummaryBaseElement {
        type: "product-summary-price";
        textStyle?: Blockit.TEXT_SUB_TYPE; // default: h2
        color?: Blockit.ColorValue; // default: grey800 TBD
      }

      interface IProgressBar extends IProductSummaryBaseElement {
        type: "product-summary-progress-bar";

        // TBD
        color?: Blockit.ColorValue; // default: primary-main
        border?: number; // default: 2
        borderRadius?: number; // default: 0
      }

      interface ICredit extends IProductSummaryBaseElement {
        type: "product-summary-credit";

        // TBD
        textStyle?: Blockit.TEXT_SUB_TYPE; // default: body3
        color?: Blockit.ColorValue; // default: grey300
        showIcon?: boolean; // default: true
      }

      interface IRating extends IProductSummaryBaseElement {
        type: "product-summary-rating";
        // TBD
        color?: Blockit.ColorValue; // default: yellow
      }

      interface IShipping extends IProductSummaryBaseElement {
        type: "product-summary-shipping";
        // TBD
        labelTextStyle?: Blockit.TEXT_SUB_TYPE; // default: body3
        labelColor?: Blockit.ColorValue; // default: grey500

        valueTextStyle?: Blockit.TEXT_SUB_TYPE; // default: body3
        valueColor?: Blockit.ColorValue; // default: grey800
      }

      interface ICategory extends IProductSummaryBaseElement {
        type: "product-summary-category";
      }

      interface IPrimaryDetails extends IProductSummaryBaseElement {
        type: "product-summary-primary-detail";
        // TBD
        labelTextStyle?: Blockit.TEXT_SUB_TYPE; // default: body3
        labelColor?: Blockit.ColorValue; // default: grey500

        valueTextStyle?: Blockit.TEXT_SUB_TYPE; // default: body3
        valueColor?: Blockit.ColorValue; // default: grey800
      }

      interface IFundingStatus extends IProductSummaryBaseElement {
        type: "product-summary-funding-status";
        // TBD
        size?: Moim.DesignSystem.Size; // default: L
      }

      interface ISalesInformation extends IProductSummaryBaseElement {
        type: "product-summary-sales-information";
      }

      interface IStat extends IProductSummaryBaseElement {
        type: "product-summary-stat";
        // TBD
        color?: Blockit.ColorValue; // default: grey400
      }

      interface ISeller extends IProductSummaryBaseElement {
        type: "product-summary-seller";
        textStyle?: Blockit.TEXT_SUB_TYPE; // default: body3
        color?: Blockit.ColorValue; // default: grey800 TBD
        showAvatar?: boolean; // default: true
      }

      interface IOptionSelection extends IProductSummaryBaseElement {
        type: "product-summary-option-selection";
      }

      type ProductSummaryChildType =
        | ITimer
        | IProductName
        | IDescription
        | IDiscountPrice
        | IPrice
        | IProgressBar
        | ICredit
        | IRating
        | IShipping
        | IPrimaryDetails
        | IFundingStatus
        | ISalesInformation
        | IStat
        | ISeller
        | IOptionSelection
        | ICategory;

      interface IProductSummary {
        type: "product-summary";
        ratio?: string; // ex: 1:1 / 1:2 / 2:1, default: 1:1
        // TBD
        thumbnail?: {
          ratio?: string; // ex: 1:1/ 1:2/ 2:1/ 3:4/ 4:3/ 5:3/ 3:5 center crop , default: 1:1
          radius?: number; // default: 0
        };
        children: ProductSummaryChildType[];
      }

      interface IProductTab {
        type: "product-tab";
        children: (
          | { type: "product-detail" }
          | { type: "product-reviews" }
          | { type: "product-qnas" }
          | { type: "product-refund" }
          | { type: "product-participants" }
          | { type: "product-comments" }
        )[];
      }

      interface ISelectedReview {
        type: "contents-group";
        column?: number;
        row?: number;
        gap?: number;
      }

      interface IProductGroup {
        type: "product-group";
        column?: number;
        row?: number;
        gap?: number;
      }

      // TBD
      interface ICouponGroup {
        type: "coupon-group";
      }

      interface IProductShowLayout {
        children: (
          | IProductSummary
          | IProductTab
          | ISelectedReview
          | IProductGroup
          | ICouponGroup
        )[];
      }
    }
  }
}
