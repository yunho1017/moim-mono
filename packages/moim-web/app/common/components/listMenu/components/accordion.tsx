import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1Regular } from "common/components/designSystem/typos";

import DownIconBase from "@icon/18-down-s-g.svg";
import UpIconBase from "@icon/18-up-s-g.svg";

export const Wrapper = styled.nav.attrs({ role: "button" })`
  display: flex;
  align-items: center;
  padding: ${px2rem(5)} ${px2rem(16)};
`;

export const Contents = styled(B1Regular)`
  flex: 1;
`;

export const DownIcon = styled(DownIconBase).attrs({
  size: "xs",
  touch: 18,
})``;

export const UpIcon = styled(UpIconBase).attrs({
  size: "xs",
  touch: 18,
})``;

interface IProps {
  active?: boolean;
  onClick?(): void;
}

export function Accordion({
  children,
  active,
  onClick,
}: React.PropsWithChildren<IProps>) {
  return (
    <Wrapper onClick={onClick}>
      <Contents>{children}</Contents>
      {active ? <UpIcon /> : <DownIcon />}
    </Wrapper>
  );
}
