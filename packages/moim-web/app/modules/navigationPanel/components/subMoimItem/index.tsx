// vendor
import * as React from "react";
// hooks
import { useStoreState } from "app/store";
// selector
import { moimStatSelector } from "app/selectors/stat";
// component
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import GroupProfileImage from "common/components/groupProfileImage";
import { Wrapper, Right, Title, SubTitle } from "./styled";
import ShavedText from "common/components/shavedText";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

interface IProps {
  isSimple: boolean;
  moim: Moim.Group.IGroup;
  useHover?: boolean;
}
function SubMoimItem({ isSimple, moim, useHover = true }: IProps) {
  const { currentGroupId, stat } = useStoreState(state => ({
    currentGroupId: state.app.currentGroupId,
    stat: moimStatSelector(state, moim.id),
  }));
  const isSelected = moim.id === currentGroupId;

  return (
    <a
      href={moim.url}
      target="_self"
      tabIndex={1}
      style={{ flex: 1 }}
      onClick={() => {
        AnalyticsClass.getInstance().channelListMyMoimSelect({
          targetGroupId: moim.id,
        });
      }}
    >
      <Wrapper isSimple={isSimple} useHover={useHover}>
        <GroupProfileImage
          size="m"
          icon={moim.icon}
          title={moim.name}
          selected={isSelected}
          useHoverStyle={isSimple}
          badge={stat?.count}
          hasNewContents={stat?.has_new}
          hasNewNotification={stat?.has_new_notification}
        />
        {!isSimple && (
          <Right>
            <Title>
              <ShavedText
                value={<NativeEmojiSafeText value={moim.name} />}
                line={1}
              />
            </Title>
            <SubTitle>
              <ShavedText
                value={moim.url.replace(/(https|http):\/\//, "")}
                line={1}
              />
            </SubTitle>
          </Right>
        )}
      </Wrapper>
    </a>
  );
}

export default SubMoimItem;
