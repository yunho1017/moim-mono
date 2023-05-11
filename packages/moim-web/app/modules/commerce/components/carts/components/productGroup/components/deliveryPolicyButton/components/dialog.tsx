import React from "react";
import ReactResizeDetector from "react-resize-detector";
import ResponsiveDialog, {
  FixedWidthDialog,
} from "common/components/responsiveDialog";
import {
  MobileTitle,
  DeliveryPolicyDialogContainer,
  DeliveryPolicyContentsWrapper,
} from "../styled";
import DeliveryPolicyItem from "./deliveryPolicyItem";
import { Spacer } from "common/components/designSystem/spacer";

import useIsMobile from "common/hooks/useIsMobile";
import { DefaultDivider } from "common/components/divider";
import { useIntlShort } from "common/hooks/useIntlShort";

import { IRefHandler as IBottomSheetRefHandler } from "common/components/bottomSheet";

interface IProps {
  currency: string;
  isOpen: boolean;
  deliveryPolicies: Moim.Commerce.DeliveryPolicy[];
  close(): void;
}

const DeliveryPolicyDialog: React.FC<IProps> = ({
  currency,
  isOpen,
  close,
  deliveryPolicies,
}) => {
  const intl = useIntlShort();
  const isMobile = useIsMobile();
  const bottomSheetRef = React.useRef<IBottomSheetRefHandler>(null);
  const [mobileInventoryHeight, setInventoryHeight] = React.useState<
    number | undefined
  >(200);

  const handleResizeInventory = React.useCallback((_, height) => {
    setInventoryHeight(height > 200 ? height : 200);
  }, []);

  const mobileInventoryHeader = React.useMemo(() => {
    if (!isMobile) return null;

    return (
      <>
        <MobileTitle>{intl("shipping_price_dialog_title")}</MobileTitle>
        <DefaultDivider />
      </>
    );
  }, [isMobile]);

  return (
    <ResponsiveDialog
      bottomSheetRef={bottomSheetRef}
      open={isOpen}
      dialogBase={FixedWidthDialog}
      titleElement={intl("shipping_price_dialog_title")}
      titleAlignment={isMobile ? "Left" : "Center"}
      minHeight={mobileInventoryHeight}
      onCloseRequest={close}
    >
      <DeliveryPolicyDialogContainer>
        <ReactResizeDetector
          handleHeight={true}
          onResize={handleResizeInventory}
        >
          <div>
            {mobileInventoryHeader}
            {deliveryPolicies.map((deliveryPolicy, index) => (
              <>
                <DeliveryPolicyContentsWrapper key={deliveryPolicy.id}>
                  {index !== 0 && (
                    <>
                      <DefaultDivider />
                      <Spacer value={16} />
                    </>
                  )}
                  <DeliveryPolicyItem
                    deliveryPolicy={deliveryPolicy}
                    currency={currency}
                  />
                </DeliveryPolicyContentsWrapper>
              </>
            ))}
          </div>
        </ReactResizeDetector>
      </DeliveryPolicyDialogContainer>
    </ResponsiveDialog>
  );
};

export default React.memo(DeliveryPolicyDialog);
