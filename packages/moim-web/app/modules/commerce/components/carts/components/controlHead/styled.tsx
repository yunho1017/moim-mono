import styled from "styled-components";
import { B4RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { TextButton as TextButtonBase } from "common/components/designSystem/buttons";

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border-top: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  padding: ${px2rem(8)} ${px2rem(16)};
  display: flex;
  align-items: center;
`;

export const AllSelectContainer = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
  flex: 1;
  min-width: 0;
`;

export const AllSelectLabel = styled.label`
  ${B4RegularStyle};
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
  padding: 0;
  ${B4RegularStyle}

  &+& {
    margin-left: ${px2rem(16)};
  }
`;
