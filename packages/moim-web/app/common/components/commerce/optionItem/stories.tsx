import * as React from "react";
import styled from "styled-components";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import OptionItem from ".";

const Wrapper = styled.div<{ width: number }>`
  width: ${props => props.width}px;
`;

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Commerce/OptionItem`,
  module,
).add("Default", () => (
  <Wrapper width={359}>
    <OptionItem
      productType="normal"
      sellerId="S1234"
      productId="P123"
      status="onSale"
      title="완도 노화도 전복 (양식) - 전복 양식 본고장에서 보내는 최상의 보양식"
      option="사이즈: 1마리[특대, 450~500g] - 40,900원
손질선택: 구이용
포장: 개별포장"
      rawPrice={16000}
      price={{ value: "16000", currency: "KRW" }}
      rawOriginPrice={16000}
      originPrice={{ value: "16000", currency: "KRW" }}
      imageUrl={{
        web: [
          {
            url:
              "https://xn--hq1b99vojf6xm.com/data/padobox/goods/a004/small/20202944884076514.jpg",
          },
        ],
        mobile: [
          {
            url:
              "https://xn--hq1b99vojf6xm.com/data/padobox/goods/a004/small/20202944884076514.jpg",
          },
        ],
      }}
      qty={1}
      shippingFee={{ value: "3000", currency: "KRW" }}
      creditAmount={{ currency: "KRW", value: "3" }}
      onChangeChecked={action("onChangeChecked")}
    >
      {({ Title, Option, Price, ShippingFee, defaultValue }) => (
        <>
          <Title>{defaultValue.title}</Title>
          {defaultValue.option && <Option>{defaultValue.option}</Option>}
          <Price>{defaultValue.price}</Price>
          <ShippingFee>{defaultValue.shippingFee}</ShippingFee>
          {defaultValue.point}
        </>
      )}
    </OptionItem>
    <OptionItem
      productType="normal"
      sellerId="S1234"
      productId="P123"
      status="soldOut"
      title="완도 노화도 전복 (양식) - 전복 양식 본고장에서 보내는 최상의 보양식"
      option="사이즈: 1마리[특대, 450~500g] - 40,900원
손질선택: 구이용
포장: 개별포장"
      rawPrice={16000}
      price={{ value: "16000", currency: "KRW" }}
      rawOriginPrice={16000}
      originPrice={{ value: "16000", currency: "KRW" }}
      imageUrl={{
        web: [
          {
            url:
              "https://xn--hq1b99vojf6xm.com/data/padobox/goods/a004/small/20202944884076514.jpg",
          },
        ],
        mobile: [
          {
            url:
              "https://xn--hq1b99vojf6xm.com/data/padobox/goods/a004/small/20202944884076514.jpg",
          },
        ],
      }}
      qty={1}
      shippingFee={{ value: "3000", currency: "KRW" }}
      creditAmount={{ currency: "KRW", value: "3" }}
      onChangeChecked={action("onChangeChecked")}
    >
      {({ Title, Option, Price, ShippingFee, defaultValue }) => (
        <>
          <Title>{defaultValue.title}</Title>
          {defaultValue.option && <Option>{defaultValue.option}</Option>}
          <Price>{defaultValue.price}</Price>
          <ShippingFee>{defaultValue.shippingFee}</ShippingFee>
          {defaultValue.point}
        </>
      )}
    </OptionItem>
  </Wrapper>
));
