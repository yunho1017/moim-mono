import * as React from "react";
import { FormattedMessage } from "react-intl";
// hooks
import { useProps, useHandlers } from "./useHook";
// components
import ResponsiveMenu from "common/components/responsiveMenu";
import {
  MenuWrapper,
  MenuItem,
} from "common/components/responsiveMenu/components/menu";
import {
  Wrapper,
  Chip,
  ChipInner,
  OptionLabel,
  ArrowIcon,
  ArrowButton,
} from "./styled";

export interface IProps {
  options: Partial<Moim.Group.IGroupSortingOption>[];
  onChangeOption(option: Partial<Moim.Group.IGroupSortingOption>): void;
}

const OptionFilter: React.FC<IProps> = props => {
  const {
    refWrapper,
    open,
    optionLabels,
    selectedOption,
    handleMenuClick,
    handleOpen,
    handleClose,
  } = useHandlers(useProps(props));

  const optionElements = React.useMemo(
    () =>
      optionLabels.map((opt, index) => (
        <MenuItem
          key={`menu_item_${opt.displayTextKey}`}
          data-menu-index={index}
          onClick={handleMenuClick}
        >
          <FormattedMessage id={opt.displayTextKey} />
        </MenuItem>
      )),
    [handleMenuClick, optionLabels],
  );

  return (
    <>
      <Wrapper ref={refWrapper}>
        <Chip onClick={handleOpen}>
          <ChipInner>
            <OptionLabel>
              <FormattedMessage
                id={optionLabels[selectedOption].displayTextKey}
              />
            </OptionLabel>
          </ChipInner>
          <ArrowButton open={open}>
            <ArrowIcon />
          </ArrowButton>
        </Chip>
      </Wrapper>
      <ResponsiveMenu
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorElement={refWrapper.current}
        onCloseRequest={handleClose}
      >
        <MenuWrapper>{optionElements}</MenuWrapper>
      </ResponsiveMenu>
    </>
  );
};

export default OptionFilter;
