import * as React from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useLocation, useRouteMatch } from "react-router";
// helpers
import { MoimURL } from "common/helpers/url";
// hooks
import { useActions } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import useRedirect from "app/common/hooks/useRedirect";
// actions
import { getAgreement as getAgreementAction } from "app/actions/agreement";
// components
import RichEditor from "common/components/richEditor";
import { DefaultLoader as Loader } from "common/components/loading";

import {
  Wrapper,
  Contents,
  TabContentsWrapper,
  StyledTab,
  StyledTabItem,
  ScrollableContainer,
  LoadWrapper,
} from "./styled";

const MoimUserTermsAndPolicy = () => {
  const location = useLocation();
  const cancelTokenSource = useCancelToken();
  const redirect = useRedirect();
  const match = useRouteMatch<Moim.IMatchParams>();
  const section = match.params.section;
  const [agreement, setAgreement] = React.useState<
    Moim.Agreement.IAgreement | undefined
  >();

  const { getAgreement } = useActions({
    getAgreement: getAgreementAction,
  });

  const fetchAgreement = React.useCallback(
    async (target: string) => {
      try {
        setAgreement(undefined);
        const result = await getAgreement(
          target === "policy" ? "privacy" : target,
          cancelTokenSource.current.token,
        );

        setAgreement(result);
      } catch (e) {
        if (axios.isAxiosError(e) && e.response && e.response.status === 404) {
          redirect(new MoimURL.NotFound().toString());
        }
      }
    },
    [cancelTokenSource, getAgreement],
  );

  const handleClick = React.useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    if (section) {
      fetchAgreement(section);
    }
  }, [section]);

  return (
    <Wrapper>
      {section === "terms" || section === "policy" ? (
        <StyledTab>
          <Link to={new MoimURL.AboutTerms().toString()} onClick={handleClick}>
            <StyledTabItem
              active={MoimURL.AboutTerms.isSame(location.pathname)}
            >
              <FormattedMessage id="moim_policy/tab_terms" />
            </StyledTabItem>
          </Link>
          <Link to={new MoimURL.AboutPolicy().toString()} onClick={handleClick}>
            <StyledTabItem
              active={MoimURL.AboutPolicy.isSame(location.pathname)}
            >
              <FormattedMessage id="moim_policy/tab_privacy" />
            </StyledTabItem>
          </Link>
        </StyledTab>
      ) : null}

      <Contents>
        <TabContentsWrapper>
          <ScrollableContainer>
            {agreement === undefined ? (
              <LoadWrapper>
                <Loader />
              </LoadWrapper>
            ) : (
              <RichEditor
                id={section ?? "about"}
                readonly={true}
                contents={agreement.content}
              />
            )}
          </ScrollableContainer>
        </TabContentsWrapper>
      </Contents>
    </Wrapper>
  );
};

export default MoimUserTermsAndPolicy;
