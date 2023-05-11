import * as React from "react";
import styled from "styled-components";

import ShavedText from "common/components/shavedText/v2";
import { ThreadDescriptionWrapper } from "common/components/thread/components/wrapper/description";

import { px2rem } from "common/helpers/rem";
import { textAlignStyle } from "common/components/thread/styles";

const DescriptionWrapper = styled(ThreadDescriptionWrapper)<{
  textAlign?: Moim.Forum.ForumListConfigTextAlignment;
}>`
  ${textAlignStyle};
  margin-top: ${px2rem(2)};
  padding: 0 ${px2rem(16)};
`;

interface IProps {
  description?: string;
  descriptionPlain?: string;
  isUnread?: boolean;
  textAlign?: Moim.Forum.ForumListConfigTextAlignment;
}

// 나중에 config 로 빼야됨
const line = 1;

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
      {value => <ShavedText line={line}>{value}</ShavedText>}
    </DescriptionWrapper>
  );
}

export default React.memo(Description);
