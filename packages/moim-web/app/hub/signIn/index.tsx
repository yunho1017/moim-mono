import * as React from "react";
import { useHistory } from "react-router";
import { FormattedMessage } from "react-intl";
// helpers
import { MoimURL } from "common/helpers/url";
import {
  setCryptoBadgeToken,
  getCryptoBadgeToken,
} from "common/helpers/cryptoBadgeHandlerWithInMemory";
// components
import { CryptoBadgeIcon } from "common/components/buttons/cryptoBadge";
import {
  Wrapper,
  TitleWrapper,
  Title,
  LoginButton,
  Description,
  StyledLink,
  ModalLayoutContainer,
} from "./styled";
import { useAuthentication } from "common/helpers/authentication";
import {
  CRYPTOBADGE_HUB_CLIENT_ID,
  CRYPTOBADGE_DEV_CLIENT_ID,
} from "common/constants/authentication";
import { makeCryptobadgeRedirectUri } from "common/helpers/authentication/handlers/cryptobadge/helpers";
import { isProd } from "common/helpers/envChecker";

function HubSignIn() {
  const history = useHistory();
  const {
    token: cryptobadgeToken,
    handler: handleTakeCryptobadgeToken,
    loading: cryptobadgeLoading,
  } = useAuthentication("cryptobadge", {
    groupId: isProd() ? CRYPTOBADGE_HUB_CLIENT_ID : CRYPTOBADGE_DEV_CLIENT_ID,
    redirectUrl: makeCryptobadgeRedirectUri(),
    providers: {
      kakao: false,
    },
  });

  React.useEffect(() => {
    if (cryptobadgeToken && cryptobadgeToken.access_token) {
      setCryptoBadgeToken(cryptobadgeToken.access_token);
    }
    if (getCryptoBadgeToken()) {
      const hubHomeUrl = new MoimURL.HubHome().toString();
      history.replace(hubHomeUrl);
    }
  }, [history, cryptobadgeToken]);
  return (
    <ModalLayoutContainer>
      <Wrapper>
        <TitleWrapper>
          <Title>
            <FormattedMessage id="service_landing/page_title" />
          </Title>
        </TitleWrapper>
        <LoginButton
          baseTheme="yellow"
          onClick={handleTakeCryptobadgeToken}
          disabled={cryptobadgeLoading}
        >
          <CryptoBadgeIcon />
          <FormattedMessage tagName="span" id="can_pass_button" />
        </LoginButton>
        <Description>
          <FormattedMessage
            id="service_landing/terms"
            values={{
              tag1: (msg: string) => (
                <StyledLink
                  to={new MoimURL.AboutTerms().toString()}
                  target="_blank"
                >
                  {msg}
                </StyledLink>
              ),
              tag2: (msg: string) => (
                <StyledLink
                  to={new MoimURL.AboutPolicy().toString()}
                  target="_blank"
                >
                  {msg}
                </StyledLink>
              ),
            }}
          />
        </Description>
      </Wrapper>
    </ModalLayoutContainer>
  );
}

export default React.memo(HubSignIn);
