import * as React from "react";
import {
  Wrapper,
  Input,
  SearchIconWrapper,
  SearchIcon,
  SelectedList,
  InputWrapper,
  SelectedListScrollSection,
} from "./styled";
import { ISelectedData } from "./type";
import RemovableChip from "common/components/removableChip";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  selected: ISelectedData[];
  labelFor?: string;
  selectedListRef?: React.Ref<HTMLDivElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSelectedItem?: (id: Moim.Id) => void;
  onClickSelectedItemRemoveButton?: (id: Moim.Id) => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, IProps>(
  (props, inputRef) => {
    const {
      selectedListRef,
      selected,
      labelFor,
      onClickSelectedItem,
      onClickSelectedItemRemoveButton,
      ...rest
    } = props;

    const selectedList = React.useMemo(
      () =>
        selected.length > 0 && (
          <SelectedList>
            {selected.map(selectData => (
              <SelectItem
                key={selectData.id}
                selectData={selectData}
                onClickSelectedItem={onClickSelectedItem}
                onClickSelectedItemRemoveButton={
                  onClickSelectedItemRemoveButton
                }
              />
            ))}
          </SelectedList>
        ),
      [selected, onClickSelectedItem, onClickSelectedItemRemoveButton],
    );

    return (
      <Wrapper htmlFor={labelFor}>
        <InputWrapper>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <Input {...rest} ref={inputRef} />
        </InputWrapper>
        <SelectedListScrollSection ref={selectedListRef}>
          {selectedList}
        </SelectedListScrollSection>
      </Wrapper>
    );
  },
);

function SelectItem({
  selectData,
  onClickSelectedItem,
  onClickSelectedItemRemoveButton,
}: {
  selectData: ISelectedData;
  onClickSelectedItem?: (id: Moim.Id) => void;
  onClickSelectedItemRemoveButton?: (id: Moim.Id) => void;
}) {
  return (
    <RemovableChip
      id={selectData.id}
      name={selectData.name}
      image={selectData.image}
      onClick={onClickSelectedItem}
      onClickRemoveButton={onClickSelectedItemRemoveButton}
    />
  );
}

export default SearchInput;
