import * as React from "react";
import styled from "styled-components";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import ShavedText from "common/components/shavedText";
import { BaseItemCell, RenderRightElement } from "common/components/itemCell";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

const MemberItemWrapper = styled.div.attrs({ role: "button" })`
  padding: 0 ${px2rem(4)} 0 ${px2rem(16)};
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(28)} 0 ${px2rem(40)};
  }
`;

interface IProps {
  channel: Moim.Channel.IForumSimpleChannel;
  isSelected: boolean;
  onClick: (userId: Moim.Id) => void;
}

function Item(props: IProps) {
  const { channel, isSelected, onClick } = props;

  const handleClickUserItem = React.useCallback(() => {
    if (!channel.thread_template_ids?.length) {
      onClick(channel.id);
    }
  }, [onClick, channel]);

  return (
    <MemberItemWrapper onClick={handleClickUserItem}>
      <BaseItemCell
        size="m"
        hover={false}
        title={
          <ShavedText
            value={<NativeEmojiSafeText value={channel.name} />}
            line={1}
          />
        }
        rightElement={
          <RenderRightElement
            type="checkbox"
            name="channelSelectInput"
            value={channel.id}
            checked={isSelected}
            disabled={Boolean(channel.thread_template_ids?.length)}
          />
        }
        disabled={Boolean(channel.thread_template_ids?.length)}
      />
    </MemberItemWrapper>
  );
}

export default Item;
