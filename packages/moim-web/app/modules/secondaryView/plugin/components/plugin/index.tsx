import * as React from "react";
import shortid from "shortid";
import { useStoreState, useActions } from "app/store";
import { ActionCreators as SecondaryViewActionCreators } from "app/actions/secondaryView";
import BlockitRenderer from "common/components/blockitEditorBase/components/blockitRenderer";
import { DefaultLayout } from "../../layout";
import { MoimURL } from "common/helpers/url";
import useIsMobile from "common/hooks/useIsMobile";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import useCurrentUser from "common/hooks/useCurrentUser";
import {
  ParallaxTitle,
  AppBarStickyWrapperStyle,
  Container,
  LeftButtonWrapper,
  BackIconButton,
} from "../../../styled";

const PluginPanel: React.FC = () => {
  const isMobile = useIsMobile();
  const { redirect } = useNativeSecondaryView();
  const currentUser = useCurrentUser();
  const refContent = React.useRef<HTMLDivElement>(null);
  const { title = "", blocks = [] } = useStoreState(state => ({
    ...state.secondaryViewPage.pluginHistory[
      state.secondaryViewPage.pluginCurrentLocationHash
    ],
  }));
  const { setRef } = useActions({
    setRef: SecondaryViewActionCreators.setPluginContentRef,
  });

  const handleBackButtonClick = React.useCallback(() => {
    if (!isMobile && currentUser) {
      redirect(new MoimURL.Members({ userId: currentUser?.id }).toString());
    }
  }, [isMobile, currentUser, redirect]);

  const blockElements = React.useMemo(
    () =>
      blocks.map(block => (
        <BlockitRenderer key={`plugin_side_panel_${shortid()}`} block={block} />
      )),
    [blocks],
  );

  React.useLayoutEffect(() => {
    setRef(refContent.current);
  }, [setRef]);

  return (
    <DefaultLayout
      appBar={{
        wrapperStickyStyle: AppBarStickyWrapperStyle,
        enableScrollParallax: true,
        alwaysShowAppBarTitle: true,
        parallaxWrapperComponent: Container,
        expendScrollParallaxElement: <ParallaxTitle>{title}</ParallaxTitle>,
        titleContainerDisappearPosition: 0,
        parallaxDisappearPosition: 0,
        leftButton: !isMobile && (
          <LeftButtonWrapper onClick={handleBackButtonClick}>
            <BackIconButton />
          </LeftButtonWrapper>
        ),
      }}
    >
      <Container ref={refContent}>{blockElements}</Container>
    </DefaultLayout>
  );
};

export default PluginPanel;
