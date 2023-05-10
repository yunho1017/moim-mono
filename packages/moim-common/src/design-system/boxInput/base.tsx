import * as React from "react";
import styled, { FlattenInterpolation } from "styled-components";
import {
  Wrapper,
  BoxInputWrapper,
  TextInput,
  textareaStyle,
  BoxInputRight,
  HelperText,
} from "./styled";
import { BoxInputSizeType, BoxInputType, InputStatusType } from "./type";
import { B4Regular, B1Regular } from "../typos";

interface IProps {
  tabIndex?: number;
  autoFocus?: boolean;
  value?: string | string[] | number;
  placeholder?: string;
  status?: InputStatusType;
  size?: BoxInputSizeType;
  helperText?: React.ReactNode;
  disabled?: boolean;
  readonly?: boolean;
  type?: string;
  suffix?:
    | {
        type: "characters";
        maxCount: number;
      }
    | {
        type: "text";
        text: React.ReactNode;
      };
  wrapperStyle?: FlattenInterpolation<any>;
  onChange?(value: any): void;
  onClick?(): void;
}

interface IState {
  status: InputStatusType;
}

const TextArea = styled.textarea<{
  textAreaStyle?: FlattenInterpolation<any>;
}>`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  cursor: text;
  outline: none;
  ${(props) => props.textAreaStyle}
`;

export default class BoxInputBase extends React.PureComponent<IProps, IState> {
  public state: IState = {
    status: "Inactive",
  };
  protected inputType: BoxInputType = "SingleLine";
  private inputRef: HTMLInputElement | HTMLTextAreaElement | null = null;

  public componentDidMount() {
    if (this.props.status) {
      this.setState({ status: this.props.status });
    }
  }

  public componentDidUpdate(prevProps: IProps) {
    const { status } = this.props;
    if (status && status !== prevProps.status) {
      this.setState({ status });
    }
  }

  public render() {
    const {
      size = "Small",
      helperText,
      disabled = false,
      wrapperStyle,
    } = this.props;
    const { status } = this.state;

    return (
      <Wrapper status={status}>
        <BoxInputWrapper
          size={size}
          type={this.inputType}
          disabled={disabled}
          overrideStyle={wrapperStyle}
        >
          {this.renderTextInput()}
          <BoxInputRight>{this.renderSuffix()}</BoxInputRight>
        </BoxInputWrapper>
        {helperText && <HelperText> {helperText}</HelperText>}
      </Wrapper>
    );
  }

  public readonly focusInput = () => {
    this.inputRef?.focus();
  };

  private readonly renderTextInput = () => {
    const {
      value,
      placeholder,
      tabIndex,
      disabled = false,
      readonly,
      suffix,
      autoFocus,
      type = "text",
      onChange,
      onClick,
    } = this.props;
    if (this.inputType === "SingleLine") {
      return (
        <TextInput
          ref={(e) => {
            this.inputRef = e;
          }}
          type={type}
          tabIndex={tabIndex}
          value={value}
          autoFocus={autoFocus}
          placeholder={placeholder}
          readOnly={readonly || disabled}
          onChange={this.handleChange}
          onFocus={this.handleFocusInput}
          onBlur={this.handleBlurInput}
          onClick={onClick}
        />
      );
    }

    return (
      <TextArea
        ref={(e) => {
          this.inputRef = e;
        }}
        tabIndex={tabIndex}
        value={value}
        autoFocus={autoFocus}
        placeholder={placeholder}
        readOnly={disabled}
        maxLength={suffix?.type === "characters" ? suffix.maxCount : undefined}
        onClick={onClick}
        onChange={(e) => onChange?.(e.currentTarget.value)}
        onFocus={this.handleFocusInput}
        onBlur={this.handleBlurInput}
        textAreaStyle={textareaStyle}
      />
    );
  };

  private readonly renderSuffix = () => {
    const { value, suffix } = this.props;
    if (!suffix || value === undefined) {
      return null;
    }

    switch (suffix.type) {
      case "characters":
        return (
          <B4Regular>{`${`${value}`.length}/${suffix.maxCount}`}</B4Regular>
        );
      case "text":
        return <B1Regular>{suffix.text}</B1Regular>;
    }
  };

  private readonly handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (!this.props.disabled) {
      this.props.onChange?.(e.target.value);
    }
  };

  private readonly handleFocusInput = () => {
    const { disabled = false } = this.props;
    const { status } = this.state;
    if (!disabled && status === "Inactive") {
      this.setState({ status: "Focused" });
    }
  };

  private readonly handleBlurInput = () => {
    const { disabled = false } = this.props;
    const { status } = this.state;
    if (!disabled && status === "Focused") {
      this.setState({ status: "Inactive" });
    }
  };
}
