import React from "react";
import styled from "styled-components";
import ReactResizeDetector from "react-resize-detector";

import ResponsiveDialog, {
  FixedWidthDialog,
} from "common/components/responsiveDialog";
import ProductOptionInventory from "./component";
import AlertDialog from "common/components/alertDialog";

import { useIntlShort } from "common/hooks/useIntlShort";
import useIsMobile from "common/hooks/useIsMobile";
import { useStoreState } from "app/store";
import { useCloseProductOptionInventoryDialog } from "./hooks";

import { IRefHandler as IBottomSheetRefHandler } from "common/components/bottomSheet";

const InventoryContainer = styled.div`
  height: fit-content;
`;

function ProductOptionInventoryDialog() {
  const intl = useIntlShort();
  const isMobile = useIsMobile();
  const onClose = useCloseProductOptionInventoryDialog();
  const { product, open } = useStoreState(state => {
    const productId = state.productOptionInventoryDialog.productId;

    return {
      product: productId ? state.entities.commerce_product[productId] : null,
      open: state.productOptionInventoryDialog.open,
    };
  });
  const bottomSheetRef = React.useRef<IBottomSheetRefHandler>(null);

  const [alertMessage, setAlertMessage] = React.useState<string>();
  const [mobileInventoryHeight, setInventoryHeight] = React.useState<
    number | undefined
  >(undefined);

  const handleResizeInventory = React.useCallback((_, height) => {
    setInventoryHeight(height);
  }, []);

  const handleCloseAlert = React.useCallback(() => {
    setAlertMessage(undefined);
  }, []);

  if (!product) {
    return null;
  }

  return (
    <>
      <ResponsiveDialog
        bottomSheetRef={bottomSheetRef}
        open={open}
        dialogBase={FixedWidthDialog}
        titleElement={product.name}
        titleAlignment={isMobile ? "Left" : "Center"}
        minHeight={mobileInventoryHeight}
        onCloseRequest={onClose}
      >
        <InventoryContainer>
          <ReactResizeDetector
            handleHeight={true}
            onResize={handleResizeInventory}
          >
            <ProductOptionInventory
              product={product}
              isBottomSheetExpend={Boolean(bottomSheetRef.current?.isExpended)}
              onClose={onClose}
              setAlertMessage={setAlertMessage}
            />
          </ReactResizeDetector>
        </InventoryContainer>
      </ResponsiveDialog>
      <AlertDialog
        open={Boolean(alertMessage)}
        content={alertMessage}
        rightButtons={[
          {
            text: intl("ok_button"),
            onClick: handleCloseAlert,
          },
        ]}
        onClose={handleCloseAlert}
      />
    </>
  );
}
export default ProductOptionInventoryDialog;
