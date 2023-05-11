import * as React from "react";
import { FormattedMessage } from "react-intl";
import CurrencyFormatter from "common/components/currencyFormatter";

import { TextWrap, PointContainer, CoinIcon, PointWrapper } from "../styled";

const Points: React.FC<{ currency: string; points: number }> = ({
  currency,
  points,
}) => {
  return (
    <PointWrapper>
      <TextWrap>
        <span className="left"></span>
        <span className="right">
          <PointContainer>
            <CoinIcon />
            <span>
              <FormattedMessage
                id="credit_earning"
                values={{
                  price_text: (
                    <CurrencyFormatter currency={currency} value={points} />
                  ),
                }}
              />
            </span>
          </PointContainer>
        </span>
      </TextWrap>
    </PointWrapper>
  );
};

export default Points;
