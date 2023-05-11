import * as React from "react";
import { Item, ItemButton } from "./styled";
import { Data } from "../../types";

interface IProps {
  data: Data;
  onClick: (value: Data) => void;
}

function MenuItem({ data, onClick }: IProps) {
  const handleClick = React.useCallback(() => {
    onClick(data);
  }, [data.value, onClick]);

  return (
    <Item key={data.text} onClick={handleClick}>
      <ItemButton>{data.text}</ItemButton>
    </Item>
  );
}

export default MenuItem;
