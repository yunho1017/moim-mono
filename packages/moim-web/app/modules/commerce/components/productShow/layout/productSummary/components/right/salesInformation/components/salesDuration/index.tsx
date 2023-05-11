import React from "react";
import moment from "moment";
import styled from "styled-components";

import { B4Regular } from "common/components/designSystem/typos";

import { px2rem } from "common/helpers/rem";

const InformationContainer = styled(B4Regular)`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

interface IProps {
  startDateTime?: number;
  endDateTime?: number;
}
export default function SalesDuration({ endDateTime, startDateTime }: IProps) {
  const elem = React.useMemo(() => {
    if (!startDateTime && !endDateTime) {
      return null;
    } else {
      const start = moment(startDateTime).format("yyyy-mm-dd");
      const end = moment(endDateTime).format("yyyy-mm-dd");
      return `${start}-${end}`;
    }
  }, []);

  return elem ? <InformationContainer>{elem}</InformationContainer> : null;
}
