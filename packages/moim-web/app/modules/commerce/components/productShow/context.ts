import { createContext } from "react";

interface IProductShowHeaderContext {
  productId: string;
  product: Moim.Commerce.IProduct;
}

// Note: post 필드는 무조건 있음
const initialValue: IProductShowHeaderContext = {
  product: {} as any,
  productId: "",
};

const ProductShowHeaderContext = createContext<IProductShowHeaderContext>(
  initialValue,
);

export { ProductShowHeaderContext };
