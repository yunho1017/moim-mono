import * as React from "react";
import { Wrapper, NonClickBlur } from "./styled";

export default function NonClickWrapper({
  children,
  condition = true,
}: {
  children: React.ReactElement;
  condition?: boolean;
}) {
  const onClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      e.stopPropagation();
      e.preventDefault();
    },
    [],
  );
  return condition ? (
    <Wrapper>
      {children}
      <NonClickBlur onClick={onClick} />
    </Wrapper>
  ) : (
    children
  );
}
