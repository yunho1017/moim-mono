import styled from "styled-components";
import SearchIconBase from "@icon/18-search-placeholder-g.svg";
import CloseIconBase from "@icon/24-close-b.svg";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${px2rem(42)};
  padding: ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const SearchIcon = styled(SearchIconBase).attrs({
  size: "s",
  touch: 18,
})``;

export const Input = styled.input.attrs({ type: "text" })`
  flex: 1;
  height: 100%;
  border: 0;
  margin-left: ${px2rem(12)};
  margin-right: ${px2rem(14)};
  font-size: ${px2rem(16)};
  line-height: ${px2rem(22)};

  &::placeholder {
    color: ${props => props.theme.colorV2.colorSet.grey600};
  }
`;

export const CloseButton = styled.button`
  margin-left: auto;
`;

export const CloseIcon = styled(CloseIconBase).attrs({
  size: "s",
  touch: 18,
})``;
