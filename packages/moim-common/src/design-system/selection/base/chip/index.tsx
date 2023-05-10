import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { IOption } from "../../type";
import {
  SIZE,
  Wrapper,
  OptionLabel,
  IconButton,
  paperStyle,
  PlaceholderSpan,
  DEFAULT_LARGE_ICON_SIZE,
  DEFAULT_SMALL_ICON_SIZE,
  OptionLI,
  Inner,
} from "./styled";

export type IChipOption = Omit<IOption, "prefix" | "suffix" | "chipColor">;

export interface IRef {
  setSelectedItemPosition(position: number): void;
  close(): void;
}

interface IProps {
  id: string;
  size: SIZE;
  options: IChipOption[];
  initialSelectOptionPosition?: number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  overrideWrapperStyle?: FlattenInterpolation<any>;
  overrideInnerWrapperStyle?: FlattenInterpolation<any>;

  onChangeSelect(index: number): void;
  children(
    option: IChipOption,
    checked: boolean,
    index: number
  ): React.ReactChild;
  selectedOptionItemRender?(option: IChipOption): React.ReactNode;
  onOpenOption?(): void;
  onCloseOption?(): void;
}

const ChipSelectionBase = React.forwardRef<IRef, IProps>(
  (
    {
      id,
      size,
      placeholder,
      disabled,
      className,
      initialSelectOptionPosition,
      options,
      overrideWrapperStyle,
      overrideInnerWrapperStyle,
      children,
      onChangeSelect,
      selectedOptionItemRender,
      onOpenOption,
      onCloseOption,
    },
    ref
  ) => {
    const refAnchor = React.useRef<HTMLButtonElement>(null);
    const [selectedPosition, setSelection] = React.useState<number | null>(
      initialSelectOptionPosition ?? null
    );
    const { isOpen, open, close } = useOpenState();

    const handleClose = React.useCallback(() => {
      onCloseOption?.();
      close();
    }, [onCloseOption]);

    const handleOptionClick: React.MouseEventHandler<HTMLLIElement> =
      React.useCallback(
        (e) => {
          const val = e.currentTarget.dataset.position;
          const isDisabled = Boolean(e.currentTarget.dataset.disabled);
          if (val !== undefined && !isDisabled) {
            const position = parseInt(val, 10);
            setSelection(position);
            onChangeSelect(position);
            handleClose();
          }
        },
        [onChangeSelect, handleClose]
      );

    const selectedOption = React.useMemo(() => {
      handleClose();
      if (
        selectedPosition !== null &&
        selectedPosition >= 0 &&
        selectedPosition < options.length
      ) {
        return options[selectedPosition];
      }
      return undefined;
    }, [handleClose, options, selectedPosition]);

    const iconSize = React.useMemo(
      () => (size === "l" ? DEFAULT_LARGE_ICON_SIZE : DEFAULT_SMALL_ICON_SIZE),
      [size]
    );

    const handleClick = React.useCallback(() => {
      if (disabled) return;
      onOpenOption?.();
      open();
    }, [disabled, onOpenOption]);

    const selectOptionElement = React.useMemo(() => {
      if (!selectedOption) {
        return <PlaceholderSpan>{placeholder ?? "- NONE -"}</PlaceholderSpan>;
      }

      if (selectedOptionItemRender) {
        return selectedOptionItemRender(selectedOption);
      }
      return selectedOption.label;
    }, [placeholder, selectedOption, selectedOptionItemRender]);

    React.useEffect(() => {
      if (initialSelectOptionPosition !== undefined) {
        setSelection(initialSelectOptionPosition);
      }
    }, [initialSelectOptionPosition]);

    React.useImperativeHandle(ref, () => ({
      close,
      setSelectedItemPosition: setSelection,
    }));

    return (
      <>
        <Wrapper
          ref={refAnchor}
          size={size}
          disabled={disabled}
          className={className}
          overrideStyle={overrideWrapperStyle}
          tabIndex={-1}
          onClick={handleClick}
        >
          <OptionLabel>{selectOptionElement}</OptionLabel>
          <IconButton open={isOpen} iconSize={iconSize}>
            {/* TODO: (mono) fix here */}
            {/* <ArrowIcon iconSize={iconSize} /> */}
          </IconButton>
        </Wrapper>
        {/* TODO: (mono) fix here */}
        {/* <ResponsiveMenu
          open={isOpen}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          anchorElement={refAnchor.current}
          paperOverrideStyle={paperStyle}
          onCloseRequest={handleClose}
        >
          <Inner overrideStyle={overrideInnerWrapperStyle}>
            {options.map((option, index) => (
              <OptionLI
                key={`${id}_options_${index}`}
                data-position={index}
                data-disabled={option.isDisabled}
                tabIndex={-1}
                onClick={handleOptionClick}
              >
                {children(option, selectedPosition === index, index)}
              </OptionLI>
            ))}
          </Inner>
        </ResponsiveMenu> */}
      </>
    );
  }
);

export default ChipSelectionBase;
function useOpenState(): { isOpen: any; open: any; close: any } {
  throw new Error("Function not implemented.");
}
