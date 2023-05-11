import * as React from "react";
import CurrentColor from "./components/CurrentColor";
import BottomSheet from "common/components/bottomSheet";
import { useEffects, useHandlers, useProps } from "./hooks";
import ColorSelector from "./components/colorSelector";
import { DialogColorSelectorWrapper } from "./styled";

export interface IProps {
  colorSet: string[];
  onChange: (color: string) => void;
  selectedColor?: string;
}

function ColorPalette(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  useEffects(hookProps);

  const {
    isMobile,
    colorSet,
    selectedColor,
    isOpenColorDialog,
    dialogHeight,
    colorDialogGridWrapperRef,
  } = hookProps;
  const {
    handleClickCurrentColor,
    handleCloseColorDialog,
    handleClickColor,
    handleClickDialogColor,
  } = hookHandlers;

  return isMobile ? (
    <>
      <CurrentColor color={selectedColor} onClick={handleClickCurrentColor} />
      <BottomSheet
        open={isOpenColorDialog}
        minHeight={dialogHeight}
        onCloseRequest={handleCloseColorDialog}
      >
        <DialogColorSelectorWrapper ref={colorDialogGridWrapperRef}>
          <ColorSelector
            colorSet={colorSet}
            selectedColor={selectedColor}
            onClickColor={handleClickDialogColor}
          />
        </DialogColorSelectorWrapper>
      </BottomSheet>
    </>
  ) : (
    <ColorSelector
      colorSet={colorSet}
      selectedColor={selectedColor}
      onClickColor={handleClickColor}
    />
  );
}

export default ColorPalette;
