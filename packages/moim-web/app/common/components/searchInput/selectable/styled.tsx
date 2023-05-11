import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B1RegularStyle,
  B1Regular,
} from "common/components/designSystem/typos";

import SearchIconBase from "@icon/18-search-placeholder-g.svg";
import { useScrollStyle } from "common/components/designSystem/styles";
export const SearchIcon = styled(SearchIconBase).attrs({
  size: "s",
  touch: 18,
})``;
export const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-right: ${px2rem(12)};
`;

export const Selected = styled(B1Regular)<{ clicked: boolean }>`
  color: ${props => props.theme.colorV2.accent};

  ${props =>
    props.clicked &&
    css`
      padding: ${px2rem(1)} ${px2rem(2)};
      color: ${props.theme.colorV2.colorSet.white1000};
      background-color: ${props.theme.colorV2.accent};
    `}
`;

export const SelectedListScrollSection = styled.div`
  max-height: ${px2rem(100)};
  ${useScrollStyle}
`;

export const SelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: ${px2rem(-8)};
  padding: ${px2rem(8)} ${px2rem(16)} 0;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${px2rem(10)} ${px2rem(16)};
`;

export const Wrapper = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  min-width: ${px2rem(10)};
  height: ${px2rem(22)};
  max-width: 100%;
  background-color: transparent;
  border: 0;

  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B1RegularStyle};

  &::placeholder {
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }
`;
