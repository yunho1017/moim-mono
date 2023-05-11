import * as React from "react";
import styled from "styled-components";

import ShavedText from "common/components/shavedText/v2";
import { ThreadTitleWrapper } from "common/components/thread/components/wrapper/title";

import { px2rem } from "common/helpers/rem";
import { textAlignStyle } from "common/components/thread/styles";
import { Thread } from "app/typings";

const TitleWrapper = styled(ThreadTitleWrapper)<{
  textAlign?: Moim.Forum.ForumListConfigTextAlignment;
}>`
  margin-top: ${px2rem(4)};
  padding: 0 ${px2rem(16)};

  ${textAlignStyle}
`;

interface IProps {
  title?: string;
  stat?: Thread.IThreadItemStatProps;
  textAlign?: Moim.Forum.ForumListConfigTextAlignment;
}

// 나중에 config 로 빼야됨
const line = 1;

function Title({ title, stat, textAlign }: IProps) {
  return (
    <TitleWrapper stat={stat} textAlign={textAlign}>
      <ShavedText line={line}>{title}</ShavedText>
    </TitleWrapper>
  );
}

export default React.memo(Title);
