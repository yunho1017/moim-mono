// vendor
import * as React from "react";
// hook
import { useProps, useHandlers, useEffects } from "./hooks";
// component
import { DefaultLoader } from "common/components/loading";
import InfiniteScroller from "common/components/infiniteScroller";
import FreezeView from "common/components/freezeView";
import SubMoimItem from "../../components/subMoimItem";
import {
  Container,
  Wrapper,
  Header,
  ScrollWrapper,
  Footer,
  ButtonWrapper,
  CollapseIcon,
  ExpandIcon,
  EditIcon,
  Divider,
  ChangeStatusButton,
} from "./styled";

export type JoinedSubMoimStatusType = "Disabled" | "Open" | "Expanded";

interface IProps {
  hover: boolean;
}
function JoinedSubMoims({ hover }: IProps) {
  const hookProps = useProps();
  const hookHandlers = useHandlers(hookProps);
  useEffects(hookProps, hookHandlers);

  const {
    hubMoim,
    subMoims,
    status,
    isMobile,
    isTablet,
    isSimple,
    isLoading,
    currentGroup,
    visibleTopNavigation,
  } = hookProps;
  const {
    setOpen,
    setDisable,
    setExpanded,
    handleLoadMoreJoinedSubMoims,
  } = hookHandlers;

  const buttonElement = React.useMemo(() => {
    if (
      (!hover && !isTablet) ||
      (visibleTopNavigation && status === "Disabled")
    ) {
      return;
    }

    switch (status) {
      case "Open": {
        if (isMobile) {
          break;
        }

        return (
          <ChangeStatusButton onClick={setDisable}>
            <CollapseIcon />
          </ChangeStatusButton>
        );
      }
      case "Expanded": {
        return (
          <ChangeStatusButton onClick={setOpen}>
            <CollapseIcon onClick={setOpen} />
          </ChangeStatusButton>
        );
      }

      case "Disabled": {
        return (
          <ChangeStatusButton onClick={setOpen}>
            <ExpandIcon />
          </ChangeStatusButton>
        );
      }
    }
  }, [
    hover,
    isMobile,
    isTablet,
    setDisable,
    setOpen,
    status,
    visibleTopNavigation,
  ]);

  const headerElement = React.useMemo(() => {
    if (
      hubMoim &&
      currentGroup &&
      !currentGroup.navigation_structure.web.topNavi.showNavigation
    ) {
      return (
        <>
          <Header isSimple={isSimple}>
            <SubMoimItem useHover={false} isSimple={isSimple} moim={hubMoim} />
          </Header>
          {status === "Expanded" && <Divider />}
        </>
      );
    }

    return null;
  }, [currentGroup, hubMoim, isSimple, status]);

  if (!hubMoim?.sub_groups_count) {
    return null;
  }

  return (
    <Container status={status}>
      <Wrapper status={status}>
        {headerElement}

        <FreezeView isFreeze={false}>
          <ScrollWrapper status={status}>
            <InfiniteScroller
              loadMore={handleLoadMoreJoinedSubMoims}
              isLoading={isLoading}
              loader={<DefaultLoader />}
              paging={subMoims.paging}
              itemLength={subMoims.data.length}
            >
              {subMoims.data.map(subMoim => (
                <SubMoimItem
                  key={subMoim.id}
                  isSimple={isSimple}
                  moim={subMoim}
                />
              ))}
            </InfiniteScroller>
          </ScrollWrapper>
        </FreezeView>
        {status === "Open" && (
          <Footer onClick={setExpanded}>
            <EditIcon />
          </Footer>
        )}
        <ButtonWrapper status={status}>{buttonElement}</ButtonWrapper>
      </Wrapper>
    </Container>
  );
}

export default JoinedSubMoims;
