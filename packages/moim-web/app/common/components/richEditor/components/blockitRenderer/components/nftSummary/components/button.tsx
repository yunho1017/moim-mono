import * as React from "react";
import { PermissionDeniedFallbackType } from "app/enums";
import useGroupTexts from "common/hooks/useGroupTexts";
// helpers
import { getScheduleStatus } from "common/helpers/nft";
// components
import UnsignedChecker from "common/components/unsiginedChecker";
// style
import { MintButton } from "./styled";

interface IProps {
  itemMintable: boolean;
  itemStatus: Moim.NFT.INftStatus;
  scheduleMintable: boolean;
  mintingStartAt: number;
  mintingEndAt: number;
  onMint(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void;
}

const Button: React.FC<IProps> = ({
  itemMintable,
  itemStatus,
  scheduleMintable,
  mintingStartAt,
  mintingEndAt,
  onMint,
}: IProps) => {
  const buttonMintUpcomingText = useGroupTexts("button_mint_nft_upcoming");
  const buttonMintText = useGroupTexts("button_mint_nft");
  const buttonMintedText = useGroupTexts("button_minted_nft");
  const buttonMintTerminatedText = useGroupTexts("button_mint_nft_terminated");

  const mintable = (itemMintable && scheduleMintable) ?? false;
  const scheduleStatus = getScheduleStatus(mintingStartAt, mintingEndAt);

  const mintButtonElement = React.useMemo(() => {
    switch (scheduleStatus) {
      case "UPCOMING": {
        return (
          <MintButton disabled={true} onClick={onMint}>
            {buttonMintUpcomingText?.singular}
          </MintButton>
        );
      }
      case "TERMINATED": {
        return (
          <MintButton disabled={true} onClick={onMint}>
            {buttonMintTerminatedText?.singular}
          </MintButton>
        );
      }
      default: {
        return (
          <MintButton disabled={!mintable} onClick={onMint}>
            {itemStatus === "MINTED"
              ? buttonMintedText?.singular
              : buttonMintText?.singular}
          </MintButton>
        );
      }
    }
  }, [
    buttonMintTerminatedText,
    buttonMintText,
    buttonMintUpcomingText,
    buttonMintedText,
    itemStatus,
    mintable,
    onMint,
    scheduleStatus,
  ]);

  return (
    <UnsignedChecker fallbackType={PermissionDeniedFallbackType.ALERT}>
      {mintButtonElement}
    </UnsignedChecker>
  );
};

export default React.memo(Button);
