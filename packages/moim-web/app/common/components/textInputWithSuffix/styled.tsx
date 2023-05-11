import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { TextInput } from "common/components/designSystem/inputs";
import { H8Bold } from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Suffix = styled(H8Bold)`
  padding: ${px2rem(15)} ${px2rem(16)} ${px2rem(15)} 0;
  font-weight: ${props => props.theme.font.regular};
`;

export const InputWithSuffix = styled(TextInput)`
  width: auto;
  padding-right: 0;
`;
