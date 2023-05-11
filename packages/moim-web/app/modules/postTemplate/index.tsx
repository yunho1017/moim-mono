// vendor
import * as React from "react";
import { Redirect, Route, Switch, matchPath, useLocation } from "react-router";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import ListAndDetailLayout from "common/layouts/listAndDetail";
import { B4Regular, H8Bold } from "common/components/designSystem/typos";
import { DefaultLoader } from "common/components/loading";
import PermissionChecker from "common/components/permissionChecker";
import List from "./components/list";
import PostTemplateShow from "./components/templateShow";
import DeleteTemplateAlert from "./components/deleteTemplateAlert";
import ShavedText from "common/components/shavedText";
import { Spacer } from "common/components/designSystem/spacer";
// helper
import useSuperPermission from "common/hooks/useSuperPermission";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import { useStoreState } from "app/store";
import useIsMobile from "common/hooks/useIsMobile";
import { px2rem } from "common/helpers/rem";
import PostTemplateContextProvider from "./context";
import { PermissionDeniedFallbackType } from "app/enums";
import { MoimURL } from "common/helpers/url";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useScrollStyle } from "common/components/designSystem/styles";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  ${useScrollStyle};
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    max-width: ${px2rem(1200)};
    margin: 0 auto;
  }
`;

const Wrapper = styled.div`
  flex: 1;
  min-height: 0;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin-top: ${px2rem(24)};
  }
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: ${px2rem(150)};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

const Desc = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

const MAIN_PANEL_URLS = [
  MoimURL.PostTemplateEditor.pattern,
  MoimURL.PostTemplateShow.pattern,
];

function PostTemplateRedirect() {
  const isMobile = useIsMobile();
  const { firstPostTempateId, isLoading } = useStoreState(state => ({
    firstPostTempateId: state.postTemplate.postTemplates.data[0],
    isLoading: state.postTemplate.getPostTemplatesLoading,
  }));

  if (isMobile) {
    return null;
  }

  if (!firstPostTempateId) {
    if (isLoading) {
      return <DefaultLoader />;
    } else {
      return <Redirect to={new MoimURL.PostTemplateEditor().toString()} />;
    }
  }

  return (
    <Redirect
      to={new MoimURL.PostTemplateShow({
        postTemplateId: firstPostTempateId,
      }).toString()}
    />
  );
}

function PostTemplate() {
  const location = useLocation();
  const {
    hasPermission,
    isLoading: isPermissionLoading,
  } = useSuperPermission();
  const { expandSideNavigation } = useSideNavigationPanel();
  const currentPostTemplateId = React.useMemo(
    () =>
      matchPath<Moim.IMatchParams>(location.pathname, {
        path: MoimURL.PostTemplateShow.pattern,
      })?.params.postTemplateId,
    [location.pathname],
  );

  return (
    <PermissionChecker
      fallbackType={PermissionDeniedFallbackType.SCREEN}
      hasPermission={hasPermission}
      isLoading={isPermissionLoading}
      onBackClick={expandSideNavigation}
    >
      <PostTemplateContextProvider
        currentPostTemplateId={currentPostTemplateId}
      >
        <Container>
          <TitleWrapper>
            <Title>
              <FormattedMessage id="admin_post_template/page_title" />
            </Title>
            <Spacer value={4} />
            <Desc>
              <ShavedText
                line={1}
                value={<FormattedMessage id="admin_post_template/page_guide" />}
              />
            </Desc>
          </TitleWrapper>
          <Wrapper>
            <ListAndDetailLayout
              listElement={<List />}
              disableListWrapperRightBorder={true}
              detailElement={
                <Switch>
                  <Route path={MoimURL.PostTemplateEditor.pattern}>
                    <PostTemplateShow mode="new" />
                  </Route>
                  <Route path={MoimURL.PostTemplateShow.pattern}>
                    <PostTemplateShow mode="edit" />
                  </Route>
                  <Route path={MoimURL.PostTemplate.pattern}>
                    <PostTemplateRedirect />
                  </Route>
                </Switch>
              }
              mainPanelUrls={MAIN_PANEL_URLS}
            />
          </Wrapper>

          <DeleteTemplateAlert />
        </Container>
      </PostTemplateContextProvider>
    </PermissionChecker>
  );
}

export default PostTemplate;
