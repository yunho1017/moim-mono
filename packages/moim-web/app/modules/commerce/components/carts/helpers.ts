import { IAppState } from "app/rootReducer";

export function getCartItemBuyableSelector(
  item: Moim.Commerce.IFlattenedCartItemDatum,
  state: IAppState,
) {
  const productVariant = item.productVariantId
    ? state.entities.commerce_variants[item.productVariantId]
    : undefined;
  const product = state.entities.commerce_product[item.productId];

  return (
    (productVariant ? productVariant.buyable : true) &&
    (product ? product.buyable : true) &&
    !item.disabled
  );
}

export function groupingByDeliveryOptionCart(
  cart?: Moim.Commerce.ICartResponse,
): Moim.Commerce.IGroupedByDeliveryOptionResponse | undefined {
  if (!cart) {
    return undefined;
  }
  return {
    ...cart,
    items: groupingByDeliveryOption(cart.items),
  };
}

export function flattenCartSellerItem(
  items: Moim.Commerce.ICartSellerItem[],
): Moim.Commerce.IFlattenedCartSellerItem[] {
  return items.map<Moim.Commerce.IFlattenedCartSellerItem>(item => ({
    ...item,
    items: item.items.reduce<Moim.Commerce.IFlattenedCartItemDatum[]>(
      (result, current) => {
        return result.concat(
          current.items.map<Moim.Commerce.IFlattenedCartItemDatum>(i => ({
            productId: i.productId,
            deliveryGroupId: i.deliveryGroupId,
            productVariantId: i.productVariantId,
            quantity: i.quantity,
            checked: i.checked,
            disabled: i.disabled,
            disabledReason: i.disabledReason,
          })),
        );
      },
      [],
    ),
  }));
}

export function groupingByDeliveryOption(
  items: Moim.Commerce.ICartSellerItem[],
): Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem[] {
  return items.map<Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem>(
    item => ({
      ...item,
      groupedItems: item.items.map<
        Moim.Commerce.IGroupedByDeliveryOptionItemDatum
      >(_item => {
        const notCustomOption = _item.deliveryGroupModel?.policies.find(
          policy => policy.type !== "custom",
        );
        return {
          items: _item.items,
          id: _item.id,
          optionId: notCustomOption?.id,
        };
      }, []),
      items: undefined,
    }),
  );
}

export function getCartItemsFromFlattenedCart(
  items: Moim.Commerce.ICartSellerItem[],
): Moim.Commerce.ICartItemDatum[] {
  return items.reduce<Moim.Commerce.ICartItemDatum[]>((result, sellerItem) => {
    const _cartItems = sellerItem.items.reduce<Moim.Commerce.ICartItemDatum[]>(
      (_result, productGroup) => {
        return _result.concat(productGroup.items);
      },
      [],
    );
    return result.concat(_cartItems);
  }, []);
}

export function checkedFilterGroupedByDeliveryOption(
  items: Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem[],
): Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem[] {
  return (
    items
      .map<Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem | null>(
        item => {
          const newItems = item.groupedItems
            .map<Moim.Commerce.IGroupedByDeliveryOptionItemDatum | null>(
              _item => {
                const _newItems = _item.items.filter(x => x.checked);
                return _newItems.length
                  ? {
                      ..._item,
                      items: _newItems,
                    }
                  : null;
              },
            )
            .filter((i): i is Moim.Commerce.IGroupedByDeliveryOptionItemDatum =>
              Boolean(i),
            );

          return newItems.length
            ? {
                sellerId: item.sellerId,
                groupedItems: newItems,
              }
            : null;
        },
      )
      .filter((i): i is Moim.Commerce.IGroupedByDeliveryOptionCartSellerItem =>
        Boolean(i),
      ) ?? []
  );
}

export function checkedFilterCartSellerItem(
  items: Moim.Commerce.ICartSellerItem[],
): Moim.Commerce.ICartSellerItem[] {
  return items
    .map(item => {
      const newItems = item.items
        .map(_item => {
          const _newItems = _item.items.filter(__item => __item.checked);

          return _newItems.length
            ? {
                ..._item,
                items: _newItems,
              }
            : null;
        })
        .filter((_item): _item is Moim.Commerce.ICartProductGroup =>
          Boolean(_item),
        );

      return newItems.length
        ? {
            sellerId: item.sellerId,
            items: newItems,
          }
        : null;
    })
    .filter((i): i is Moim.Commerce.ICartSellerItem => Boolean(i));
}
