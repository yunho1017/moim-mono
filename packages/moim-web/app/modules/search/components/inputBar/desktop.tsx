import * as React from "react";
import keycode from "keycode";
import { useIntl, FormattedMessage } from "react-intl";
import {
  Container,
  FocuseControlWrapper,
  Wrapper,
  SearchIcon,
  Input,
  RemoveIcon,
  SuggestionContainer,
  SearchGo,
  SearchKeyword,
  PrimaryColorSearchIcon,
} from "./styled";

interface IProps {
  value?: string;
  elementPaletteProps?: Moim.Theme.CommonElementThemePaletteProps;
  onChange?(value: string): void;
  onEnter?(): void;
}

const SearchInputBar: React.FC<IProps> = ({
  value = "",
  elementPaletteProps: elementPalettePropsBase,
  onChange,
  onEnter,
}) => {
  const refInput = React.useRef<HTMLInputElement>(null);
  const [focused, setFocus] = React.useState(false);
  const intl = useIntl();

  const elementPaletteProps = React.useMemo(
    () => (focused ? undefined : elementPalettePropsBase),
    [elementPalettePropsBase, focused],
  );

  const handleFocus = React.useCallback(() => {
    setFocus(true);
  }, []);
  const handleBlur = React.useCallback(() => {
    setFocus(false);
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      onChange?.(e.currentTarget.value);
    },
    [onChange],
  );

  const handleRemoveKeyword = React.useCallback(() => {
    onChange?.("");
  }, [onChange]);

  const handleClickWrapper = React.useCallback(() => {
    refInput.current?.focus();
  }, []);

  const handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      if (e.keyCode === keycode("enter")) {
        onEnter?.();
      }
    },
    [onEnter],
  );

  const suggestionElement = React.useMemo(
    () =>
      focused && (
        <SuggestionContainer>
          <SearchGo role="button" onClick={onEnter}>
            <SearchKeyword>
              <FormattedMessage
                id="search/searching"
                values={{ keyword: value }}
              />
            </SearchKeyword>
            <PrimaryColorSearchIcon />
          </SearchGo>
        </SuggestionContainer>
      ),
    [focused, onEnter, value],
  );

  return (
    <Container>
      <Wrapper
        data-focused={focused}
        elementPaletteProps={elementPaletteProps}
        onClick={handleClickWrapper}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <SearchIcon elementPaletteProps={elementPaletteProps} />
        <Input
          readOnly={!focused}
          autoFocus={focused}
          value={value}
          elementPaletteProps={elementPaletteProps}
          placeholder={intl.formatMessage({ id: "search/placeholder" })}
          onChange={handleChange}
          onKeyDown={handleKeydown}
        />
        {value.length > 0 && (
          <RemoveIcon
            elementPaletteProps={elementPaletteProps}
            onClick={handleRemoveKeyword}
          />
        )}
      </Wrapper>
      <FocuseControlWrapper focused={focused}>
        {suggestionElement}
      </FocuseControlWrapper>
    </Container>
  );
};

export default SearchInputBar;
