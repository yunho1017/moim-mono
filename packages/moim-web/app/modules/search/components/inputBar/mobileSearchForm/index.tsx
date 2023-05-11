import * as React from "react";
import keycode from "keycode";
import { useIntl } from "react-intl";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import AppBar from "common/components/appBar";
import {
  Dialog,
  Wrapper,
  StickyWrapper,
  CloseButton,
  Rights,
  InputContainerDivider,
  InputContainer,
  MobileSearchIcon,
  Input,
} from "./styled";
import SearchBlockitRenderer from "./components/searchBlockitRenderer";
import { Spacer } from "common/components/designSystem/spacer";
import { DefaultDivider } from "common/components/divider";

interface IProps {
  open: boolean;
  value?: string;
  onChange?(value: string): void;
  onEnter?(): void;
  onClose?(): void;
}

const Transition = React.forwardRef<
  any,
  TransitionProps & { children?: React.ReactElement<any, any> }
>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const MobileSearchForm: React.FC<IProps> = ({
  open,
  value,
  onChange,
  onEnter,
  onClose,
}) => {
  const refInput = React.useRef<HTMLInputElement>(null);
  const intl = useIntl();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      onChange?.(e.currentTarget.value);
    },
    [onChange],
  );
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

  const handleClose = React.useCallback(() => {
    onClose?.();
  }, [onClose]);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      fullScreen={true}
      fullWidth={true}
      onClose={handleClose}
    >
      <Wrapper>
        <StickyWrapper>
          <AppBar
            titleAlignment="Center"
            rightButton={
              <Rights>
                <CloseButton onClick={handleClose} />
              </Rights>
            }
          />
          <DefaultDivider />
          <InputContainer>
            <MobileSearchIcon role="button" onClick={handleClickWrapper} />
            <Input
              ref={refInput}
              autoFocus={true}
              value={value}
              placeholder={intl.formatMessage({ id: "search/placeholder" })}
              onChange={handleChange}
              onKeyDown={handleKeydown}
            />
          </InputContainer>
        </StickyWrapper>
        <InputContainerDivider />
        <Spacer value={8} />
        <SearchBlockitRenderer onClose={onClose} />
      </Wrapper>
    </Dialog>
  );
};

export default MobileSearchForm;
