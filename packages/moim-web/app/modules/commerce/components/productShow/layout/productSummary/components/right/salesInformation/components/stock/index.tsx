import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

import { B4Regular } from "common/components/designSystem/typos";

import numberWithComma from "common/helpers/numberWithComma";
import { px2rem } from "common/helpers/rem";

const InformationContainer = styled(B4Regular)`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

interface IProps {
  soldCount: number;
  stockCount?: number;
}
export default function Stock({ soldCount, stockCount }: IProps) {
  let elem: React.ReactNode | null = null;
  if (stockCount === undefined) {
    return null;
  } else {
    const totalCount = stockCount + soldCount;
    elem = (
      <FormattedMessage
        id="status_stock_count_left"
        values={{
          quantity: numberWithComma(totalCount),
          quantity_left: numberWithComma(stockCount),
        }}
      />
    );
  }

  return elem ? <InformationContainer>{elem}</InformationContainer> : null;
}
