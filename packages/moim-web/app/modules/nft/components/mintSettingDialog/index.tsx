import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useActions } from "app/store";
import { ActionCreators as NftActionCreators } from "app/actions/nft";
// hooks
import useGroupTexts from "common/hooks/useGroupTexts";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";
import useOpenState from "common/hooks/useOpenState";
import useIsMobile from "common/hooks/useIsMobile";
// helpers
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { mintNft } from "app/common/helpers/nft";
// components
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import BoxNumberInput from "common/components/designSystem/boxInput/preset/number";
import { Spacer } from "common/components/designSystem/spacer";
import { B2Regular, B4Regular } from "common/components/designSystem/typos";
import AlertDialog from "common/components/alertDialog";
import BottomSheet from "common/components/bottomSheet";
import AppBar from "common/components/appBar";
import DialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
// styled
import { DefaultDivider } from "app/common/components/divider/styled";
import {
  MintButton,
  CloseButton,
  DialogWrapper,
  Title,
  MintSettingPriceWrapper,
  MintSettingPrice,
  GasFeeInfoWrapper,
  InfoIcon,
  MintSettingBottmSheetWrapper,
  MintSettingBottmSheetContainer,
} from "./styled";

const Dialog = withStyles({
  root: {
    zIndex: "1400 !important" as any,
  },
  paper: {
    width: px2rem(455),
    height: px2rem(264),
  },
  [`@media ${MEDIA_QUERY.ONLY_MOBILE}`]: {
    width: "100%",
  },
})(DialogBase);

interface IProps {
  mintSettingDialogOpen: boolean;
  max: number;
  contractId: string;
  scheduleId: string;
  price?: number;
  currency?: string;
  onClose(): void;
}

const MintSettingDialog: React.FC<IProps> = ({
  mintSettingDialogOpen,
  max,
  contractId,
  scheduleId,
  price,
  currency,
  onClose,
}) => {
  const isMobile = useIsMobile();
  const currentGroup = useCurrentGroup();
  const currentHubGroup = useCurrentHubGroup();

  const [qty, setQty] = React.useState<number>(1);
  const buttonMintText = useGroupTexts("button_mint_nft");

  const {
    isOpen: gasFeeAlertOpenStatus,
    open: openGasFeeAlert,
    close: closeGasFeeAlert,
  } = useOpenState();

  const { open } = useActions({
    open: NftActionCreators.openMintRedirectLoadingDialog,
  });

  const handleClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  const handleChangeQty = React.useCallback((val: number) => {
    setQty(val);
  }, []);

  const handleClickMint = React.useCallback(() => {
    open();
    if (currentGroup?.id && currentHubGroup?.id) {
      mintNft(
        currentHubGroup?.id,
        currentGroup?.id,
        window.location.href,
        undefined,
        contractId,
        scheduleId,
        qty,
      );
    }
  }, [
    contractId,
    currentGroup?.id,
    currentHubGroup?.id,
    open,
    qty,
    scheduleId,
  ]);

  return (
    <>
      {isMobile ? (
        <BottomSheet
          open={mintSettingDialogOpen}
          minHeight={200}
          disableExpand={true}
          disableHandle={false}
          onCloseRequest={handleClose}
        >
          <MintSettingBottmSheetWrapper>
            <MintSettingBottmSheetContainer>
              <MintSettingPriceWrapper>
                <B2Regular>
                  <FormattedMessage id="dialog_nft_mint_total_price" />
                </B2Regular>
                <MintSettingPrice>
                  {price} {currency}
                </MintSettingPrice>
              </MintSettingPriceWrapper>
              <GasFeeInfoWrapper role="button" onClick={openGasFeeAlert}>
                <B4Regular>
                  <FormattedMessage id="nft_collection_sale_schedule_show_gas_fee" />
                </B4Regular>
                <InfoIcon />
              </GasFeeInfoWrapper>
              <Spacer value={13} />
              <BoxNumberInput
                size="Large"
                value={qty}
                min={1}
                max={max}
                onChange={handleChangeQty}
              />
              <Spacer value={12} />
            </MintSettingBottmSheetContainer>
            <DefaultDivider />
            <MintSettingBottmSheetContainer>
              <Spacer value={12} />
              <MintButton onClick={handleClickMint}>
                {buttonMintText?.singular}
              </MintButton>
            </MintSettingBottmSheetContainer>
          </MintSettingBottmSheetWrapper>
        </BottomSheet>
      ) : (
        <Dialog open={mintSettingDialogOpen} onClose={handleClose}>
          <CustomAppBarModalLayout
            appBar={
              <AppBar
                titleElement={
                  <Title>
                    <FormattedMessage id="dialog_nft_mint_title" />
                  </Title>
                }
                leftButton={<CloseButton onClick={onClose} />}
              />
            }
            hasAppBarBorder={false}
          >
            <DialogWrapper>
              <MintSettingPriceWrapper>
                <B2Regular>
                  <FormattedMessage id="dialog_nft_mint_total_price" />
                </B2Regular>
                <MintSettingPrice>
                  {price} {currency}
                </MintSettingPrice>
              </MintSettingPriceWrapper>
              <GasFeeInfoWrapper role="button" onClick={openGasFeeAlert}>
                <B4Regular>
                  <FormattedMessage id="nft_collection_sale_schedule_show_gas_fee" />
                </B4Regular>
                <InfoIcon />
              </GasFeeInfoWrapper>
              <Spacer value={13} />
              <BoxNumberInput
                size="Large"
                value={qty}
                min={1}
                max={max}
                onChange={handleChangeQty}
              />
              <Spacer value={12} />
              <MintButton onClick={handleClickMint}>
                {buttonMintText?.singular}
              </MintButton>
            </DialogWrapper>
          </CustomAppBarModalLayout>
        </Dialog>
      )}
      <AlertDialog
        open={gasFeeAlertOpenStatus}
        content={<FormattedMessage id="dialog_nft_mint_gas_fee_description" />}
        rightButtons={[
          {
            text: <FormattedMessage id="ok_button" />,
            onClick: closeGasFeeAlert,
          },
        ]}
        onClose={closeGasFeeAlert}
      />
    </>
  );
};

export default MintSettingDialog;
