// vendor
import styled, { css } from "styled-components";
// component
import { B3Regular } from "common/components/designSystem/typos";
import LinkIconBase from "@icon/18-linkchannel-s.svg";
import PrivateIconBase from "@icon/18-lock-g.svg";
// helper
import { px2rem } from "common/helpers/rem";

interface IDefaultProps {
  isSelected: boolean;
  isMuted: boolean;
  isUnread: boolean;
}

interface IElementPaletteKeyProps {
  elementPaletteKey?: Moim.Theme.SideAreaElementThemePaletteKey;
}

export const ChannelName = styled(B3Regular)<
  IDefaultProps & IElementPaletteKeyProps
>`
  display: flex;
  min-width: 0;
  margin-left: ${px2rem(16)};

  flex-direction: column;
  justify-content: center;

  font-weight: ${props => props.theme.font.regular};
  color: ${props => {
    const palette = props.theme.getSideAreaElementPalette(
      props.elementPaletteKey,
    );

    return palette.color ?? (props.isUnread ? palette.fog800 : palette.fog600);
  }};

  ${props =>
    props.isUnread &&
    css`
      font-weight: ${props.theme.font.bolder};
    `}
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  min-width: 0;
  flex: 1;
`;

export const RightElementWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const LinkIcon = styled(LinkIconBase).attrs(props => {
  const palette = props.theme.getSideAreaElementPalette(
    props.elementPaletteKey,
  );
  const iconColor = palette.color ?? palette.fog400;

  return {
    size: "xs",
    touch: 18,
    iconColor,
  };
})<IElementPaletteKeyProps>``;

export const PrivateIcon = styled(PrivateIconBase).attrs(props => {
  const palette = props.theme.getSideAreaElementPalette(
    props.elementPaletteKey,
  );
  const iconColor = palette.color ?? palette.fog600;

  return {
    size: "xs",
    touch: 18,
    iconColor,
  };
})<IElementPaletteKeyProps>``;

const linkStyle = css`
  flex: 1;
  min-width: 0;
`;

export const LinkChannelWrapper = styled.a`
  ${linkStyle}
`;

export const Wrapper = styled.div<
  IDefaultProps &
    IElementPaletteKeyProps & {
      // rightElementWidth: number;
      hasChannelItemSuffix: boolean;
    }
>`
  position: relative;
  width: 100%;
  cursor: pointer;
  transition: background-color 200ms ease-in;
  padding-right: ${px2rem(16)};
  height: ${px2rem(42)};
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${props =>
      props.theme.getSideAreaElementPalette(props.elementPaletteKey).fog50};
  }

  ${({ isSelected, isMuted, theme, elementPaletteKey }) => {
    let style = "";
    switch (true) {
      case isSelected:
        style += `
          background-color: ${
            theme.getSideAreaElementPalette(elementPaletteKey).fog100
          };

          &:hover {
            background-color: ${
              theme.getSideAreaElementPalette(elementPaletteKey).fog50
            };
          }
        `;
        break;
      case isMuted:
        style += `
          opacity: 0.5;
        `;
        break;
    }
    return css`
      ${style}
    `;
  }}
`;
