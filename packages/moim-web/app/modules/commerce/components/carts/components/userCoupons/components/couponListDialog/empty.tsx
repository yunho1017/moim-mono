import React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { Spacer } from "common/components/designSystem/spacer";
import { B2Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const EmptyText = styled(B2Regular)`
  width: 100%;
  text-align: center;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(8)} ${px2rem(12)};
`;

export const CouponListEmpty = () => {
  return (
    <Wrapper>
      <Spacer value={36} />
      <EmptyText>
        <FormattedMessage id="cart_coupon_list_empty" />
      </EmptyText>
      <Spacer value={36} />
    </Wrapper>
  );
};
