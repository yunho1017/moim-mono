import * as React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { NormalButton } from "./common";

const Buttons = styled.div`
  display: flex;
  align-items: center;
  margin: ${px2rem(4)} 0;
`;

export interface IButtonCaseTypeBProps {
  type: "caseB";
  onClickAddToCart(parcel: Moim.Commerce.IPurchaseReadyItem): void;
  onClickShippingTrack(shippingNumber: string): void;
}

interface IProps {
  onClickAddToCart(): void;
  onClickShippingTrack(): void;
}

const ButtonCaseTypeB: React.FC<IProps> = ({
  onClickAddToCart,
  onClickShippingTrack,
}) => (
  <Buttons>
    <NormalButton onClick={onClickAddToCart}>
      <FormattedMessage id="button_add_to_cart" />
    </NormalButton>
    <NormalButton onClick={onClickShippingTrack}>배송조회</NormalButton>
  </Buttons>
);

export default ButtonCaseTypeB;
