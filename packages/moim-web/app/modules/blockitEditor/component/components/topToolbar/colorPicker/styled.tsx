import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { ToolBoxStyle } from "../styled";
import { FlatGeneralButton } from "common/components/designSystem/buttons";
import FontColorIconBase from "@icon/18-textcolor-1.svg";
import BgColorIconBase from "@icon/18-textbgcolor-1.svg";

const CUSTOM_COLOR_WIDTH = 240;
const PRESET_SIZE = 20;

export const PaperStyle = css`
  border-radius: ${px2rem(4)};
`;

export const Wrapper = styled.div`
  height: fit-content;
`;

export const CustomColorWrapper = styled.div`
  width: ${px2rem(CUSTOM_COLOR_WIDTH)};
  padding: ${px2rem(16)};
  height: fit-content;

  .react-colorful {
    width: 100%;
  }
  .react-colorful__saturation {
    border-radius: ${px2rem(2)} ${px2rem(2)} 0 0;
  }
  .react-colorful__last-control {
    border-radius: 0 0 ${px2rem(2)} ${px2rem(2)};
  }
`;

export const PresetContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${px2rem(6)};
  padding: ${px2rem(8)};
`;

const ButtonStyle = css`
  width: ${px2rem(PRESET_SIZE)};
  height: ${px2rem(PRESET_SIZE)};
  border-radius: ${px2rem(2)};
`;

export const ClearButton = styled.button.attrs({ tabIndex: -1 })`
  position: relative;
  background-color: white;
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey800};
  ${ButtonStyle};

  :after {
    content: "";
    position: absolute;
    top: -4px;
    left: 45%;
    height: ${px2rem(26)}; // NOTE: 소수점은 절삭한 도형의 대각선 길이
    width: 2px;
    background-color: ${props => props.theme.color.red700};
    z-index: ${props => props.theme.zIndexes.default};
  }

  :after {
    transform: rotate(45deg);
  }
`;

export const CustomColorButton = styled.button`
  background-image: linear-gradient(
    135deg,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );

  ${ButtonStyle}
`;

export const PresetSampleButton = styled.button.attrs<{ color?: string }>({
  tabIndex: -1,
})`
  background-color: ${props =>
    props.color ?? props.theme.colorV2.colorSet.grey800};
  border: ${props =>
    props.color?.toLowerCase() === "#ffffff" &&
    `1px solid ${props.theme.colorV2.colorSet.grey50}`};
  ${ButtonStyle}
`;

export const CustomColorBottomContainer = styled.div`
  width: 100%;
  display: flex;
  padding: ${px2rem(8)} ${px2rem(4)} ${px2rem(4)};
  column-gap: ${px2rem(8)};
`;

export const ApplyButton = styled(FlatGeneralButton).attrs({ size: "s" })`
  justify-self: right;
`;

export const HexInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  text-transform: uppercase;
  border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey300};
  color: ${props => props.theme.colorV2.colorSet.grey800};

  :focus {
    border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey800};
  }
`;

export const FontColorIcon = styled(FontColorIconBase).attrs({
  size: "xs",
  touch: 30,
})``;
export const BgColorIcon = styled(BgColorIconBase).attrs({
  size: "xs",
  touch: 30,
})``;

export const RootContainButton = styled.button.attrs<{ color?: string }>({
  tabIndex: -1,
})`
  ${ToolBoxStyle}

  ${FontColorIcon} {
    path {
      fill: ${props =>
        props.disabled
          ? props.theme.colorV2.colorSet.grey300
          : props.theme.colorV2.colorSet.grey800};
    }
  }

  ${BgColorIcon} {
    g {
      fill: ${props =>
        props.disabled
          ? props.theme.colorV2.colorSet.grey300
          : props.theme.colorV2.colorSet.grey800};
    }
  }
`;
