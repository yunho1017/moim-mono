import * as React from "react";

import { Wrapper } from "./styled";
import ElementRenderer from "../../elementRenderer";

interface IProps {
  element: Moim.Layout.Navigation.WrapperElementType;
}
export default function WrapperElement({ element }: IProps) {
  const elements = React.useMemo(
    () =>
      element.children.map((child, index) => (
        <ElementRenderer
          key={`child-${element.type}-${index}`}
          element={child}
        />
      )),
    [element],
  );
  return <Wrapper element={element}>{elements}</Wrapper>;
}
