import * as React from "react";
import {
  ActionMeta,
  OptionsType,
  OptionTypeBase,
  OptionProps,
  SingleValueProps,
} from "react-select";
import AsyncSelect from "react-select/async";
import { FlattenInterpolation } from "styled-components";
import { useIntl } from "react-intl";
import {
  Wrapper,
  ReactSelectStyleInjector,
  AvatarOption,
  AvatarSingleValue,
  DropdownIndicator,
  UserIconIndicator,
} from "./styled";

export type SearchOptions = (
  inputValue: string,
  callback: (
    options: OptionsType<OptionTypeBase & Moim.Blockit.ISelectOption>,
  ) => void,
) => Promise<any> | void;

interface IProps extends Moim.Blockit.BaseInputBlock {
  id: string;
  name: string;
  hasError?: boolean;
  defaultOptions?: Moim.Blockit.ISelectOption[];
  defaultOption?: Moim.Blockit.ISelectOption;
  wrapperStyle?: FlattenInterpolation<any>;
  indicator?: "dropdown" | "user" | "position";
  optionElement?: {
    Option?: React.ComponentType<OptionProps<any, false>>;
    SingleValue?: React.ComponentType<SingleValueProps<any>>;
  };
  onChange?: Moim.Blockit.IInputBlockChangeEvent;
  onSearchOptions: SearchOptions;
}

// search 가능 모델 추가해야함.
const AsyncSelectBase: React.FC<IProps> = ({
  id,
  name,
  required,
  placeholder,
  defaultOptions,
  defaultOption,
  wrapperStyle,
  indicator = "dropdown",
  hasError,
  optionElement = {
    Option: AvatarOption,
    SingleValue: AvatarSingleValue,
  },
  onChange,
  onSearchOptions,
}) => {
  const intl = useIntl();
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

  const dropdownIndicator = React.useMemo(() => {
    switch (indicator) {
      case "user": {
        return UserIconIndicator;
      }

      default:
      case "dropdown": {
        return DropdownIndicator;
      }
    }
  }, [indicator]);

  const noOptionMessage = React.useCallback(
    () => intl.formatMessage({ id: "no_user_found_message" }),
    [intl],
  );

  React.useLayoutEffect(() => {
    if (defaultOption && inputRef.current) {
      setValue(defaultOption);
      onChange?.(`${defaultOption.value || ""}`, undefined, inputRef.current);
    }
  }, [defaultOption?.value]);

  return (
    <Wrapper overrideStyle={wrapperStyle}>
      <ReactSelectStyleInjector hasError={hasError}>
        <AsyncSelect
          classNamePrefix="rs"
          value={value}
          defaultValue={defaultOption}
          defaultOptions={defaultOptions}
          placeholder={placeholder}
          components={{
            DropdownIndicator: dropdownIndicator,
            ...optionElement,
          }}
          noOptionsMessage={noOptionMessage}
          onChange={handleChange}
          loadOptions={onSearchOptions}
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

export default AsyncSelectBase;
