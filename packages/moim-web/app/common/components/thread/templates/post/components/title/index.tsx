import * as React from "react";
import styled from "styled-components";

import ShavedText from "common/components/shavedText/v2";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { ThreadTitleWrapper } from "common/components/thread/components/wrapper/title";
import { textAlignStyle } from "common/components/thread/styles";
import { Thread } from "app/typings";

interface IProps {
  title?: string;
  stat?: Thread.IThreadItemStatProps;
  prefix?: React.ReactNode;
  textAlign?: Moim.Forum.ForumListConfigTextAlignment;
}

const TitleWrapper = styled(ThreadTitleWrapper)<{
  textAlign?: Moim.Forum.ForumListConfigTextAlignment;
}>`
  ${textAlignStyle}
`;

function Title({ title, stat, prefix, textAlign }: IProps) {
  return (
    <TitleWrapper stat={stat} prefix={prefix} textAlign={textAlign}>
      <ShavedText line={1}>
        <NativeEmojiSafeText value={title ?? ""} />
      </ShavedText>
    </TitleWrapper>
  );
}

export default React.memo(Title);
