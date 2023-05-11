// vendor
import * as React from "react";
// hooks
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useVisibleTopNavigation } from "app/modules/layout/components/controller/hooks";
// component
import GroupProfileImage from "common/components/groupProfileImage";
import ShavedText from "common/components/shavedText";
import { Wrapper, MoimName, Left, LinkWrapper } from "./styledComponent";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
// type
import { MoimURL } from "common/helpers/url";

interface IProps {
  groupName: string;
  icon?: Moim.IIcon;
  onClickMoimProfile?(): void;
}

function GroupInfo({ groupName, icon, onClickMoimProfile }: IProps) {
  const currentGroup = useCurrentGroup();
  const visibleTopNavigation = useVisibleTopNavigation();
  const isChildMoimText = React.useMemo(
    () => Boolean(!currentGroup?.is_hub && visibleTopNavigation),
    [currentGroup, visibleTopNavigation],
  );

  const linkElement = React.useMemo(
    () => (
      <LinkWrapper to={new MoimURL.MoimAppHome().toString()}>
        <MoimName
          title={groupName}
          isChildMoimText={isChildMoimText}
          visibleTopNavigation={visibleTopNavigation}
        >
          <ShavedText
            value={<NativeEmojiSafeText value={groupName} />}
            line={2}
          />
        </MoimName>
      </LinkWrapper>
    ),
    [groupName, isChildMoimText, visibleTopNavigation],
  );

  return (
    <Wrapper visibleTopNavigation={visibleTopNavigation}>
      <Left>
        <GroupProfileImage
          icon={icon}
          title={groupName}
          size="s"
          onImageClick={onClickMoimProfile}
        />
      </Left>
      {linkElement}
    </Wrapper>
  );
}

export default GroupInfo;
