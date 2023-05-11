import * as React from "react";
import { FormattedMessage } from "react-intl";
import ReactResizeDetector from "react-resize-detector";
import ResponsiveMenu from "common/components/responsiveMenu";
import DirectMessageItem from "app/modules/navigationPanel/components/directMessageList/directMessageItem";
import { MenuWrapper } from "common/components/responsiveMenu/components/menu";
import {
  TitleWrapper,
  Title,
  AddIcon,
  paperOverrideStyle,
  Inner,
} from "./styled";

import useMatchRoute from "common/hooks/useMatchRoute";
import useNewDirectMessageDialog from "common/hooks/useNewDirectMessageDialog";
import { useStoreState } from "app/store";
import { directMessagesSelector } from "app/selectors/directMessage";
import isSelectedChannel from "common/helpers/isSelectedChannel";

interface IProps extends React.ComponentProps<typeof ResponsiveMenu> {
  onClickMenuButton: () => void;
}

export default function DirectMessageList({
  onClickMenuButton,
  ...props
}: IProps) {
  const selectedChannel = useMatchRoute();
  const { openNewDirectMessageDialog } = useNewDirectMessageDialog();
  const { dmChannelList } = useStoreState(storeState => ({
    dmChannelList: directMessagesSelector(storeState),
  }));
  const [minHeight, setMinHeight] = React.useState<number | undefined>();

  const handleResize = React.useCallback((_width: number, height: number) => {
    setMinHeight(height);
  }, []);

  const channelItemList = React.useMemo(
    () =>
      dmChannelList.data
        .filter(i => Boolean(i))
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
              isSelected={isSelected}
              onClick={onClickMenuButton}
            />
          );
        }),
    [dmChannelList, selectedChannel, onClickMenuButton],
  );

  return (
    <ResponsiveMenu
      {...props}
      paperOverrideStyle={paperOverrideStyle}
      minHeight={minHeight}
    >
      <ReactResizeDetector handleHeight={true} onResize={handleResize}>
        <Inner>
          <TitleWrapper>
            <Title>
              <FormattedMessage id="side_navigation/direct_message" />
            </Title>
            <AddIcon onClick={openNewDirectMessageDialog} />
          </TitleWrapper>
          <MenuWrapper>{channelItemList}</MenuWrapper>
        </Inner>
      </ReactResizeDetector>
    </ResponsiveMenu>
  );
}
