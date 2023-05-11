import * as React from "react";
// enums
import { PermissionDeniedFallbackType } from "app/enums";
// hooks
import useGroupTexts from "common/hooks/useGroupTexts";
// components
import UnsignedChecker from "common/components/unsiginedChecker";
// style
import { ButtonWrapper, MintButton } from "./styled";

interface IProps {
  mintable: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const Button: React.FC<IProps> = ({ mintable, onClick }: IProps) => {
  const buttonMintText = useGroupTexts("button_mint_nft");

  return (
    <ButtonWrapper>
      <UnsignedChecker fallbackType={PermissionDeniedFallbackType.ALERT}>
        <MintButton disabled={!mintable} onClick={onClick}>
          {buttonMintText?.singular}
        </MintButton>
      </UnsignedChecker>
    </ButtonWrapper>
  );
};

export default React.memo(Button);
