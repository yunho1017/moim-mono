import * as React from "react";
import { Checkbox } from "common/components/designSystem/inputs";
import {
  Wrapper,
  AllSelectContainer,
  AllSelectLabel,
  TextButton,
} from "./styled";

interface IProps {
  isSelectAllChecked?: boolean;
  selectAllLabel: React.ReactNode;
  selectDeleteLabel: React.ReactNode;
  onAllClick(checked: boolean): void;
  onSelectDeleteClick(): void;
}

const HeaderSelectController: React.FC<IProps> = ({
  isSelectAllChecked,
  selectAllLabel,
  selectDeleteLabel,
  onAllClick,
  onSelectDeleteClick,
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      onAllClick(e.currentTarget.checked);
    },
    [onAllClick],
  );
  return (
    <Wrapper>
      <AllSelectContainer>
        <Checkbox
          id="all"
          checked={isSelectAllChecked}
          onChange={handleChange}
        />
        <AllSelectLabel htmlFor="all">{selectAllLabel}</AllSelectLabel>
      </AllSelectContainer>
      <TextButton onClick={onSelectDeleteClick}>{selectDeleteLabel}</TextButton>
    </Wrapper>
  );
};

export default HeaderSelectController;
