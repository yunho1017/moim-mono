import * as React from "react";
import { Droppable as DroppableBase } from "react-beautiful-dnd";

import { Wrapper } from "./styled";

type PropsType = React.PropsWithChildren<
  Omit<React.ComponentProps<typeof DroppableBase>, "children">
>;

const Droppable: React.FC<PropsType> = ({ children, ...props }) => (
  <DroppableBase {...props}>
    {provided => (
      <Wrapper ref={ref => provided.innerRef(ref)}>
        {children}
        {provided.placeholder}
      </Wrapper>
    )}
  </DroppableBase>
);

export default Droppable;
