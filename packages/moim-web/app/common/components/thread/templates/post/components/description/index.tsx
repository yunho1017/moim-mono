import * as React from "react";
import styled from "styled-components";

import ShavedText from "common/components/shavedText/v2";
import { ThreadDescriptionWrapper } from "common/components/thread/components/wrapper/description";

import { px2rem } from "common/helpers/rem";
import { textAlignStyle } from "common/components/thread/styles";

interface IProps {
  description?: string;
  descriptionPlain?: string;
  isUnread?: boolean;
  textAlign?: Moim.Forum.ForumListConfigTextAlignment;
}

const DescriptionWrapper = styled(ThreadDescriptionWrapper)<{
  textAlign?: Moim.Forum.ForumListConfigTextAlignment;
}>`
  margin-top: ${px2rem(2)};
  ${textAlignStyle}
`;

// 나중에 config 로 빼야됨
const line = 2;

function Description({
  description,
  descriptionPlain,
  isUnread,
  textAlign,
}: IProps) {
  return (
    <DescriptionWrapper
      isUnread={isUnread}
      description={description}
      descriptionPlain={descriptionPlain}
      textAlign={textAlign}
    >
      {el => <ShavedText line={line}>{el}</ShavedText>}
    </DescriptionWrapper>
  );
}

export default React.memo(Description);
