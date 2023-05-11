import * as React from "react";
import styled, { css } from "styled-components";
import { Link, LinkProps } from "react-router-dom";
import { px2rem } from "common/helpers/rem";
import {
  IProps,
  buttonWidthMap,
  buttonPaddingMap,
  buttonHeightMap,
  buttonFontStyleMap,
} from "./data";
import { LoadingIcon } from "common/components/loading";
import { MEDIA_QUERY } from "common/constants/responsive";

const buttonCSS = css<IProps>`
  min-width: ${props => px2rem(buttonWidthMap.get(props.size)!)};
  padding: 0 ${props => px2rem(buttonPaddingMap.get(props.size)!)};
  height: ${props => px2rem(buttonHeightMap.get(props.size)!)};
  ${props => buttonFontStyleMap.get(props.size)};
  border-radius: ${px2rem(4)};
  transition: opacity 300ms;

  ${props =>
    !props.waiting
      ? css`
          &:disabled {
            opacity: 0.4;
            cursor: inherit;
          }
        `
      : css`
          cursor: wait;
          &:hover {
            opacity: unset;
          }
        `}

  ${props =>
    props.isFullWidth &&
    css`
      width: 100%;
    `}

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    &:hover {
      opacity: 0.6;
    }
  }
`;

const loaderStyle = css`
  top: 0;
`;

const ButtonStyled = styled.button.attrs<IProps>(props => ({
  disabled: props.disabled || props.waiting,
}))<IProps>`
  ${buttonCSS};
`;

const LinkButtonStyled = styled(Link)<IProps>`
  ${buttonCSS};
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export type ILinkButtonProps = Omit<LinkProps, "to"> & IProps;
export type IButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  IProps;

function propsHasLink(
  props: ILinkButtonProps | IButtonProps,
): props is ILinkButtonProps {
  return Boolean(!props.disabled && props.to);
}

const Buttons = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ILinkButtonProps & IButtonProps
>((props, ref) => {
  const { children: buttonChildren, loaderColor } = props;
  const children = props.waiting ? (
    <LoadingIcon color={loaderColor} overrideStyle={loaderStyle} />
  ) : (
    buttonChildren
  );
  if (propsHasLink(props)) {
    return (
      <LinkButtonStyled
        to={props.to!}
        {...(props as ILinkButtonProps)}
        innerRef={ref as React.Ref<HTMLAnchorElement>}
      >
        {children}
      </LinkButtonStyled>
    );
  } else {
    return (
      <ButtonStyled
        {...(props as any)}
        ref={ref as React.Ref<HTMLButtonElement>}
      >
        {children}
      </ButtonStyled>
    );
  }
});

export default Buttons;
