// vendor
import * as React from "react";
import { useIntl } from "react-intl";
// component
import { Wrapper } from "./styled";
import DirectMessageItem from "./directMessageItem";
import Category from "common/components/channelList/components/category";
// hooks
import isSelectedChannel from "common/helpers/isSelectedChannel";
import useNewDirectMessageDialog from "common/hooks/useNewDirectMessageDialog";
import useMatchRoute from "common/hooks/useMatchRoute";

export interface IProps {
  directMessages: Moim.DirectMessage.IDirectMessage[];
  onInViewChange(
    visible: boolean,
    channel: Moim.Id,
    ref: React.RefObject<any>,
    statCount?: number,
  ): void;
}

function DirectMessageList({ directMessages, onInViewChange }: IProps) {
  const intl = useIntl();
  const selectedChannel = useMatchRoute();
  const { openNewDirectMessageDialog } = useNewDirectMessageDialog();
  const channelItemList = React.useMemo(
    () =>
      directMessages
        ?.filter(i => Boolean(i))
        .map(directMessage => {
          const isSelected = isSelectedChannel(
            selectedChannel,
            "dm",
            directMessage.id,
          );

          return (
            <DirectMessageItem
              key={directMessage.id}
              directMessage={directMessage}
              elementPaletteProps={{ type: "sideArea", key: "menuText" }}
              isSelected={isSelected}
              onInViewChange={onInViewChange}
            />
          );
        }),
    [directMessages, onInViewChange, selectedChannel],
  );

  return (
    <Wrapper>
      <Category
        categoryName={intl.formatMessage({
          id: "side_navigation/direct_message",
        })}
        useCollapse={false}
        textColorPaletteKey="categoryTitleText"
        elementPaletteKey="background"
        showChannelAddButton={true}
        onClickChannelAddButton={openNewDirectMessageDialog}
      />
      {channelItemList}
    </Wrapper>
  );
}

export default DirectMessageList;
