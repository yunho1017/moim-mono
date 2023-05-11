import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { B4Regular } from "common/components/designSystem/typos";
import CurrencyFormatter from "common/components/currencyFormatter";
import { px2rem } from "common/helpers/rem";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { getHorizontalAlignStyle } from "../wrapper/styled";

const Wrapper = styled(B4Regular)<{
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}>`
  padding: ${px2rem(2)} 0;

  width: 100%;
  display: inline-block;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${props =>
    props.horizontalAlign && getHorizontalAlignStyle(props.horizontalAlign)}
  ${useSingleLineStyle}
`;

interface IProps {
  className?: string;
  shippingFee?: number;
  shippingRequired: boolean;
  currency: string;
  block: Moim.Component.ProductItem.IShipping;
  horizontalAlign?: "start" | "center" | "end" | "space-around";
}

const Shipping = ({
  className,
  shippingFee,
  shippingRequired,
  currency,
  horizontalAlign,
}: IProps) => {
  // TODO: 추후에 배송옵션 고려한 로직 수정
  if (true || !shippingRequired || shippingFee === undefined) {
    return null;
  }
  return (
    <Wrapper className={className} horizontalAlign={horizontalAlign}>
      {shippingFee === 0 ? (
        <FormattedMessage id="shipping_free" />
      ) : (
        <FormattedMessage
          id="shipping_fee"
          values={{
            price_text: (
              <CurrencyFormatter currency={currency} value={shippingFee} />
            ),
          }}
        />
      )}
    </Wrapper>
  );
};

export default React.memo(Shipping);
