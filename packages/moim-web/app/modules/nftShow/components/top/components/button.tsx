import * as React from "react";
import { PermissionDeniedFallbackType } from "app/enums";
import useGroupTexts from "common/hooks/useGroupTexts";
// helpers
import { getScheduleStatus } from "common/helpers/nft";
// components
import UnsignedChecker from "common/components/unsiginedChecker";
// style
import { MintButton } from "../../../styled";

interface IProps {
  itemMintable: boolean;
  itemStatus: Moim.NFT.INftStatus;
  scheduleMintable: boolean;
  mintingStartAt: number;
  mintingEndAt: number;
  onMint(): void;
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
    if (itemStatus === "MINTED") {
      return (
        <div role="button">
          <MintButton disabled={true}>{buttonMintedText?.singular}</MintButton>
        </div>
      );
    }
    switch (scheduleStatus) {
      case "UPCOMING": {
        return (
          <MintButton disabled={true}>
            {buttonMintUpcomingText?.singular}
          </MintButton>
        );
      }
      case "TERMINATED": {
        return (
          <MintButton disabled={true}>
            {buttonMintTerminatedText?.singular}
          </MintButton>
        );
      }
      default: {
        return (
          <div role="button">
            <MintButton disabled={!mintable} onClick={onMint}>
              {buttonMintText?.singular}
            </MintButton>
          </div>
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
