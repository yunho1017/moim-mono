import * as React from "react";
import styled from "styled-components";

import { ProductOptionItem } from "common/components/commerce/optionItem";
import ButtonCasePayment, {
  IButton,
} from "common/components/commerce/optionItem/buttonCase/payment";

import { useActions } from "app/store";
import { putProductVote } from "app/actions/commerce";
import { px2rem } from "common/helpers/rem";
import { useIntlShort } from "common/hooks/useIntlShort";
import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";
import useGroupTexts from "common/hooks/useGroupTexts";

import { useOpenProductOptionInventoryDialog } from "common/components/productItemCell/components/optionInventoryDialog/hooks";
import { VoteStatus } from "app/enums";

const StyledOptionItem = styled(ProductOptionItem)`
  padding: ${px2rem(8)} 0 ${px2rem(2)};
  & + & {
    margin: ${px2rem(8)} 0 ${px2rem(2)};
  }
`;

interface IProps {
  product: Moim.Commerce.IProduct;
  onDelete(productId: string): void;
}

const ProductItem: React.FC<IProps> = ({ product, onDelete }) => {
  const myShoppingWishListText = useGroupTexts(
    "my_shopping_wishlist_menu_title",
  );
  const fundingButtonText = useGroupTexts("back_this_project");
  const intl = useIntlShort();
  const openProductOptionInventoryDialog = useOpenProductOptionInventoryDialog(
    product.id,
  );
  const { open } = useSnackbar({
    text: intl("toast_message_my_shopping_wishlist_delete_item_success", {
      wishlist_title: myShoppingWishListText?.singular ?? "",
    }),
  });
  const { dispatchPutProductVote } = useActions({
    dispatchPutProductVote: putProductVote,
  });
  const handleClickDelete = React.useCallback(async () => {
    try {
      await dispatchPutProductVote(
        product.id,
        product.vote?.type ?? VoteStatus.POSITIVE,
        VoteStatus.NONE,
      );
      open();
      onDelete(product.id);
    } catch (err) {}
  }, [product.vote?.type, product.id, dispatchPutProductVote, onDelete, open]);
  const handleAddToCart = React.useCallback(async () => {
    openProductOptionInventoryDialog();
  }, [openProductOptionInventoryDialog]);

  const buttons: IButton[] = React.useMemo(
    () => [
      {
        style: "general",
        text: intl("button_delete"),
        handler: handleClickDelete,
      },
      {
        style: "primary",
        text:
          product.type !== "fund"
            ? intl("button_add_to_cart")
            : fundingButtonText?.singular ?? "",
        disabled: !product.buyable,
        handler: handleAddToCart,
      },
    ],
    [
      product.type,
      product.buyable,
      fundingButtonText,
      handleClickDelete,
      handleAddToCart,
    ],
  );

  return (
    <StyledOptionItem productId={product.id} qty={1}>
      {({ Title, Price, defaultValue }) => (
        <>
          <Title>{defaultValue.title}</Title>
          <Price>{defaultValue.price}</Price>
          <ButtonCasePayment buttons={buttons} />
        </>
      )}
    </StyledOptionItem>
  );
};

export default React.memo(ProductItem);
