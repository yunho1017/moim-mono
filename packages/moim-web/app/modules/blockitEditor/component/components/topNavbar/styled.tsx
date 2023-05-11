import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { PaletteDivider } from "common/components/divider/styled";
import {
  FlatButton,
  TextGeneralButton,
  GhostGeneralButton,
} from "common/components/designSystem/buttons";
import { B3RegularStyle } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import {
  noScrollBarStyle,
  useScrollStyle,
} from "common/components/designSystem/styles";
import CheckIconBase from "@icon/18-checkmark-g.svg";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey10};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    flex-direction: column;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: ${px2rem(56)};
  }
`;

export const Left = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
`;

export const Right = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  min-width: 0;

  display: flex;
  justify-content: right;
  align-items: center;

  button + button {
    margin-left: ${px2rem(8)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(8)} 0;
  }
`;

export const CloseButton = styled(TextGeneralButton).attrs({ size: "s" })``;
export const SaveButton = styled(FlatButton).attrs({ size: "s" })``;
export const PreviewShowButton = styled(TextGeneralButton).attrs({
  size: "s",
})``;

export const SaveDraftButton = styled(GhostGeneralButton).attrs({
  size: "s",
})`
  display: flex;
  align-items: center;
  padding: 0;

  &:hover {
    opacity: 1;
  }

  ${props =>
    !props.waiting &&
    css`
      span {
        display: inline-flex;
        align-items: center;
        height: 100%;
        min-width: 0;

        :hover {
          opacity: 0.6;
        }
      }
      span:first-child {
        padding-left: ${px2rem(12)};
      }
      span:last-child {
        padding-right: ${px2rem(12)};
      }
    `}
`;

export const InnerDivider = styled(PaletteDivider).attrs({
  height: px2rem(24),
  width: "1px",
})`
  margin: 0 ${px2rem(16)};
`;

export const wrapperStyle = css`
  min-width: ${px2rem(120)};
  padding: 0;
`;

export const ChannelOptionName = styled.span`
  display: inline-block;
  width: 100%;
  flex: 1;
  min-width: 0;
  user-select: none;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B3RegularStyle}
`;

export const selectWrapper = css`
  min-width: inherit;
`;
export const selectInnerWrapper = css`
  max-width: ${px2rem(230)};
  max-height: ${px2rem(275)};
  ${useScrollStyle}
  ${noScrollBarStyle}
`;

export const CheckIcon = styled(CheckIconBase).attrs(props => ({
  size: "xs",
  touch: 32,
  iconColor: props.theme.colorV2.accent,
}))`
  visibility: hidden;
`;

export const ChannelOptionWrapper = styled.div<{ checked: boolean }>`
  height: ${px2rem(42)};
  padding: ${px2rem(6)} ${px2rem(10)} ${px2rem(6)} ${px2rem(16)};
  display: flex;
  align-items: center;
  transition: background-color 300ms;

  ${CheckIcon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")};
  }

  :hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
  }
`;
