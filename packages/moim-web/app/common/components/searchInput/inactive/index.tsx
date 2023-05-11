import * as React from "react";
import { Wrapper, Input, SearchIcon, SearchIconWrapper } from "./styled";

export default function SearchInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <Wrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Input {...props} />
    </Wrapper>
  );
}
