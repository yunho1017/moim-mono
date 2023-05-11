import * as React from "react";

import { BaseItemCell } from "common/components/itemCell";
import ShavedText from "common/components/shavedText";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import Draggable from "common/components/dragAndDrop/draggable";
import DragButton from "common/components/dragAndDrop/dragButton";

import {
  PinnedIcon,
  UnPinnedIcon,
  Title,
  ButtonWrapper,
  Wrapper,
} from "./styled";

interface IProps {
  index: number;
  id: Moim.Id;
  title: Moim.Id;
  pinned: boolean;
  onPin(id: Moim.Id): void;
  onUnPin(id: Moim.Id): void;
}

export default function PinnedItem({
  index,
  id,
  title,
  pinned,
  onPin,
  onUnPin,
}: IProps) {
  const handleClickPinButton = React.useCallback(() => {
    if (pinned) {
      onUnPin(id);
    } else {
      onPin(id);
    }
  }, [id, onPin, onUnPin, pinned]);
  const pinButtonElement = React.useMemo(() => {
    if (pinned) {
      return <PinnedIcon onClick={handleClickPinButton} />;
    }
    return <UnPinnedIcon onClick={handleClickPinButton} />;
  }, [handleClickPinButton, pinned]);

  return (
    <Draggable key={id} index={index} draggableId={id}>
      {(draggableProps: React.HTMLProps<HTMLDivElement>) => (
        <Wrapper>
          <BaseItemCell
            size="xs"
            title={
              <Title>
                <ShavedText
                  line={1}
                  value={<NativeEmojiSafeText value={title} />}
                />
              </Title>
            }
            rightElement={
              <ButtonWrapper>
                {pinButtonElement}
                <DragButton {...draggableProps} draggable={true} />
              </ButtonWrapper>
            }
            disableRightPadding={true}
          />
        </Wrapper>
      )}
    </Draggable>
  );
}
