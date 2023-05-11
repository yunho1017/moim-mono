import * as React from "react";
import PositionItemBase from "./base";
import {
  DownArrowButton,
  UpArrowButton,
  WrapperWithHoverStyle,
} from "../styled";

interface IProps
  extends Omit<React.ComponentProps<typeof PositionItemBase>, "rightContent"> {
  onClickUpButton: (positionId: Moim.Id) => void;
  onClickDownButton: (positionId: Moim.Id) => void;
}

function PositionEditItem(props: IProps) {
  const positionId = props.positionId;
  const { onClickUpButton, onClickDownButton, ...rest } = props;

  const handleClickUpButton = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onClickUpButton(positionId);
    },
    [positionId, onClickUpButton],
  );

  const handleClickDownButton = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onClickDownButton(positionId);
    },
    [positionId, onClickDownButton],
  );

  return (
    <PositionItemBase
      {...rest}
      rightContent={
        <>
          <WrapperWithHoverStyle>
            <DownArrowButton onClick={handleClickDownButton} />
          </WrapperWithHoverStyle>
          <WrapperWithHoverStyle>
            <UpArrowButton onClick={handleClickUpButton} />
          </WrapperWithHoverStyle>
        </>
      }
    />
  );
}

export default PositionEditItem;
