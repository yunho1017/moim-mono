import useGroupTexts from "common/hooks/useGroupTexts";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import {
  Container,
  Head,
  HeadCaption,
  RegularButton,
  UserProfilePreview,
} from "../../styled";

export type ThemeType = "black" | "white";

interface IProps {
  isLoading: boolean;
  currentUser?: Moim.User.INormalizedUser | null;
  web3UserName: string;
  textColor: string;
  selectedTheme?: ThemeType;
  onClickClaim?: () => Promise<void>;
}

const BadgeClaimComponent: React.FC<IProps> = ({
  isLoading,
  currentUser,
  web3UserName,
  textColor,
  selectedTheme = "black",
  onClickClaim,
}) => {
  const buttonBadgeShowClaimUserMintBadge = useGroupTexts(
    "button_badge_show_claim_user_mint_badge",
  );

  const headContent = React.useMemo(
    () => (
      <Head>
        <HeadCaption selectedTheme={selectedTheme} textColor={textColor}>
          <UserProfilePreview
            selectedTheme={selectedTheme}
            src={currentUser?.avatar_url}
          />
          <FormattedMessage
            id="badge_show_claim_user_mint_caption_available"
            values={{ user_name_address: web3UserName }}
          />
        </HeadCaption>
        <RegularButton
          selectedTheme={selectedTheme}
          buttonColor={textColor}
          disabled={isLoading}
          waiting={isLoading}
          onClick={onClickClaim}
        >
          {buttonBadgeShowClaimUserMintBadge?.singular}
        </RegularButton>
      </Head>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      currentUser?.avatar_url,
      isLoading,
      onClickClaim,
      selectedTheme,
      web3UserName,
    ],
  );

  return <Container>{headContent ? headContent : undefined}</Container>;
};

export default BadgeClaimComponent;
