import * as React from "react";
import Select, { ActionMeta, components } from "react-select";
import { FlattenInterpolation } from "styled-components";
import ReactResizeDetector from "react-resize-detector";
import {
  Wrapper,
  ReactSelectWithStyle,
  HelperText,
  // DownArrowIcon,
  // MemberIcon,
  // PositionIcon,
  // BadgeIcon,
} from "../styled";
import Option from "../components/option";
import SingleValue from "../components/singleSelected";
import MultiValue from "../components/multiSelected";
import MenuList from "../components/menuList";
import Menu from "../components/menu";

import { IOption, ISelectionConfig } from "../type";

interface ICommonProps {
  size: "l" | "s";
  state: "normal" | "error" | "disabled";
  options: IOption[];
  useSearch?: boolean;
  isSearchLoading?: boolean;
  placeholder?: string;
  reasonText?: React.ReactNode;
  overrideStyle?: FlattenInterpolation<any>;
  className?: string;
  id?: string;
  name?: string;
  menuPortalTarget?: HTMLElement | null;
  onSearchChange?: (value: string) => void;
  onChange(option: Moim.Id | IOption[]): void;
}
interface ISingleProps extends ICommonProps {
  selected: Moim.Id | null;
  isMultiple: false;
}

interface IMultipleProps extends ICommonProps {
  selected: Moim.Id[] | null;
  isMultiple: true;
}

interface IState {
  width: number;
  height: number;
}

const selectionStyles = {
  menuPortal: (provided: any) => ({ ...provided, zIndex: 1500 }),
};
export default class SelectionBase extends React.PureComponent<
  ISingleProps | IMultipleProps,
  IState
> {
  public state: IState = {
    width: 0,
    height: 0,
  };

  protected config: ISelectionConfig = {
    type: "static",
    useChip: false,
  };

  protected readonly selectionRef = React.createRef<Select>();

  public render() {
    const {
      size,
      state,
      options,
      placeholder,
      reasonText,
      overrideStyle,
      id,
      name,
      isMultiple = false,
      useSearch = false,
      menuPortalTarget,
      className,
      onSearchChange,
    } = this.props;
    const { width, height } = this.state;
    return (
      <Wrapper overrideStyle={overrideStyle} className={className}>
        <ReactResizeDetector
          handleWidth={true}
          handleHeight={true}
          onResize={this.handleResize}
        >
          <ReactSelectWithStyle
            size={size}
            state={state}
            width={width}
            height={height}
            isMultiple={isMultiple}
            useChip={this.config.useChip}
            hasSelectedOption={this.getHasSelectedOption()}
            id={id}
            name={name}
            ref={this.selectionRef}
            classNamePrefix="rs"
            value={this.getSelectedOption()}
            styles={selectionStyles}
            options={options}
            placeholder={placeholder}
            components={{
              // TODO: (mono) fix this
              // DropdownIndicator: this.renderDropdownIndicator,
              Option,
              SingleValue,
              MultiValue,
              MenuList: this.renderMenuList,
              Menu,
            }}
            onChange={this.handleChange}
            isSearchable={useSearch}
            isMulti={isMultiple}
            isDisabled={state === "disabled"}
            menuPortalTarget={menuPortalTarget}
            onInputChange={onSearchChange}
          />

          {reasonText && <HelperText state={state}>{reasonText}</HelperText>}
        </ReactResizeDetector>
      </Wrapper>
    );
  }

  protected readonly handleChange = (
    option: any,
    _actionMeta: ActionMeta<any>
  ) => {
    this.props.onChange?.(this.props.isMultiple ? option : option.value);
  };

  // protected readonly renderDropdownIndicator = ({
  //   ...props
  // }: React.ComponentProps<typeof components.DropdownIndicator>) => (
  //   <components.DropdownIndicator {...props}>
  //     {this.renderDropdownIndicatorInner()}
  //   </components.DropdownIndicator>
  // );
  protected readonly renderMenuList = ({
    ...props
  }: React.ComponentProps<typeof components.MenuList>) => (
    <MenuList {...props} isLoading={this.props.isSearchLoading} />
  );

  // protected readonly renderDropdownIndicatorInner = () => {
  //   switch (this.config.type) {
  //     case "static":
  //       return <DownArrowIcon />;

  //     case "member":
  //       return <MemberIcon />;

  //     case "position":
  //       return <PositionIcon />;

  //     case "badge":
  //       return <BadgeIcon />;

  //     default:
  //       return <></>;
  //   }
  // };

  protected readonly getSelectedOption = () => {
    const { options } = this.props;

    if (this.props.isMultiple) {
      const { selected: multipleSelected } = this.props;
      return (multipleSelected
        ?.map((target) => options.find((option) => option.value === target))
        ?.filter((target) => Boolean(target)) ?? null) as IOption[] | null;
    }
    const { selected: singleSelected } = this.props;

    return (options.find((option) => option.value === singleSelected) ??
      null) as IOption | null;
  };

  protected readonly getHasSelectedOption = () => Boolean(this.props.selected);

  private readonly handleResize = (width: number, height: number) => {
    this.setState({
      width,
      height,
    });
  };
}
