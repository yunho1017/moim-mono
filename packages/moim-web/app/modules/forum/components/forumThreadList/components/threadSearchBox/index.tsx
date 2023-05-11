import * as React from "react";
import {
  CloseButton,
  CloseIcon,
  Input,
  Label,
  SearchIcon,
  Wrapper,
} from "./styled";

interface IProps {
  onSearch(keyword: string): void;
  onClickClose(): void;
}

const ENTER_KEY_CODE = 13;

function ThreadSearchBox({ onSearch, onClickClose }: IProps) {
  const handleSearchInput = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const key = e.key !== undefined ? e.key : e.keyCode;

      if (key === ENTER_KEY_CODE) {
        onSearch((e.target as HTMLInputElement).value);
      }
    },
    [onSearch],
  );

  return (
    <Wrapper>
      <Label>
        <SearchIcon />
        <Input onKeyUp={handleSearchInput} placeholder="Search forum..." />
      </Label>

      <CloseButton onClick={onClickClose}>
        <CloseIcon />
      </CloseButton>
    </Wrapper>
  );
}

export default React.memo(ThreadSearchBox);
