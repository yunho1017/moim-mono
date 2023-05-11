import * as React from "react";
import {
  AppointMemberButton,
  Buttons,
  Description,
  DismissMemberButton,
  Divider,
  Header,
  MembersTitle,
  MenuButton,
  MenuButtonWrapper,
  MoimName,
  PositionName,
  Wrapper,
} from "./styled";
import { useHandlers, useProps } from "./hooks";
import { BaseItemCell } from "common/components/itemCell";
import MemberList from "common/components/memberList";
import EmptyMembers from "./components/emptyMembers";
import Menu from "./components/menu";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";

export interface IProps {
  position: Moim.Position.IPosition;
  members: Moim.IPaginatedListResponse<Moim.User.IUser>;
  isLoadingMembers: boolean;
  moimName: string;
  onGetPositionMembers: (paging?: Moim.IPaging) => void;
  onClickAppointButton: () => void;
  onClickDismissButton: () => void;
  onClickEditButton: () => void;
  onClickDeleteButton: () => void;
}

function PositionShow(props: IProps) {
  const hookProps = useProps(props);
  const hookHandles = useHandlers(hookProps);

  const {
    position,
    members,
    moimName,
    isLoadingMembers,
    intl,
    memberTexts,
    menuButtonRef,
    isOpenMenu,
    onGetPositionMembers,
  } = hookProps;
  const {
    handleClickAppointButton,
    handleClickDismissButton,
    handleClickEditButton,
    handleClickDeleteButton,
    handleClickMenuButton,
    handleCloseMenuDialog,
  } = hookHandles;

  return (
    <Wrapper>
      <Header>
        <MenuButtonWrapper ref={menuButtonRef}>
          <MenuButton onClick={handleClickMenuButton} />
        </MenuButtonWrapper>

        <Menu
          open={isOpenMenu}
          onCloseRequest={handleCloseMenuDialog}
          anchorElement={menuButtonRef.current}
          onClickEditButton={handleClickEditButton}
          onClickAppointMembersButton={handleClickAppointButton}
          onClickDismissMembersButton={handleClickDismissButton}
          onClickDeletePositionButton={handleClickDeleteButton}
        />
      </Header>
      <BaseItemCell
        title={
          <PositionName textColor={position.color}>
            <NativeEmojiSafeText value={position.name} />
          </PositionName>
        }
        size="m"
      />
      <BaseItemCell
        title={
          <MoimName>
            <NativeEmojiSafeText value={moimName} />
          </MoimName>
        }
        size="xxs"
      />
      {position.description && (
        <Description>
          <NativeEmojiSafeText value={position.description} />
        </Description>
      )}
      <Divider />
      <BaseItemCell
        title={
          <MembersTitle>
            {intl.formatMessage(
              {
                id: "position_settings/position/members_title",
              },
              { ref_member: memberTexts?.plural ?? "" },
            )}
            {` (${position.member_count})`}
          </MembersTitle>
        }
        rightElement={
          <Buttons>
            <AppointMemberButton onClick={handleClickAppointButton} />
            <DismissMemberButton onClick={handleClickDismissButton} />
          </Buttons>
        }
        size="s"
      />

      <MemberList
        members={members}
        isLoading={isLoadingMembers}
        onGetMembers={onGetPositionMembers}
        subTitleKeys={["email"]}
        subTitleShaveLine={1}
        hasTitle={false}
        emptyStateElement={
          <EmptyMembers onClickAppointButton={handleClickAppointButton} />
        }
      />
    </Wrapper>
  );
}

export default PositionShow;
