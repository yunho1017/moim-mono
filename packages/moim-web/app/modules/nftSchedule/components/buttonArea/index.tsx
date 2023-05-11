import * as React from "react";
import useGroupTexts from "common/hooks/useGroupTexts";
import UnsignedChecker from "common/components/unsiginedChecker";
import { PermissionDeniedFallbackType } from "app/enums";
import MintSettingDialog from "app/modules/nft/components/mintSettingDialog";
import { Spacer } from "common/components/designSystem/spacer";
import { MintButton, BottomWrapper, Container } from "./styled";
import useIsMobile from "common/hooks/useIsMobile";

interface IProps {
  mintable: boolean;
  maxAmountPerAddress: number;
  contractId: string;
  scheduleId: string;
  price?: number;
  currency?: string;
}

const ButtonArea: React.FC<IProps> = ({
  mintable,
  maxAmountPerAddress,
  contractId,
  scheduleId,
  price,
  currency,
}: IProps) => {
  const isMobile = useIsMobile();
  const buttonMintText = useGroupTexts("button_mint_nft");
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleOpen = React.useCallback(() => {
    setOpenDialog(true);
  }, []);
  const handleClose = React.useCallback(() => {
    setOpenDialog(false);
  }, []);

  return (
    <>
      {isMobile ? (
        <BottomWrapper>
          <Container>
            <UnsignedChecker fallbackType={PermissionDeniedFallbackType.ALERT}>
              <MintButton disabled={!mintable} onClick={handleOpen}>
                {buttonMintText?.singular}
              </MintButton>
            </UnsignedChecker>
          </Container>
        </BottomWrapper>
      ) : (
        <>
          <Spacer value={8} />
          <div role="button">
            <UnsignedChecker fallbackType={PermissionDeniedFallbackType.ALERT}>
              <MintButton disabled={!mintable} onClick={handleOpen}>
                {buttonMintText?.singular}
              </MintButton>
              {/* NOTE: white list button */}
              {/* <Spacer value={12} />
                  <ApplyWhiteListButton>{buttonMintText?.singular}</ApplyWhiteListButton> */}
            </UnsignedChecker>
          </div>
        </>
      )}
      <MintSettingDialog
        mintSettingDialogOpen={openDialog}
        max={maxAmountPerAddress}
        contractId={contractId}
        scheduleId={scheduleId}
        price={price}
        currency={currency}
        onClose={handleClose}
      />
    </>
  );
};

export default React.memo(ButtonArea);
