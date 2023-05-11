import { createContext } from "react";

interface ICartHandlerContext {
  onChangeProductGroup(
    options: {
      sellerId: string;
      type: Moim.Commerce.DeliveryProductGroupType;
      id?: Moim.Id;
    },

    items: (
      items: Moim.Commerce.ICartItemDatum[],
    ) => Moim.Commerce.ICartItemDatum[],
  ): void;
  updateMyCart(
    items: Moim.Commerce.IFlattenedCartSellerItem[],
    successMessage?: string,
  ): void;
  calculateMyCart(payload: {
    items?: Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem[];
    userCoupons?: string[];
    selectRecommendedCoupon?: boolean;
  }): void;
}

// Note: post 필드는 무조건 있음
const initialValue: ICartHandlerContext = {
  onChangeProductGroup: () => {},
  updateMyCart: () => {},
  calculateMyCart: () => {},
};

const CartHandlerContext = createContext<ICartHandlerContext>(initialValue);

export { CartHandlerContext };
