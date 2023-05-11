import * as React from "react";
import Select, {
  ActionMeta,
  OptionProps,
  SingleValueProps,
} from "react-select";
import { FlattenInterpolation } from "styled-components";
import {
  Wrapper,
  ReactSelectStyleInjector,
  DropdownIndicator,
  SimpleOption,
  SingleValue,
} from "./styled";

interface IProps extends Moim.Blockit.BaseInputBlock {
  id: string;
  name: string;
  options: Moim.Blockit.ISelectOption[];
  defaultOption?: Moim.Blockit.ISelectOption;
  wrapperStyle?: FlattenInterpolation<any>;
  hasError?: boolean;
  optionElement?: {
    Option?: React.ComponentType<OptionProps<any, false>>;
    SingleValue?: React.ComponentType<SingleValueProps<any>>;
  };
  onChange?: Moim.Blockit.IInputBlockChangeEvent;
}

// search 가능 모델 추가해야함.
const SelectBase: React.FC<IProps> = ({
  id,
  name,
  required,
  placeholder,
  defaultOption,
  options,
  wrapperStyle,
  hasError,
  optionElement = {
    Option: SimpleOption,
    SingleValue,
  },
  onChange,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState<
    Moim.Blockit.ISelectOption | undefined
  >(undefined);
  const hasItem = React.useMemo(() => Boolean(value), [value]);

  const handleChange = React.useCallback(
    (option: any, _actionMeta: ActionMeta<any>) => {
      setValue(option);

      if (onChange && inputRef.current) {
        onChange(
          `${option?.value || ""}`,
          Boolean(option) ? undefined : "option not selected",
          inputRef.current,
        );
      }
    },
    [onChange, inputRef],
  );

  React.useLayoutEffect(() => {
    if (defaultOption && inputRef.current) {
      setValue(defaultOption);
      onChange?.(`${defaultOption.value || ""}`, undefined, inputRef.current);
    }
  }, [defaultOption, onChange]);

  return (
    <Wrapper overrideStyle={wrapperStyle}>
      <ReactSelectStyleInjector hasError={hasError}>
        <Select
          classNamePrefix="rs"
          defaultValue={defaultOption}
          options={options}
          placeholder={placeholder}
          components={{
            DropdownIndicator,
            ...optionElement,
          }}
          onChange={handleChange}
        />
        <input
          ref={inputRef}
          type="hidden"
          hidden={true}
          id={id}
          name={name}
          value={value?.value}
          required={required}
          data-invalid={!hasItem}
        />
      </ReactSelectStyleInjector>
    </Wrapper>
  );
};

export { default as AsyncSelectBase, SearchOptions } from "./asynSelect";
export default SelectBase;
