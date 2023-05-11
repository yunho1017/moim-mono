import * as React from "react";

import HorizontalChannelList from "common/components/horizontalChannelList";
import { Wrapper } from "./styled";

import { arrayEqual, useStoreState } from "app/store";
import useRedirect from "common/hooks/useRedirect";

import { channelWithCategorySelector } from "app/selectors/channel";
import { MoimURL } from "common/helpers/url";
import { TopNavigationContext } from "../../../../context";

function MenuElement({
  elementPaletteProps,
}: {
  elementPaletteProps: Moim.Theme.CommonElementThemePaletteProps;
}) {
  const { onlyMoreMenu } = React.useContext(TopNavigationContext);
  const channelList = useStoreState(
    storeState => channelWithCategorySelector(storeState).data,
    arrayEqual,
  );

  const push = useRedirect();

  const redirectToChannel = React.useCallback(
    (channel: Moim.Channel.SimpleChannelType) => {
      switch (channel.type) {
        case "forum": {
          push(
            new MoimURL.Forum({
              forumId: channel.id || "",
            }).toString(),
          );
          break;
        }

        case "conversation": {
          push(
            new MoimURL.ConversationShow({
              conversationId: channel.id || "",
            }).toString(),
          );
          break;
        }

        case "subgroups":
        case "tag": {
          push(
            new MoimURL.SubMoimList({
              tag: channel.id,
            }).toString(),
          );
          break;
        }

        case "view": {
          push(
            new MoimURL.ViewShow({
              viewId: channel.id,
            }).toString(),
          );
          break;
        }

        default: {
          break;
        }
      }
    },
    [push],
  );

  return (
    <Wrapper>
      <HorizontalChannelList
        channelList={channelList}
        maxChannelVisibleFixedCount={onlyMoreMenu ? 0 : undefined}
        elementPaletteProps={elementPaletteProps}
        onClickChannelItem={redirectToChannel}
      />
    </Wrapper>
  );
}

export default React.memo(MenuElement);
