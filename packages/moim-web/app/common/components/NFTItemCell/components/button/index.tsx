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
  showMintButton?: boolean;
  itemMintable: boolean;
  itemStatus: Moim.NFT.INftStatus;
  scheduleMintable: boolean;
  mintingStartAt: number;
  mintingEndAt: number;
  onMint(): void;
}

const Button: React.FC<IProps> = ({
  showMintButton,
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
  const scheduleStatus = React.useMemo(
    () => getScheduleStatus(mintingStartAt, mintingEndAt),
    [mintingEndAt, mintingStartAt],
  );

  const handleClickMint: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      onMint();
    },
    [onMint],
  );

  const mintButtonElement = React.useMemo(() => {
    if (itemStatus === "MINTED") {
      return (
        <MintButton disabled={true}>{buttonMintedText?.singular}</MintButton>
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
          <MintButton disabled={!mintable} onClick={handleClickMint}>
            {buttonMintText?.singular}
          </MintButton>
        );
      }
    }
  }, [
    buttonMintTerminatedText?.singular,
    buttonMintText?.singular,
    buttonMintUpcomingText?.singular,
    buttonMintedText?.singular,
    handleClickMint,
    itemStatus,
    mintable,
    scheduleStatus,
  ]);

  if (!showMintButton) return null;

  return (
    <UnsignedChecker fallbackType={PermissionDeniedFallbackType.ALERT}>
      {mintButtonElement}
    </UnsignedChecker>
  );
};

export default React.memo(Button);
