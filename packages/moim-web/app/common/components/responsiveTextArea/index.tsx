// vendor
import * as React from "react";
import styled, { FlattenInterpolation } from "styled-components";
// helper
import { isBrowser } from "common/helpers/envChecker";

interface IProps {
  content?: string | string[] | number;
  id?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  placeholder?: string;
  readOnly?: boolean;
  maxLength?: number;
  tabIndex?: number;
  styles?: FlattenInterpolation<any>;
  onContentChange?(value: any): void;
  onClick?(): void;
  onFocus?(): void;
  onBlur?(): void;
  onEnter?(): "handled" | "not-handled";
}

export const TextArea = styled.textarea<{
  textAreaStyle?: FlattenInterpolation<any>;
}>`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  cursor: text;
  outline: none;
  ${props => props.textAreaStyle}
`;

interface IState {
  text: string | string[] | number;
}

class ResponsiveTextArea extends React.PureComponent<IProps, IState> {
  public readonly state: IState = {
    text: this.props.content || "",
  };
  private readonly textareaRef = React.createRef<HTMLTextAreaElement>();

  public componentDidMount() {
    if (isBrowser()) {
      requestAnimationFrame(() => {
        this.dynamicHeightChange();
      });
    }
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.content !== this.props.content) {
      this.setState({
        text: this.props.content ?? "",
      });
    }

    this.dynamicHeightChange();
  }

  public render() {
    const {
      className: addedClassName,
      content,
      placeholder,
      readOnly,
      maxLength,
      onContentChange: _onContentChange,
      onEnter: _onEnter,
      styles,
      ...props
    } = this.props;

    return (
      <TextArea
        className={addedClassName}
        ref={this.textareaRef}
        placeholder={placeholder}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
        maxLength={maxLength}
        value={this.state.text}
        readOnly={Boolean(readOnly)}
        textAreaStyle={styles}
        {...props}
      />
    );
  }

  public readonly focus = () => {
    if (this.textareaRef.current) {
      this.textareaRef.current.focus();
    }
  };

  public readonly blur = () => {
    if (this.textareaRef.current) {
      this.textareaRef.current.blur();
    }
  };

  public readonly setValue = (value: string) => {
    this.setState({
      text: value,
    });
  };

  private readonly onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    this.setState({
      text,
    });
    this.props.onContentChange?.(text);
    this.dynamicHeightChange();
  };

  private readonly onKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (
      e.keyCode === 13 &&
      this.props.onEnter &&
      this.props.onEnter() === "handled"
    ) {
      // enter
      e.preventDefault();
      return;
    }
  };

  private readonly dynamicHeightChange = () => {
    const node = this.textareaRef.current;
    if (!node) return;
    node.style.height = "1px";
    node.style.height = `${node.scrollHeight}px`;
  };
}

export default ResponsiveTextArea;
