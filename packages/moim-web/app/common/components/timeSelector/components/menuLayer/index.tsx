import * as React from "react";
import { Layer, List } from "./styled";
import { Data } from "../../types";
import MenuItem from "common/components/timeSelector/components/menuItem";

interface IMenuLayerProps {
  dataList: Data[];
  isOpen: boolean;
  onClickItem: (value: Data) => void;
  close: () => void;
  layerStyle?: React.CSSProperties;
  layerRef?: (element: HTMLElement | null) => void;
}

function MenuLayer({
  layerStyle,
  layerRef,
  isOpen,
  dataList,
  onClickItem,
  close,
}: IMenuLayerProps) {
  const handleClick = React.useCallback(
    (value: Data) => {
      close();
      onClickItem(value);
    },
    [onClickItem, close],
  );

  return isOpen ? (
    <Layer style={layerStyle} ref={layerRef}>
      <List>
        {dataList.map(data => (
          <MenuItem key={data.text} data={data} onClick={handleClick} />
        ))}
      </List>
    </Layer>
  ) : null;
}

export default MenuLayer;
