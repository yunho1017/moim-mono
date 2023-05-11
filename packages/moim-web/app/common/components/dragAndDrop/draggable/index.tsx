import * as React from "react";
import { Draggable as DraggableBase } from "react-beautiful-dnd";
import { getDraggableStyle } from "../helper";

import { Wrapper } from "./styled";

interface IProps
  extends Omit<React.ComponentProps<typeof DraggableBase>, "children"> {
  children(
    draggableProps: React.HTMLProps<HTMLDivElement>,
    isDragging: boolean,
  ): React.ReactNode;
}

const Draggable: React.FC<IProps> = ({ children, ...props }) => (
  <DraggableBase {...props}>
    {(provided, snapshot) => (
      <Wrapper
        ref={ref => provided.innerRef(ref)}
        {...provided.draggableProps}
        draggingStyle={getDraggableStyle(snapshot.isDragging)}
      >
        {children({ ...provided.dragHandleProps }, snapshot.isDragging)}
      </Wrapper>
    )}
  </DraggableBase>
);

export default Draggable;
