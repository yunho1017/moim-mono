import * as React from "react";
import {
  Popover,
  SmallDropDownInputWrapper,
  SmallOptionLabel,
  CollapseIconButton,
  ArrowIcon,
} from "./styled";
import BottomSheet from "../bottomSheet";
import ResponsiveMenu from "../responsiveMenu";
import {
  MenuItem as MenuItemComponent,
  MenuWrapper,
} from "../responsiveMenu/components/menu";

import useIsMobile from "common/hooks/useIsMobile";

type DropDownProps = React.PropsWithChildren<
  React.ComponentProps<typeof BottomSheet> &
    React.ComponentProps<typeof Popover>
>;
export default function Dropdown({
  children,
  anchorEl,
  onCloseRequest,
  ...props
}: DropDownProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <BottomSheet onCloseRequest={onCloseRequest} {...props}>
        {children}
      </BottomSheet>
    );
  }

  return (
    <Popover
      open={props.open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={onCloseRequest}
    >
      {children}
    </Popover>
  );
}

function MenuItem<T>({
  value,
  onChange,
  children,
}: React.PropsWithChildren<{
  value: T;
  onChange(option: T): void;
}>) {
  const handleClick = React.useCallback(() => {
    onChange(value);
  }, [onChange, value]);

  return (
    <MenuItemComponent onClick={handleClick}>{children}</MenuItemComponent>
  );
}

interface ISmallDropDownProps<T> {
  options: { value: T; children?: React.ReactNode }[];
  selectedOption: React.ReactNode;
  disableDropDown?: boolean;
  onChange(option: T): void;
}
export function SmallDropDownInput<T>({
  options,
  selectedOption,
  disableDropDown = false,
  onChange,
}: ISmallDropDownProps<T>) {
  const refThis = React.useRef<HTMLDivElement>(null);
  const [open, setOpenStatus] = React.useState<boolean>(false);
  const handleTogglePopover = React.useCallback(() => {
    if (!disableDropDown && options) {
      setOpenStatus(!open);
    }
  }, [disableDropDown, open, options]);
  const handleClosePopover = React.useCallback(() => {
    setOpenStatus(false);
  }, []);

  const optionElement = React.useMemo(
    () => (
      <SmallOptionLabel>
        {selectedOption}
        <ResponsiveMenu
          open={open}
          anchorElement={refThis.current}
          onCloseRequest={handleClosePopover}
        >
          <MenuWrapper>
            {options.map(item => (
              <MenuItem<T>
                key={`${item.value}`}
                value={item.value}
                onChange={onChange}
              >
                {item.children ?? item.value}
              </MenuItem>
            ))}
          </MenuWrapper>
        </ResponsiveMenu>
      </SmallOptionLabel>
    ),
    [handleClosePopover, onChange, open, options, selectedOption],
  );

  return (
    <SmallDropDownInputWrapper
      role="button"
      ref={refThis}
      onClick={handleTogglePopover}
    >
      {optionElement}
      <CollapseIconButton open={open}>
        {!disableDropDown && <ArrowIcon />}
      </CollapseIconButton>
    </SmallDropDownInputWrapper>
  );
}
