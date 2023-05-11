import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B2RegularStyle, B3RegularStyle } from "../designSystem/typos";

export type TabType = "root" | "sub";

export const TabItem = styled.div.attrs({ role: "button" })<{
  type?: TabType;
  active?: boolean;
}>`
  position: relative;
  padding: ${px2rem(10)} 0;

  flex: 1;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  color: ${props =>
    props.active
      ? props.theme.colorV2.colorSet.grey800
      : props.theme.colorV2.colorSet.grey600};
  font-weight: ${props =>
    props.active ? props.theme.font.bold : props.theme.font.regular};
  transition: background-color 300ms;

  a,
  span,
  p {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:active {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }

  &::after {
    display: block;
    content: "";
    position: absolute;
    background-color: ${props => props.theme.colorV2.colorSet.grey800};
    width: 100%;
    height: ${px2rem(1)};
    left: 0;
    bottom: -1px;
    transition: all 300ms;
    opacity: ${props => (props.active ? 1 : 0)};
    transform: scale(${props => (props.active ? 1 : 0)});
  }
`;

export const Tab = styled.nav<{ type?: TabType }>`
  display: flex;
  margin-top: ${px2rem(10)};
  height: ${px2rem(42)};
  border-bottom: ${px2rem(1)} solid
    ${props => props.theme.colorV2.colorSet.grey50};
  ${props => (props.type === "root" ? B2RegularStyle : B3RegularStyle)}

  ${props =>
    props.type === "sub" &&
    css`
      margin-top: 0;

      ${TabItem}::after {
        display: none;
      }
      ${TabItem} + ${TabItem} {
        ::before {
          display: block;
          content: "";
          position: absolute;
          background-color: ${props.theme.colorV2.colorSet.grey50};
          width: 1px;
          height: 100%;
          left: 0;
          top: ${px2rem(-4)};
          bottom: ${px2rem(-4)};
        }
      }
  `}
`;

type TabItemComponentPropsTypes<T> = React.PropsWithChildren<{
  type: T;
  active: boolean;
  onClick(type: T): void;
}>;

export function TabItemComponent<T>({
  children,
  type,
  active,
  onClick,
}: TabItemComponentPropsTypes<T>) {
  const handleClick = React.useCallback(() => {
    onClick(type);
  }, [onClick, type]);

  return (
    <TabItem key={`${type}`} onClick={handleClick} active={active}>
      {children}
    </TabItem>
  );
}
