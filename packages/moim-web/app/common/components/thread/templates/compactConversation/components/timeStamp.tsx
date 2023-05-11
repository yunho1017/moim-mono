import * as React from "react";
import styled from "styled-components";

import CreateDayOMeter from "common/components/createDayOMeter";
import { B4Regular } from "common/components/designSystem/typos";

import { useIntlShort } from "common/hooks/useIntlShort";
import { textAlignStyle } from "common/components/thread/styles";
import { px2rem } from "common/helpers/rem";

const TimeStampWrapper = styled(B4Regular)`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-top: ${px2rem(4)};
  padding: 0 ${px2rem(16)};

  ${textAlignStyle}
`;

interface IProps {
  createdAt: number;
  textAlign?: Moim.Forum.ForumListConfigTextAlignment;
}

function TimeStamp({ createdAt, textAlign }: IProps) {
  const intl = useIntlShort();
  return (
    <TimeStampWrapper textAlign={textAlign}>
      <CreateDayOMeter
        givenDate={createdAt}
        className="time"
        useChange={false}
        normalFormat={intl("datetime_format_short_tiny_date")}
      />
    </TimeStampWrapper>
  );
}

export default React.memo(TimeStamp);
