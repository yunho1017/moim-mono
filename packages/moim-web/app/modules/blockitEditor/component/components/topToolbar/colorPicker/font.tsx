import * as React from "react";
import useOpenState from "common/hooks/useOpenState";
import ColorPicker from "./component";
import { RootContainButton, FontColorIcon } from "./styled";

interface IProps {
  color?: string;
  disabled?: boolean;
  className?: string;
  onChangeColor(color: string): void;
  onEditorFocus(): void;
}

const FontColorPicker: React.FC<IProps> = ({
  color: initialColor,
  disabled,
  className,
  onChangeColor,
  onEditorFocus,
}) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const { isOpen, open, close } = useOpenState();

  const handleClose = React.useCallback(() => {
    close();
    onEditorFocus();
  }, [close]);

  const handleApplyClick = React.useCallback(
    (color: string) => {
      handleClose();
      onChangeColor(color);
    },
    [handleClose, onChangeColor],
  );

  const handleOpenClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(() => {
    if (!disabled) {
      open();
      onEditorFocus();
    }
  }, [disabled, onEditorFocus]);

  return (
    <>
      <RootContainButton
        ref={ref}
        className={className}
        inactive={disabled}
        disabled={disabled}
        color={initialColor}
        onClick={handleOpenClick}
      >
        <FontColorIcon />
      </RootContainButton>
      <ColorPicker
        anchorElement={ref.current}
        open={isOpen}
        initialColor={initialColor}
        onClose={handleClose}
        onApplyClick={handleApplyClick}
      />
    </>
  );
};

export default React.memo(FontColorPicker);
