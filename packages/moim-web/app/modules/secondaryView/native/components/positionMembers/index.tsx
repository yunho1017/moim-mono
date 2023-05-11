import * as React from "react";

import useHook, { IProps } from "./useHook";
import Menu from "./components/menu";
import MemberList from "common/components/memberList";
import {
  Wrapper,
  Header,
  HeaderTitle,
  PositionDescription,
  MoreIconWrapper,
  LeftButtonWrapper,
  RightButtonWrapper,
  BackIcon,
  MoreIcon,
  Divider,
  ApplyPositionButtonWrapper,
  ApplyPositionButton,
  AppbarTitle,
} from "./styled";
import { DefaultLayout } from "../../layout";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { FormattedMessage } from "react-intl";
import { NativeMemoryHistoryContext } from "app/modules/SecondaryHistory";

export default function PositionMembers(props: IProps) {
  const {
    refMoreMenu,
    isMobile,
    members,
    currentUser,
    getMemberLoading,
    position,
    positionCreator,
    visibleApplyButton,
    menuOpenStatus,
    canDismissSelf,
    openMenu,
    closeMenu,
    handleGetMembers,
    handleBackButtonClick,
    handleApplyPositionButtonClick,
  } = useHook(props);

  const history = React.useContext(NativeMemoryHistoryContext);
  const isFirstEntry = React.useMemo(() => {
    return history && history?.index < 2;
  }, [history?.index]);

  const parallaxHeaderElement = React.useMemo(
    () =>
      position &&
      positionCreator && (
        <HeaderTitle textColor={position.color}>
          <ShavedText
            line={1}
            value={
              <NativeEmojiSafeText
                value={`${position.name} (${position.member_count})`}
              />
            }
          />
        </HeaderTitle>
      ),
    [position, positionCreator],
  );

  const positionHeaderElement = React.useMemo(
    () =>
      position &&
      positionCreator && (
        <AppbarTitle textColor={position.color}>
          <ShavedText
            line={1}
            value={
              <NativeEmojiSafeText
                value={`${position.name} (${position.member_count})`}
              />
            }
          />
        </AppbarTitle>
      ),
    [position, positionCreator],
  );

  const appBarLeftButtonElement = React.useMemo(
    () =>
      !isMobile &&
      !isFirstEntry && (
        <LeftButtonWrapper onClick={handleBackButtonClick}>
          <BackIcon />
        </LeftButtonWrapper>
      ),
    [handleBackButtonClick, isMobile, isFirstEntry],
  );

  const appBarRightButtonElement = React.useMemo(
    () => (
      <RightButtonWrapper>
        <MoreIconWrapper ref={refMoreMenu} onClick={openMenu}>
          <MoreIcon />
        </MoreIconWrapper>
      </RightButtonWrapper>
    ),
    [refMoreMenu, openMenu],
  );

  return (
    <>
      <DefaultLayout
        appBar={{
          titleElement: positionHeaderElement,
          titleAlignment: "Left",
          enableScrollParallax: true,
          parallaxWrapperComponent: Header,
          expendScrollParallaxElement: parallaxHeaderElement,
          leftButton: appBarLeftButtonElement,
          rightButton: appBarRightButtonElement,
        }}
      >
        <Wrapper>
          {position?.description && (
            <PositionDescription>{position.description}</PositionDescription>
          )}
          {visibleApplyButton && (
            <ApplyPositionButtonWrapper>
              <ApplyPositionButton
                size="s"
                onClick={handleApplyPositionButtonClick}
              >
                <FormattedMessage id="position_member_show/claim_position_button" />
              </ApplyPositionButton>
            </ApplyPositionButtonWrapper>
          )}
          <Divider />

          {members && (
            <MemberList
              members={members}
              isLoading={getMemberLoading}
              onGetMembers={handleGetMembers}
              subTitleShaveLine={1}
              hasTitle={false}
              hasPositionChip={false}
            />
          )}
        </Wrapper>
      </DefaultLayout>
      <Menu
        anchorElement={refMoreMenu.current}
        open={menuOpenStatus}
        userId={currentUser?.id || ""}
        positionId={position?.id || ""}
        canDismissSelf={canDismissSelf}
        onCloseRequest={closeMenu}
      />
    </>
  );
}
