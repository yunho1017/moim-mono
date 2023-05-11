import styled, { css } from "styled-components";
import { B1RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import SearchIconResource from "@icon/18-search-placeholder-g.svg";
import { useScrollStyle } from "../designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  min-height: ${px2rem(42)};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${px2rem(16)};
`;

export const SearchIcon = styled(SearchIconResource).attrs({
  size: "xs",
  touch: 24,
})``;

export const InputContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${px2rem(42)};
  border-radius: ${px2rem(4)};
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey200};
  margin: ${px2rem(4)} 0;
  padding-left: ${px2rem(4)};
  padding-right: ${px2rem(16)};
  align-items: center;
  justify-content: center;
`;

export const PositionChipContainer = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  padding-top: ${px2rem(8)};
  margin-left: -${px2rem(8)};
  margin-bottom: -${px2rem(8)};
`;

export const ChipWrapper = styled.div`
  display: inline-flex;
  min-width: 0;

  margin-left: ${px2rem(8)};
  margin-bottom: ${px2rem(8)};
`;

export const Input = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background-color: transparent;
  ${B1RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey600};
  margin-left: ${px2rem(4)};
  display: inline-block;
  width: 100%;
  min-width: 80%;

  &::placeholder {
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }
`;

export const PopperWrapperStyle = css`
  width: ${px2rem(343)};
  max-height: ${px2rem(150)};
  padding: ${px2rem(4)} 0;
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  margin-top: -${px2rem(6)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: ${props =>
    props.theme.zIndexes.toast}; /* should be higher than dialog */

  &[data-needscroll="true"] {
    height: 100%;
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    max-width: inherit;
  }
`;

export const Inner = styled.ul`
  width: 100%;
  height: 100%;
  ${useScrollStyle};
  list-style: none;
`;

export const ItemContainerStyle = css`
  height: ${px2rem(42)};
  padding: 0 ${px2rem(16)};
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  min-height: ${px2rem(153)};
  display: flex;
  align-items: center;
  justify-content: center;
`;
