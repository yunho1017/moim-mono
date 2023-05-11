import styled from "styled-components";
import SearchIconComponent from "@icon/18-search-placeholder-g.svg";
import { px2rem } from "common/helpers/rem";
import { B1RegularStyle } from "common/components/designSystem/typos";
import { TouchWrapper } from "common/icons/styledComponents";

export const SearchIcon = styled(SearchIconComponent).attrs({
  size: "xs",
  touch: 42,
})``;

export const SearchIconWrapper = styled.div`
  width: ${px2rem(42)};
  height: ${px2rem(42)};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${TouchWrapper} {
    cursor: default;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  height: ${px2rem(22)};
  width: 100%;
  display: block;
  background-color: transparent;
  border: 0;
  ${B1RegularStyle};
  &::placeholder {
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }
`;
