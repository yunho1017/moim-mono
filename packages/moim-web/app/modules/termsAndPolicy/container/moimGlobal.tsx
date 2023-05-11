import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link, Redirect } from "react-router-dom";
import { Switch, Route, useLocation } from "react-router";

import { MoimURL } from "common/helpers/url";

import {
  Wrapper,
  Contents,
  TabContentsWrapper,
  StyledTab,
  StyledTabItem,
} from "./styled";
import TermsOfUse from "../components/pages/termsOfUse";
import PrivacyPolicy from "../components/pages/privacyPolicy";
import Template from "../components/template";

const TERMS_MENU = [
  "Acceptance Of Terms",
  "Permitted User of the Site",
  "Registration",
  "Verified Accounts",
  "Responsibility for content",
  "Rights to Content and Service",
  "User Conduct",
  "Payment",
  "Modifications to and Support of the Service",
  "Termination",
  "Third Party Sites and External Links",
  "Disclaimer of Warranties",
  "Limitation of Liability",
  "No Third-Party Beneficiaries",
  "Procedure for Making Claims of Copyright Infringement",
  "General Provisions",
];
const POLICY_MENU = [
  "What does this Privacy Policy cover?",
  "What information do we collect?",
  "How do we use your information?",
  "Do we disclose the information we collect to outside parties?",
  `Do we use "cookies"?`,
  "How do I opt out information collection?",
  "How do we safeguard your personal information?",
  "Does this Privacy Policy cover third party links?",
  "Does this Privacy Policy apply to offline information?",
  "How do you ask questions and provide feedback?",
  "What happens if you are a non Singapore resident?",
  "How do you correct or update personal information?",
];

export default function MoimGlobalTermsAndPolicy() {
  const location = useLocation();

  return (
    <Wrapper>
      <StyledTab>
        <Link to={new MoimURL.AboutTerms().toString()}>
          <StyledTabItem active={MoimURL.AboutTerms.isSame(location.pathname)}>
            <FormattedMessage id="moim_policy/tab_terms" />
          </StyledTabItem>
        </Link>
        <Link to={new MoimURL.AboutPolicy().toString()}>
          <StyledTabItem active={MoimURL.AboutPolicy.isSame(location.pathname)}>
            <FormattedMessage id="moim_policy/tab_privacy" />
          </StyledTabItem>
        </Link>
      </StyledTab>
      <Contents>
        <TabContentsWrapper>
          <TabContents />
        </TabContentsWrapper>
      </Contents>
    </Wrapper>
  );
}

export function TabContents() {
  return (
    <Switch>
      <Route path={MoimURL.AboutTerms.pattern}>
        <Template menu={TERMS_MENU}>
          <TermsOfUse />
        </Template>
      </Route>
      <Route path={MoimURL.AboutPolicy.pattern}>
        <Template menu={POLICY_MENU}>
          <PrivacyPolicy />
        </Template>
      </Route>
      <Route path={MoimURL.About.pattern}>
        <Redirect to={MoimURL.AboutTerms.pattern} />
      </Route>
    </Switch>
  );
}
