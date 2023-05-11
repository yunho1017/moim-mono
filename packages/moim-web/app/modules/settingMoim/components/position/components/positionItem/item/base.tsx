import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { Color, Name, RightContent, Wrapper } from "../styled";

interface IProps {
  positionId: Moim.Id;
  name: string;
  color: string;
  overrideWrapperStyled?: FlattenInterpolation<any>;
  selected?: boolean;
  onClick?: (positionId: Moim.Id) => void;
  rightContent?: React.ReactElement;
}

function PositionItemBase(props: IProps) {
  const {
    positionId,
    name,
    color,
    overrideWrapperStyled,
    selected,
    onClick,
    rightContent,
  } = props;

  const handleClickPositionItem = React.useCallback(() => {
    onClick?.(positionId);
  }, [onClick, positionId]);

  return (
    <Wrapper
      role="button"
      selected={selected}
      overrideStyled={overrideWrapperStyled}
      onClick={handleClickPositionItem}
    >
      <Color color={color} />
      <Name>
        <ShavedText value={<NativeEmojiSafeText value={name} />} line={2} />
      </Name>
      {rightContent && <RightContent>{rightContent}</RightContent>}
    </Wrapper>
  );
}

export default PositionItemBase;
