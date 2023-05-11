import * as React from "react";
import { Wrapper, Name, RemoveButton } from "./styled";
import UserProfileImage from "common/components/userProfileImage";
import ShavedText from "common/components/shavedText";

interface IProps {
  id: Moim.Id;
  name: string;
  onClick?: (id: Moim.Id) => void;
  onClickRemoveButton?: (id: Moim.Id) => void;
  image?: string;
}

function RemovableChip(props: IProps) {
  const { id, name, image, onClick, onClickRemoveButton } = props;

  const handleClick = React.useCallback(() => {
    onClick?.(id);
  }, [onClick, id]);

  const handleClickRemoveButton: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      e.stopPropagation();
      onClickRemoveButton?.(id);
    },
    [onClickRemoveButton, id],
  );

  return (
    <Wrapper onClick={handleClick}>
      <UserProfileImage src={image} size="xs" />
      <Name>
        <ShavedText value={name} line={1} />
      </Name>
      <RemoveButton onClick={handleClickRemoveButton} />
    </Wrapper>
  );
}

export default RemovableChip;
