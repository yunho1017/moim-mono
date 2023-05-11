import styled from "styled-components";
import { B3Regular, H8Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const SummaryWrapper = styled.div`
  padding: ${px2rem(11)} 0;
`;

export const SummaryTitle = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const SummaryDescription = styled.div`
  padding-top: ${px2rem(11)};
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: ${px2rem(300)};
`;

export const TableWrapper = styled.div`
  width: 100%;
  padding-top: ${px2rem(20)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const FormWrapper = styled.div`
  width: 100%;
`;

export const FormItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${px2rem(9)} 0;
`;

export const PickerLabel = styled(B3Regular)`
  flex-basis: ${px2rem(81)};
`;

export const PickerValueWrapper = styled.span`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
