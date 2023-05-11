import * as React from "react";
import { Caret, Check } from "amazon-chime-sdk-component-library-react";
import {
  Wrapper,
  IconBox,
  IconButton,
  MoreButton,
  Label,
  OptionPopover,
  OptionContainer,
} from "./styled";

interface IProps {
  icon: React.ReactNode;
  label: string | React.ReactNode;
  options?: {
    checked?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?(): void;
  }[];
  onClick(): void;
}

const ControlBarButton: React.FC<IProps> = ({
  icon,
  label,
  options,
  onClick,
}) => {
  const [optionsOpen, setOptionsOpen] = React.useState(false);
  const refAnchor = React.useRef<HTMLButtonElement>(null);
  const openOptions = React.useCallback(() => {
    setOptionsOpen(true);
  }, []);
  const closeOptions = React.useCallback(() => {
    setOptionsOpen(false);
  }, []);

  const optionElements = React.useMemo(
    () =>
      (options || []).map(opt => {
        const handleClick = () => {
          opt.onClick?.();
          closeOptions();
        };
        return (
          <li>
            {opt.checked && (
              <Check className="ch-check" data-testid="popover-check" />
            )}
            <button className="content" onClick={handleClick}>
              {opt.children}
            </button>
          </li>
        );
      }),
    [closeOptions, options],
  );

  return (
    <>
      <Wrapper data-testid="control-bar-item">
        <IconBox>
          <IconButton onClick={onClick} data-testid="button">
            <span className="ch-icon">{icon}</span>
            <span className="ch-label">{label}</span>
          </IconButton>
        </IconBox>
        {options && (
          <MoreButton>
            <IconButton ref={refAnchor} onClick={openOptions}>
              <span className="ch-icon">
                <Caret direction="up" data-testid="control-bar-item-caret" />
              </span>
            </IconButton>
          </MoreButton>
        )}
        <Label>{label}</Label>
      </Wrapper>
      <OptionPopover
        open={optionsOpen}
        anchorEl={refAnchor.current}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={closeOptions}
      >
        <OptionContainer>{optionElements}</OptionContainer>
      </OptionPopover>
    </>
  );
};

export default ControlBarButton;
