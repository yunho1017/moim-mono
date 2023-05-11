import * as React from "react";
import styled from "styled-components";
import { B4Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { IMenu } from "../../type";

const Wrapper = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  padding: ${px2rem(8)} ${px2rem(4)} ${px2rem(6)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

interface IProps {
  menu: IMenu;
}

export default function Item({ menu }: IProps) {
  return (
    <Wrapper>
      <Inner role="button" onClick={menu.handler}>
        {menu.icon}
        <Text>{menu.label}</Text>
      </Inner>
    </Wrapper>
  );
}
