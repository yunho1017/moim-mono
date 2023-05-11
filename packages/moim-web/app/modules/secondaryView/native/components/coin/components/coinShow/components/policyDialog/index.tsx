import * as React from "react";
import { FormattedMessage } from "react-intl";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
// components
import { CoinGuideDialog as Dialog } from "common/components/basicResponsiveDialog/styled";
import AppBar from "common/components/appBar";
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import { DefaultDivider } from "common/components/divider";
import { Spacer } from "common/components/designSystem/spacer";
import CoinPreview from "./components/coinPreview";
import Inner from "./components/inner";
// styled
import {
  CloseButton,
  GuideDialogButtonContainer,
  GuideDialogCloseButton,
  dialogContentStyle,
  DialogContent,
} from "./styled";

interface IProps {
  coin: Moim.Community.Coin.ICoin;
  isOpen: boolean;
  onClose(): void;
}
const CoinPolicyDialog: React.FC<IProps> = ({
  coin,
  isOpen,

  onClose,
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <BottomSheet open={isOpen} onDismiss={onClose}>
          <CoinPreview
            title={coin.name}
            image={coin.preview?.S ?? coin.imageUrl}
          />
          <Spacer value={12} />
          <Inner
            policyTitle={coin.policyTitle}
            policy={coin.policy}
            coinCurrency={coin.symbol}
            currencyExchangeConfigs={coin.currencyExchangeConfigs}
          />
          <Spacer value={16} />
          <GuideDialogButtonContainer>
            <DefaultDivider />
            <GuideDialogCloseButton onClick={onClose}>
              <FormattedMessage id="button_ok" />
            </GuideDialogCloseButton>
          </GuideDialogButtonContainer>
        </BottomSheet>
      ) : (
        <Dialog open={isOpen} onClose={onClose}>
          <CustomAppBarModalLayout
            appBar={
              <AppBar
                leftButton={<CloseButton onClick={onClose} />}
                titleElement={
                  <CoinPreview
                    title={coin.name}
                    image={coin.preview?.S ?? coin.imageUrl}
                  />
                }
              />
            }
            hasAppBarBorder={false}
            contentStyle={dialogContentStyle}
          >
            <DialogContent>
              <Inner
                policyTitle={coin.policyTitle}
                policy={coin.policy}
                coinCurrency={coin.symbol}
                currencyExchangeConfigs={coin.currencyExchangeConfigs}
              />
            </DialogContent>
          </CustomAppBarModalLayout>
        </Dialog>
      )}
    </>
  );
};

export default CoinPolicyDialog;
