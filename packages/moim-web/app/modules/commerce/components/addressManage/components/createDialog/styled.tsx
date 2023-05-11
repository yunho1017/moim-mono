import * as React from "react";
import styled, { css } from "styled-components";
import CloseIconBase from "@icon/24-close-b.svg";
import SearchIconBase from "@icon/18-search-placeholder-g.svg";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import { DefaultDivider } from "common/components/divider/styled";
import { Spacer } from "common/components/designSystem/spacer";
import {
  GhostGeneralButton,
  FlatButton,
  FlatGeneralButton,
  TextButton,
} from "common/components/designSystem/buttons";
import {
  B4RegularStyle,
  H9BoldStyle,
} from "common/components/designSystem/typos";

export const DefaultAddressChipStyle = css`
  width: fit-content;
  height: ${px2rem(18)};
  padding: 1px ${px2rem(6)};
  background-color: ${props => props.theme.colorV2.colorSet.grey600};
  color: ${props => props.theme.colorV2.colorSet.white1000};
  margin-left: ${px2rem(4)};
  ${B4RegularStyle}
`;

export const Wrapper = styled.div`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    height: 100%;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)};
  }
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 0 ${px2rem(16)} ${px2rem(36)};
`;

export const FormTable = styled.div`
  width: 100%;
  margin-bottom: ${px2rem(12)};

  display: flex;
  flex-direction: column;
`;

const BoxStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Left = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  ${BoxStyle};
  ${H9BoldStyle}

  flex-direction: row;
  margin-top: ${px2rem(20)};
  margin-bottom: ${px2rem(12)};
`;
export const Right = styled.div`
  ${BoxStyle};
`;

export const BoxContainer = styled.div`
  width: 100%;
  padding: ${px2rem(4)} 0;
`;

export const SearchBoxContainer = styled.div`
  width: 100%;
  height: ${px2rem(400)};
  border-radius: ${px2rem(4)};
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey200};
  padding: ${px2rem(8)};
`;

export const Divider = () => (
  <>
    <Spacer value={8} />
    <DefaultDivider />
    <Spacer value={8} />
  </>
);

export const DefaultChipContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${px2rem(12)} 0 0;
`;

export const SetDefaultContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${px2rem(12)} 0;

  > label {
    user-select: none;
    padding-left: ${px2rem(12)};
    color: ${props => props.theme.colorV2.colorSet.grey600};
  }
`;

export const ButtonContainer = styled.div`
  padding: ${px2rem(16)} 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: ${px2rem(12)};
`;

export const DeleteButton = styled(TextButton).attrs({ size: "s" })`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  color: ${props => props.theme.color.red700};
`;

export const CancelButton = styled(GhostGeneralButton).attrs({
  size: "l",
})`
  width: 100%;
`;

export const DoneButton = styled(FlatButton).attrs({
  size: "l",
})`
  width: 100%;
`;

export const OpenAddressSearchButton = styled(FlatGeneralButton).attrs({
  size: "m",
})`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  margin-left: ${px2rem(10)};

  div.text {
    flex: 1;
    min-width: 0;
    width: 100%;
    margin-right: ${px2rem(7)};
  }
`;

export const BoxInputWrapperStyle = css`
  height: ${px2rem(42)};
  margin: 0;
`;

export const ZipCodeBoxInputContainer = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
`;

export const ZipCodeContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const DeleteButtonContainer = styled.div`
  width: 100%;
  padding: ${px2rem(4)} 0;
`;

export const CloseButton = styled(CloseIconBase).attrs(props => ({
  size: "s",
  touch: 44,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const SearchIcon = styled(SearchIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.white1000,
}))``;
