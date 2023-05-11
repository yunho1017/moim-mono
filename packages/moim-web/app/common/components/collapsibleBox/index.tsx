import * as React from "react";
import { FlattenInterpolation } from "styled-components";
import { CSSTransition } from "react-transition-group";
import ResponsiveMenu from "common/components/responsiveMenu";
import {
  MenuWrapper,
  MenuItem,
} from "common/components/responsiveMenu/components/menu";

import {
  BoxWrapper,
  HeaderContainer,
  TitleHeaderContainer,
  SubTitleHeaderContainer,
  TitleWrapper,
  BodyContainer,
  RightContainer,
  ArrowIcon,
  CollapseIconButton,
  OptionLabel,
} from "./styled";

type IProps = React.PropsWithChildren<{
  open: boolean;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  options?: string[];
  selectedOption?: string;
  icon?: React.ReactNode;
  iconSize?: number;
  boxWrapperStyle?: FlattenInterpolation<any>;
  headerWrapperStyle?: FlattenInterpolation<any>;
  bodyWrapperStyle?: FlattenInterpolation<any>;
  disableHeadClick?: boolean;
  disableRightButtonClick?: boolean;
  onOpen?(): void;
  onClose?(): void;
  onOptionChange?(option: string): void;
}>;

const CollapsibleBox = React.forwardRef<
  React.RefObject<HTMLDivElement>,
  IProps
>(
  (
    {
      open,
      title,
      subTitle,
      children,
      options,
      selectedOption,
      icon,
      iconSize,
      disableHeadClick,
      disableRightButtonClick,
      boxWrapperStyle,
      headerWrapperStyle,
      bodyWrapperStyle,
      onOpen,
      onClose,
      onOptionChange,
    },
    ref,
  ) => {
    const refThis = React.useRef<HTMLDivElement>(null);
    const refRightContainer = React.useRef<HTMLDivElement>(null);
    const [popoverOpen, setPopoverOpenStatus] = React.useState<boolean>(false);

    const handleToggle = React.useCallback(() => {
      if (disableHeadClick) return;
      open ? onClose?.() : onOpen?.();
    }, [disableHeadClick, onClose, onOpen, open]);

    const handleTogglePopover = React.useCallback(() => {
      if (options) {
        setPopoverOpenStatus(!popoverOpen);
      }
    }, [options, popoverOpen]);
    const handleClosePopover = React.useCallback(() => {
      setPopoverOpenStatus(false);
    }, []);

    const handleClickMenuItem = React.useCallback(
      e => {
        const option = e.currentTarget.dataset.option;
        onOptionChange?.(option);
      },
      [onOptionChange],
    );

    const optionElement = React.useMemo(() => {
      if (!options) return null;
      return (
        <OptionLabel>
          {selectedOption}
          <ResponsiveMenu
            open={popoverOpen}
            anchorElement={refRightContainer.current}
            onCloseRequest={handleClosePopover}
          >
            <MenuWrapper>
              {options.map(item => (
                <MenuItem
                  key={item}
                  data-option={item}
                  onClick={handleClickMenuItem}
                >
                  {item}
                </MenuItem>
              ))}
            </MenuWrapper>
          </ResponsiveMenu>
        </OptionLabel>
      );
    }, [
      handleClickMenuItem,
      handleClosePopover,
      options,
      popoverOpen,
      selectedOption,
    ]);

    React.useImperativeHandle(ref, () => refThis);

    return (
      <BoxWrapper ref={refThis} overrideStyle={boxWrapperStyle}>
        <HeaderContainer
          disableHeadClick={disableHeadClick}
          overrideStyle={headerWrapperStyle}
          onClick={handleToggle}
        >
          <TitleHeaderContainer>
            <TitleWrapper>{title}</TitleWrapper>
            <RightContainer
              role="button"
              ref={refRightContainer}
              onClick={handleTogglePopover}
            >
              {optionElement}
              {!disableRightButtonClick && (
                <CollapseIconButton iconSize={iconSize} open={popoverOpen}>
                  {icon ?? <ArrowIcon iconSize={iconSize} />}
                </CollapseIconButton>
              )}
            </RightContainer>
          </TitleHeaderContainer>
          {subTitle ? (
            <SubTitleHeaderContainer>{subTitle}</SubTitleHeaderContainer>
          ) : null}
        </HeaderContainer>
        <CSSTransition
          in={open}
          timeout={300}
          classNames="bodyAnim"
          unmountOnExit={true}
        >
          <BodyContainer overrideStyle={bodyWrapperStyle}>
            {children}
          </BodyContainer>
        </CSSTransition>
      </BoxWrapper>
    );
  },
);

export default CollapsibleBox;
