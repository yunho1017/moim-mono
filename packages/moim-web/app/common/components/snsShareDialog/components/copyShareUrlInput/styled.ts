import styled from "styled-components";
import { B1Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { TextButton } from "common/components/designSystem/buttons";

export const Wrapper = styled.div`
  width: 100%;

  padding: ${px2rem(1)} ${px2rem(16)} ${px2rem(19)};
`;

export const Input = styled.div`
  display: flex;
  align-items: center;
  height: ${px2rem(44)};
  padding: 0 ${px2rem(8)} 0 ${px2rem(16)};
  border-radius: ${px2rem(4)};
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey200};
`;

export const ShareUrl = styled(B1Regular)`
  flex: 1;
  min-width: 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-right: ${px2rem(12)};
`;

export const CopyButton = styled(TextButton).attrs({ size: "s" })``;
