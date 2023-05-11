import styled from "styled-components";
import { B2RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { TextButton as TextButtonBase } from "common/components/designSystem/buttons";

export const Wrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};

  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  padding: ${px2rem(10)} 0;
`;

export const AllSelectContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const AllSelectLabel = styled.label`
  ${B2RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey600};
  margin-left: ${px2rem(8)};

  border-radius: ${px2rem(4)};
  transition: opacity 300ms;
  &:hover {
    opacity: 0.6;
  }
`;

export const TextButton = styled(TextButtonBase).attrs({ size: "s" })`
  height: ${px2rem(22)};
  float: right;
  color: ${props => props.theme.colorV2.colorSet.grey600};
  ${B2RegularStyle}

  &+&,
  ${AllSelectContainer} + & {
    margin-left: ${px2rem(16)};
  }
`;
