import styled from "styled-components";
import { B2Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import CopyIconBase from "@icon/18-copy-g.svg";

export const AddressItemWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-right: ${px2rem(4)};
`;

export const AddressValue = styled(B2Regular)`
  flex: 1;
  min-width: 0;
  padding: ${px2rem(10)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const CopyIcon = styled(CopyIconBase).attrs({
  size: "xs",
  touch: 42,
})``;
