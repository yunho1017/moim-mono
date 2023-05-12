declare namespace Moim {
  declare namespace Blockit {
    declare namespace Commerce {
      type ProductListType = "seller" | "category" | "productSet" | "campaign";

      interface IDownloadableCouponList extends BaseBlock {
        type: "downloadable-coupon-list";
        resources: string[];
      }

      interface IProductListPreviewBlock extends BaseBlock {
        type: "product-list-preview";
        title: string;
        description?: string;
        resourceType: ProductListType;
        resourceId?: string; // sellerId, categoryId, productSetId
        itemLayout?: Moim.Component.ProductItem.IWrapper;
        itemLayout_web?: Moim.Component.ProductItem.IWrapper;
        listElement?: IListStyleElement;
        direction_web?: "horizontal" | "vertical"; // :DEPRECATED: default: horizontal
        maxDisplayedItemsCount: number; // :DEPRECATED:
        maxDisplayedItemsCount_web?: number; // :DEPRECATED:
      }

      interface IProductListBlock extends BaseBlock {
        type: "product-list";
        title: string;
        description?: string;
        resourceType: ProductListType;
        resourceId?: string;
        listElement?: IListStyleElement;
        itemLayout?: Moim.Component.ProductItem.IWrapper;
        itemLayout_web?: Moim.Component.ProductItem.IWrapper;
      }

      interface ICategoryBlock extends BaseBlock {
        type: "category";
        categoryId?: string; // undefined means "all"
        itemContainerWidth: number; // Unit: percentage; default 100;
        itemContainerWidth_web: number; // Unit: percentage; default 100;
        listElement?: IListStyleElement;
        columnCount: number;
        columnCount_web: number;
        rowCount?: number; // TBD
        rowCount_web?: number; // TBD
        itemGutterSize?: number; // TBD px unit
        itemGutterSize_web?: number; // TBD px unit
        itemStyle?: IBlockitStyle;
        itemStyle_web?: IBlockitStyle; // TBD
      }
    }
  }
}
