import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { IMenu } from "../../type";

import Item from "./item";

export const VerticalBar = styled.div`
  width: ${px2rem(1)};
  height: ${px2rem(24)};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

interface IProps {
  menus: IMenu[];
}

export default function MenuList({ menus }: IProps) {
  const inner = React.useMemo(
    () =>
      menus.map((menu, index) => {
        const isLast = index === menus.length - 1;

        return (
          <>
            <Item key={menu.key} menu={menu} />
            {!isLast && <VerticalBar key={`vertical-bar-${index}`} />}
          </>
        );
      }),
    [menus],
  );

  return <Wrapper>{inner}</Wrapper>;
}
