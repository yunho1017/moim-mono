import { IAppState } from "app/rootReducer";

export const productItemLayoutSelector = (
  state: IAppState,
  type: keyof PickValue<Moim.Component.ILayoutConfig, "productItem">,
) => {
  return (
    state.group.theme.componentLayout?.productItem?.[type] ??
    state.group.theme.componentLayout?.productItem.default
  );
};

export const productShowLayoutSelector = (
  state: IAppState,
  type: Moim.Commerce.PRODUCT_TYPE,
): Moim.Component.ProductShow.IProductShowLayout | undefined => {
  return (
    state.group.theme.componentLayout?.productShow?.[type] ??
    state.group.theme.componentLayout?.productShow.normal
  );
};
export const productShowAllLayoutSelector = (
  state: IAppState,
):
  | Record<
      Moim.Commerce.PRODUCT_TYPE,
      Moim.Component.ProductShow.IProductShowLayout
    >
  | undefined => {
  return state.group.theme.componentLayout?.productShow;
};
