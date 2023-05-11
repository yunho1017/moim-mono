import * as React from "react";
import { ThemeContext } from "styled-components";
import ClearTextButton from "./clearTextButton";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {
  ClearTextButtonWrapper,
  Wrapper,
  useFocusAnimatedInputStyle,
} from "./stylesComponents";

export interface IInputProps extends React.HTMLProps<HTMLInputElement> {
  title: string;
  onInputTextChange: (text: string) => void;
}

function useFocusAnimatedInput(props: IInputProps) {
  const { onInputTextChange, value } = props;
  const [isFocused, setFocused] = React.useState(false);
  const textInputRef = React.useRef<HTMLInputElement>(null);
  const classes = useFocusAnimatedInputStyle(React.useContext(ThemeContext));

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.currentTarget.value;
      onInputTextChange(text);
    },
    [onInputTextChange],
  );

  const handleClearButtonMouseDown = React.useCallback(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
    onInputTextChange("");
  }, [onInputTextChange]);

  const handleFocused = React.useCallback((event: React.FocusEvent) => {
    setFocused(event.type === "focus");
  }, []);

  const renderTextClearButton = React.useMemo(
    () =>
      value ? (
        <InputAdornment position="end" classes={{ root: classes.deleteButton }}>
          <ClearTextButtonWrapper onMouseDown={handleClearButtonMouseDown}>
            <ClearTextButton />
          </ClearTextButtonWrapper>
        </InputAdornment>
      ) : null,
    [classes.deleteButton, handleClearButtonMouseDown, value],
  );

  return {
    isFocused,
    textInputRef,
    handleInputChange,
    handleClearButtonMouseDown,
    handleFocused,
    renderTextClearButton,
    classes,
  };
}

function FocusAnimatedInput(props: IInputProps) {
  const {
    isFocused,
    classes,
    textInputRef,
    handleFocused,
    handleInputChange,
    renderTextClearButton,
  } = useFocusAnimatedInput(props);
  const { title, onChange, ref, as, onInputTextChange, ...rest } = props;
  return (
    <Wrapper>
      <FormControl classes={{ root: classes.root }}>
        <InputLabel
          shrink={true}
          focused={Boolean(rest.value) || isFocused}
          classes={{
            root: classes.label,
            focused: classes.labelFocused,
            filled: classes.labelFilled,
          }}
        >
          {title}
        </InputLabel>
        <TextField
          onFocus={handleFocused}
          onBlur={handleFocused}
          onChange={handleInputChange}
          InputProps={
            {
              ...rest,
              endAdornment: renderTextClearButton,
              classes: {
                input: classes.input,
                underline: classes.underline,
              },
            } as any
          }
          classes={{ root: classes.input }}
          inputRef={textInputRef}
        />
      </FormControl>
    </Wrapper>
  );
}

export default React.memo(FocusAnimatedInput);
