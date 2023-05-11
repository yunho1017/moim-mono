import styled, { css } from "styled-components";
import { B4Regular, H8Bold } from "common/components/designSystem/typos";
import RightIconBase from "@icon/18-rightarrow-g.svg";
import { px2rem } from "common/helpers/rem";
import { GhostGeneralButton } from "common/components/designSystem/buttons";

export const Wrapper = styled.div`
  padding: ${px2rem(16)};
`;

export const PaymentTitle = styled(H8Bold)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const PaymentNumber = styled(B4Regular)`
  margin-top: ${px2rem(4)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const DetailButton = styled(B4Regular).attrs({ role: "button" })`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-left: ${px2rem(4)};
`;

export const RightArrow = styled(RightIconBase).attrs<{ disable: boolean }>(
  props => ({
    size: "xs",
    touch: 18,
    iconColor: props.theme.colorV2.colorSet.grey300,
  }),
)``;

export const CancelButton = styled(GhostGeneralButton).attrs({ size: "s" })`
  width: 100%;
`;

export const textSkeletonStyle = css`
  display: block !important;
`;
