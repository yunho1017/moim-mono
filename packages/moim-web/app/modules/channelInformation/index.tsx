import * as React from "react";

import { Wrapper, Header, HeaderTitle, HeaderDescription } from "./styled";
import MemberList, {
  IProps as MemberListProps,
} from "common/components/memberList";
import { DefaultLoader as Loader } from "common/components/loading";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";

interface IProps extends MemberListProps {
  channel: Moim.Channel.IChannel;
  isInitialLoading: boolean;
}

export default function ChannelInformation({
  channel,
  onGetMembers,
  isInitialLoading,
  ...rest
}: IProps) {
  React.useEffect(() => {
    onGetMembers();
  }, []);

  if (isInitialLoading) {
    return <Loader />;
  }

  if (!channel) {
    return null;
  }

  return (
    <Wrapper>
      <Header>
        <HeaderTitle>
          <NativeEmojiSafeText value={channel.name} />
        </HeaderTitle>
        {channel.purpose && (
          <HeaderDescription>
            <NativeEmojiSafeText value={channel.purpose.content} />
          </HeaderDescription>
        )}
      </Header>
      <MemberList {...rest} onGetMembers={onGetMembers} subTitleShaveLine={1} />
    </Wrapper>
  );
}
