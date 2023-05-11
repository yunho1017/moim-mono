import styled from "styled-components";
import { B4RegularStyle } from "common/components/designSystem/typos";

export const FundOnSaleStatusText = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  text-transform: uppercase;
  ${B4RegularStyle};
`;

export const NormalStatusText = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey50};
  text-transform: uppercase;
  ${B4RegularStyle};
`;

export const SoldOutText = styled.div`
  color: ${props => props.theme.color.red700};
  text-transform: uppercase;
  ${B4RegularStyle};
`;
