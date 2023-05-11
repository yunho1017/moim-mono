// vendor
import * as React from "react";
// hooks
import { useProps } from "./hooks";
// component
import {
  CollapseButtonWrapper,
  Dim,
  DesktopDim,
  InnerWrapper,
  Wrapper,
} from "./styledComponents";
import CollapseButton from "./components/collapseButton";

export type IProps = React.PropsWithChildren<{
  isExpanded: boolean;
  showCollapseButton: boolean;
  onClickExpandedDim(): void;
  onClickCollapseButton(): void;
  onClickDim(): void;
}>;

function SideBar(props: IProps) {
  const {
    isMobile,
    isShowDim,
    isExpanded,
    showCollapseButton,
    joinedSubMoimsStatus,
    visibleTopNavigation,
    visibleSideNavigation,
    setJoinedSubMoimsStatus,
    onClickExpandedDim,
    onClickCollapseButton,
    onClickDim,
    children,
  } = useProps(props);

  const handleDimClick = React.useCallback(() => {
    if (isMobile) {
      onClickDim();
    }
    if (joinedSubMoimsStatus === "Expanded") {
      setJoinedSubMoimsStatus("Open");
    }
  }, [isMobile, joinedSubMoimsStatus, onClickDim, setJoinedSubMoimsStatus]);
  return (
    <>
      <Wrapper
        visibleTopNavigation={visibleTopNavigation}
        visibleSideNavigation={visibleSideNavigation}
        isExpanded={isExpanded}
      >
        {!isMobile && !isExpanded && (
          <DesktopDim onClick={onClickExpandedDim} />
        )}

        {showCollapseButton && isExpanded && (
          <CollapseButtonWrapper>
            <CollapseButton onClick={onClickCollapseButton} />
          </CollapseButtonWrapper>
        )}

        <InnerWrapper isExpanded={isExpanded}>{children}</InnerWrapper>
      </Wrapper>

      {isShowDim && (
        <Dim
          visibleTopNavigation={visibleTopNavigation}
          onClick={handleDimClick}
          isShow={isShowDim}
        />
      )}
    </>
  );
}

export default SideBar;
