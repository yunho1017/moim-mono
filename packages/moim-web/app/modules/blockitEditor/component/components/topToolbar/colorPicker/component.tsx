import * as React from "react";
import { ThemeContext } from "styled-components";
import { HexColorPicker } from "react-colorful";
import debounce from "lodash/debounce";
import rgb2hex from "rgb2hex";
import { FormattedMessage } from "react-intl";

import ResponsiveMenu from "common/components/responsiveMenu";
import useOpenState from "app/common/hooks/useOpenState";
import {
  Wrapper,
  PresetContainer,
  PresetSampleButton,
  CustomColorBottomContainer,
  ApplyButton,
  CustomColorWrapper,
  ClearButton,
  CustomColorButton,
  HexInput,
  PaperStyle,
} from "./styled";

interface IProps {
  open: boolean;
  initialColor?: string;
  anchorElement?: null | Element | ((element: Element) => Element);
  onApplyClick(color: string): void;
  onClose(): void;
}

const ColorPicker: React.FC<IProps> = ({
  open,
  initialColor,
  anchorElement,
  onApplyClick,
  onClose,
}) => {
  const refAnchor = React.useRef<HTMLDivElement>(null);
  const [color, changeColor] = React.useState(initialColor ?? "#000000");
  const theme = React.useContext(ThemeContext);

  const {
    isOpen: isOpenCustomColor,
    open: openCustomColor,
    close: closeCustomColor,
  } = useOpenState();

  const handleChangeColor = React.useCallback(
    debounce((val: string) => {
      changeColor(val);
    }, 200),
    [],
  );

  const handleCustomColorInput: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      let val = e.currentTarget.value.trim();
      if (val) {
        if (!val.startsWith("#")) {
          val = `#${val}`;
        }
        changeColor(val);
      }
    },
    [],
  );

  const handleClickPresetColor: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    e => {
      if (e.currentTarget.dataset.color) {
        onApplyClick(e.currentTarget.dataset.color);
      }
    },
    [onApplyClick],
  );

  const handleClickCustomColorApply = React.useCallback(() => {
    if (color) {
      onApplyClick(color);
      closeCustomColor();
    }
  }, [color, onApplyClick]);

  const preset = React.useMemo(
    () => ({
      primary: {
        main: rgb2hex(theme.colorV2.primary.main).hex,
        dark: rgb2hex(theme.colorV2.primary.dark).hex,
        light: rgb2hex(theme.colorV2.primary.light).hex,
      },
      secondary: {
        main: rgb2hex(theme.colorV2.secondary.main).hex,
        dark: rgb2hex(theme.colorV2.secondary.dark).hex,
        light: rgb2hex(theme.colorV2.secondary.light).hex,
      },
      fontColor: rgb2hex(theme.colorV2.colorSet.grey800).hex,
    }),
    [
      theme.colorV2.colorSet.grey800,
      theme.colorV2.primary.dark,
      theme.colorV2.primary.light,
      theme.colorV2.primary.main,
      theme.colorV2.secondary.dark,
      theme.colorV2.secondary.light,
      theme.colorV2.secondary.main,
    ],
  );

  React.useLayoutEffect(() => {
    changeColor(initialColor ?? "#000000");
  }, [initialColor]);

  return (
    <>
      <ResponsiveMenu
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        paperOverrideStyle={PaperStyle}
        anchorElement={anchorElement}
        onCloseRequest={onClose}
      >
        <Wrapper ref={refAnchor}>
          <PresetContainer>
            <ClearButton
              key="color-clear"
              data-color="clear"
              title="clear"
              onClick={handleClickPresetColor}
            />
            <PresetSampleButton
              key={`preset-primary-main`}
              data-color={preset.primary.main}
              color={theme.colorV2.primary.main}
              title="primary main"
              onClick={handleClickPresetColor}
            />
            <PresetSampleButton
              key={`preset-primary-light`}
              data-color={preset.primary.light}
              color={theme.colorV2.primary.light}
              title="primary light"
              onClick={handleClickPresetColor}
            />
            <PresetSampleButton
              key={`preset-primary-dark`}
              data-color={preset.primary.dark}
              color={theme.colorV2.primary.dark}
              title="primary dark"
              onClick={handleClickPresetColor}
            />
            <PresetSampleButton
              key={`preset-secondary-main`}
              data-color={preset.secondary.main}
              color={theme.colorV2.secondary.main}
              title="secondary main"
              onClick={handleClickPresetColor}
            />
            <PresetSampleButton
              key={`preset-secondary-light`}
              data-color={preset.secondary.light}
              color={theme.colorV2.secondary.light}
              title="secondary light"
              onClick={handleClickPresetColor}
            />
            <PresetSampleButton
              key={`preset-secondary-dark`}
              data-color={preset.secondary.dark}
              color={theme.colorV2.secondary.dark}
              title="secondary dark"
              onClick={handleClickPresetColor}
            />
            <PresetSampleButton
              key={`preset-font-color`}
              data-color={preset.fontColor}
              color={theme.colorV2.colorSet.grey800}
              title="default font color"
              onClick={handleClickPresetColor}
            />
            <PresetSampleButton
              key={`preset-white`}
              data-color="#ffffff"
              color="#ffffff"
              title="white"
              onClick={handleClickPresetColor}
            />

            <PresetSampleButton
              key={`preset-black`}
              data-color="#000000"
              color="#000000"
              title="white"
              onClick={handleClickPresetColor}
            />

            <CustomColorButton
              key="custom-color"
              title="custom color"
              onClick={openCustomColor}
            />
          </PresetContainer>
        </Wrapper>
      </ResponsiveMenu>
      <ResponsiveMenu
        open={isOpenCustomColor}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        paperOverrideStyle={PaperStyle}
        anchorElement={refAnchor.current}
        onCloseRequest={closeCustomColor}
      >
        <CustomColorWrapper>
          <HexColorPicker color={color} onChange={handleChangeColor} />

          <CustomColorBottomContainer>
            <HexInput
              placeholder="HEX"
              value={color}
              onChange={handleCustomColorInput}
            />
            <ApplyButton onClick={handleClickCustomColorApply}>
              <FormattedMessage id="button_apply" />
            </ApplyButton>
          </CustomColorBottomContainer>
        </CustomColorWrapper>
      </ResponsiveMenu>
    </>
  );
};

export default React.memo(ColorPicker);
