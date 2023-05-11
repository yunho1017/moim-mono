import React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

interface IProps {
  color: string;
  height: string;
  isHidden?: boolean;
}

export const Divider = styled.hr<IProps>`
  height: ${props => props.height};
  border: 0;
  margin: 0;
  background-color: ${props => props.color};

  display: ${props => (props.isHidden ? "none" : "block")};
`;

const DividerWrapper = styled.div`
  padding: 0 0;
`;

const DividerVerticalInner = styled.div`
  height: 100%;

  width: 1px;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

export const DividerVertical: React.FC = () => {
  return (
    <DividerWrapper>
      <DividerVerticalInner />
    </DividerWrapper>
  );
};

interface IPaletteDividerProps {
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
  height?: string;
}

export const PaletteDivider = styled.hr<IPaletteDividerProps>`
  height: ${props => props.height ?? px2rem(1)};
  border: 0;
  margin: 0;
  background-color: ${props =>
    props.theme.getThemeElementColor({
      targetColor: "fog50",
      elementPalette: props.elementPaletteProps,
      fallback: props.theme.colorV2.colorSet.grey50,
    })};
`;

export const DefaultDivider = styled(Divider).attrs(props => ({
  color: props.theme.colorV2.colorSet.grey50,
  height: px2rem(1),
}))``;

export const DefaultBoldDivider = styled.div`
  position: relative;
  width: 100%;
  height: ${px2rem(8)};

  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
    border-top: 1px solid ${props => props.theme.colorV2.colorSet.grey50};

    z-index: ${props => props.theme.zIndexes.default};
  }
`;
