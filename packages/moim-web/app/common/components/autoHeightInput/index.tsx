import * as React from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import ReactResizeDetector from "react-resize-detector";
import { px2rem } from "common/helpers/rem";
import { noScrollBarStyle } from "common/components/designSystem/styles";

const TextArea = styled.textarea`
  border: none;
  outline: none;
  resize: none;
  width: 100%;
  height: 100%;
  background-color: transparent;

  ${noScrollBarStyle}

  &::placeholder {
    opacity: 0.4;
  }
`;

interface IProps
  extends Omit<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >,
    "onChange"
  > {
  autoFocus?: boolean;
  onChange?(value: string): void;
  onMaxLength?(): void; // Note: use with maxLength
}

const AutoHeightInput = React.forwardRef<HTMLTextAreaElement | null, IProps>(
  (
    { ref: _ref, style, onChange, autoFocus, onMaxLength, maxLength, ...rest },
    ref,
  ) => {
    const refSelf = React.useRef<HTMLTextAreaElement>(null);
    const [height, setHeight] = React.useState(0);

    const memoizedGetScrollHeight = React.useCallback(
      debounce(() => {
        const target = refSelf.current;
        if (target) {
          setHeight(0);
          setHeight(target.scrollHeight);
        }
      }, 100),
      [refSelf],
    );

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback(
      e => {
        const value = e.currentTarget.value;
        memoizedGetScrollHeight();

        if (maxLength) {
          if (value.length > maxLength) {
            onMaxLength?.();
            return;
          }
        }
        onChange?.(value);
      },
      [maxLength, memoizedGetScrollHeight, onChange, onMaxLength],
    );

    const newStyle = React.useMemo(
      () => ({
        ...style,
        height: Boolean(height) ? px2rem(height) : undefined,
      }),
      [height, style],
    );

    const handleResize = React.useCallback(() => {
      memoizedGetScrollHeight();
    }, [memoizedGetScrollHeight]);

    React.useImperativeHandle<
      HTMLTextAreaElement | null,
      HTMLTextAreaElement | null
    >(ref, () => refSelf.current);

    React.useLayoutEffect(() => {
      if (autoFocus) {
        refSelf.current?.focus();
      }
      memoizedGetScrollHeight();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <ReactResizeDetector handleWidth={true} onResize={handleResize}>
        <TextArea
          ref={refSelf}
          style={newStyle}
          onChange={handleChange}
          {...rest}
        />
      </ReactResizeDetector>
    );
  },
);

export default AutoHeightInput;
