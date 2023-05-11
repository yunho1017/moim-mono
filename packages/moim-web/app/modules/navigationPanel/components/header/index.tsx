// vendor
import * as React from "react";
import { FormattedMessage } from "react-intl";
// component
import LogoHeader from "../logoHeader";
import GroupInfo from "../groupInfo";
import JoinButton from "../joinButton";
import {
  Wrapper,
  GroupInfoMemberCountMessage,
  JoinButtonWrapper,
} from "./styled";
// hook
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentUser from "common/hooks/useCurrentUser";
import useSideNavigationPanel from "common/hooks/useSideNavigationPanel";
import useGroupTexts from "common/hooks/useGroupTexts";
import { useNativeSecondaryView } from "common/hooks/useSecondaryView";
import { useVisibleTopNavigation } from "app/modules/layout/components/controller/hooks";
import { useVisibleGroupInfo } from "./hooks";

import { MoimURL } from "common/helpers/url";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

export interface IProps {
  logo?: string;
  onClickMoimProfile?: () => void;
}

function Header(props: IProps) {
  const { logo, onClickMoimProfile } = props;
  const memberTexts = useGroupTexts("member");
  const currentGroup = useCurrentGroup();
  const currentUser = useCurrentUser();
  const { redirect } = useNativeSecondaryView();
  const { collapseSideNavigation } = useSideNavigationPanel();
  const visibleTopNavigation = useVisibleTopNavigation();
  const visibleGroupInfo = useVisibleGroupInfo();

  const onClickMemberStatus = React.useCallback(() => {
    redirect(new MoimURL.MoimMembers().toString());
    collapseSideNavigation();

    AnalyticsClass.getInstance().channelListMemberSelect();
  }, [collapseSideNavigation, redirect]);

  const memberCountElement = React.useMemo(() => {
    if (!currentGroup || !currentGroup.config.showMemberCount) {
      return null;
    }

    return (
      <GroupInfoMemberCountMessage
        visibleTopNavigation={visibleTopNavigation}
        onClick={onClickMemberStatus}
      >
        <FormattedMessage
          id="member_count"
          values={{
            plain_count: currentGroup.users_count,
            ref_member:
              currentGroup.users_count <= 1
                ? memberTexts?.singular ?? ""
                : memberTexts?.plural ?? "",
          }}
        />
      </GroupInfoMemberCountMessage>
    );
  }, [currentGroup, memberTexts, onClickMemberStatus, visibleTopNavigation]);

  const headerElement = React.useMemo(() => {
    if (!visibleTopNavigation && logo) {
      return <LogoHeader logoUrl={logo} />;
    }

    if (currentGroup && visibleGroupInfo) {
      return (
        <GroupInfo
          icon={currentGroup.icon}
          groupName={currentGroup.name}
          onClickMoimProfile={onClickMoimProfile}
        />
      );
    }

    return null;
  }, [
    visibleTopNavigation,
    currentGroup,
    visibleGroupInfo,
    onClickMoimProfile,
    logo,
  ]);

  const joinButtonElement = React.useMemo(() => {
    if (!currentUser && !currentGroup?.is_hub) {
      return (
        <JoinButtonWrapper visibleTopNavigation={visibleTopNavigation}>
          <JoinButton />
        </JoinButtonWrapper>
      );
    }

    return null;
  }, [currentGroup, currentUser, visibleTopNavigation]);

  return (
    <Wrapper>
      {headerElement}
      {joinButtonElement}
      {memberCountElement}
    </Wrapper>
  );
}

export default Header;
