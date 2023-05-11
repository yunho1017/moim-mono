import useGroupTexts from "common/hooks/useGroupTexts";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { UserProfilePreview } from "../../styled";
import { ThemeType } from "../badgeClaimComponent";
import {
  Buttons,
  Container,
  HintWrapper,
  RegularButton,
  RootWrapper,
} from "./styled";

interface IProps {
  isLoading: boolean;
  selectedTheme: ThemeType;
  currentUser?: Moim.User.INormalizedUser | null;
  web3UserName: string;
  textColor: string;
  backgroundColor: string;
  onClickClaim(): void;
}

const MobileStickyFooter: React.FC<IProps> = ({
  isLoading,
  selectedTheme,
  textColor,
  backgroundColor,
  currentUser,
  web3UserName,
  onClickClaim,
}) => {
  const buttonBadgeShowClaimUserMintBadge = useGroupTexts(
    "button_badge_show_claim_user_mint_badge",
  );

  return (
    <RootWrapper backgroundColor={backgroundColor}>
      <Container>
        <HintWrapper selectedTheme={selectedTheme} textColor={textColor}>
          <UserProfilePreview
            selectedTheme={selectedTheme}
            src={currentUser?.avatar_url}
          />
          <FormattedMessage
            id="badge_show_claim_user_mint_caption_available"
            values={{ user_name_address: web3UserName }}
          />
        </HintWrapper>
        <Buttons>
          <RegularButton
            selectedTheme={selectedTheme}
            buttonColor={textColor}
            disabled={isLoading}
            waiting={isLoading}
            onClick={onClickClaim}
          >
            {buttonBadgeShowClaimUserMintBadge?.singular}{" "}
          </RegularButton>
        </Buttons>
      </Container>
    </RootWrapper>
  );
};

export default MobileStickyFooter;
