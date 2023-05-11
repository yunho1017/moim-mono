import * as React from "react";
import styled, { css, FlattenInterpolation } from "styled-components";
import { components } from "react-select";
import { B1RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { MarginSize } from "app/enums";
// icons
import DownArrowBase from "@icon/18-down-s-g.svg";
import UserIconBase from "@icon/18-member-g.svg";
import CheckIconBase from "@icon/18-checkmark-g.svg";
// components
import SelectValueOptionChip from "./chip";
import UserProfileImage from "common/components/userProfileImage";
import { BaseItemCell } from "common/components/itemCell";
import { ILeftProps } from "common/components/itemCell/components/left/type";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";

export const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  padding: ${px2rem(4)} ${px2rem(16)};
  ${props => props.overrideStyle};
`;

// react-select follow BEM
export const ReactSelectStyleInjector = styled.div<{
  hasError?: boolean;
  hasFocus?: boolean;
}>`
  .rs__control {
    flex-wrap: nowrap;
    box-shadow: none;
    width: 100%;
    height: ${px2rem(42)};
    padding: ${px2rem(9)} ${px2rem(8)};
    border-radius: ${px2rem(4)};
    border: 1px solid
      ${props =>
        props.hasError
          ? props.theme.color.red700
          : props.theme.colorV2.colorSet.grey200};

    &:focus,
    &:hover {
      border-color: ${props =>
        props.hasError
          ? props.theme.color.red700
          : props.theme.colorV2.colorSet.grey600};
    }
  }

  .rs__value-container,
  .rs__dropdown-indicator {
    padding: 0;
  }

  .rs__placeholder {
    top: 55%; // for manual adjust :( no good,
  }

  .rs__value-container {
    height: ${px2rem(24)};
    color: ${props => props.theme.colorV2.colorSet.grey300};
    ${B1RegularStyle};
    > div:last-child {
      padding: 0;
    }
  }

  .rs__clear-indicator {
    padding: 0;
    color: ${props => props.theme.colorV2.colorSet.grey300};
    width: ${px2rem(18)};
    height: ${px2rem(18)};
    &:hover {
      color: ${props => props.theme.colorV2.colorSet.grey600};
    }
  }

  .rs__indicator-separator {
    display: none;
  }

  .rs__menu {
    margin-top: ${px2rem(-2)};
    border: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
    border-radius: ${px2rem(2)};
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
    box-shadow: ${props => props.theme.shadow.whiteElevated};
  }

  .rs__menu-list {
    padding: ${px2rem(4)} 0;
    ${B1RegularStyle};
    color: ${props => props.theme.colorV2.colorSet.grey800};
  }

  .rs__option {
    display: flex;
    align-items: center;
    width: 100%;
    height: ${px2rem(42)};
    background-color: transparent;
    color: inherit;
    padding: ${px2rem(9)} 0;
  }

  .rs__option:active,
  .rs__option--is-selected {
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
  }

  .rs__option--is-focused {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }

  .rs__menu-notice--no-options {
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }
`;

const OptionInnerSpacer = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
`;

const OptionRightContainer = styled.div`
  margin-left: -${px2rem(6)}; // NOTE: BaseItemCell's right wrapper has 10px left margin
`;

export const DownArrow = styled(DownArrowBase).attrs<{ isFocused: boolean }>({
  size: "xs",
})`
  transition: transform 100ms cubic-bezier(0.4, 0, 0.2, 1);
  ${props =>
    props.isFocused
      ? css`
          transform: rotate(180deg);
        `
      : css`
          transform: rotate(0deg);
        `}
`;

export const UserIcon = styled(UserIconBase).attrs({
  size: "xs",
})``;

export const CheckIcon = styled(CheckIconBase).attrs(props => ({
  size: "xs",
  touch: 42,
  icon: props.theme.colorV2.colorSet.grey700,
}))``;

export const DropdownIndicator = (
  props: React.ComponentProps<typeof components.DropdownIndicator>,
) => (
  <components.DropdownIndicator {...props}>
    <DownArrow isFocused={props.isFocused} />
  </components.DropdownIndicator>
);

export const UserIconIndicator = (
  props: React.ComponentProps<typeof components.DropdownIndicator>,
) => (
  <components.DropdownIndicator {...props}>
    <UserIcon />
  </components.DropdownIndicator>
);

export const SimpleOption = (
  props: React.ComponentProps<typeof components.Option>,
) => {
  const data = props.data;

  const rightElement = React.useMemo(
    () =>
      props.isSelected ? (
        <OptionRightContainer>
          <CheckIcon />
        </OptionRightContainer>
      ) : null,
    [props.isSelected],
  );

  return (
    <components.Option {...props}>
      <OptionInnerSpacer>
        <BaseItemCell
          size="xs"
          title={<NativeEmojiSafeText value={data.label} />}
          rightElement={rightElement}
          disableRightPadding={true}
        />
      </OptionInnerSpacer>
    </components.Option>
  );
};

export const SingleValue = (
  props: React.ComponentProps<typeof components.SingleValue>,
) => {
  const data = props.data;
  const handleDelete = React.useCallback(() => {
    props.clearValue(); // Note: single mode 전용
  }, [props]);

  return (
    <components.SingleValue {...props}>
      <SelectValueOptionChip
        name={data.label}
        showAvatar={false}
        onDeleteClick={handleDelete}
      />
    </components.SingleValue>
  );
};

export const AvatarOption = (
  props: React.ComponentProps<typeof components.Option>,
) => {
  const data = props.data;

  const rightElement = React.useMemo(
    () =>
      props.isSelected ? (
        <OptionRightContainer>
          <CheckIcon />
        </OptionRightContainer>
      ) : null,
    [props.isSelected],
  );

  return (
    <components.Option {...props}>
      <BaseItemCell
        size="xs"
        title={data.label}
        leftElement={{
          element: (
            <UserProfileImage
              size="s"
              src={data.avatar_url}
              canOpenProfileDialog={false}
            />
          ),
          props: {
            leftContentsSize: "s",
            margin: {
              left: MarginSize.SIXTEEN,
              right: MarginSize.TWELVE,
            },
          } as ILeftProps,
        }}
        rightElement={rightElement}
        disableRightPadding={true}
      />
    </components.Option>
  );
};

export const AvatarSingleValue = (
  props: React.ComponentProps<typeof components.SingleValue>,
) => {
  const data = props.data;
  const handleDelete = React.useCallback(() => {
    props.clearValue(); // Note: single mode 전용
  }, [props]);

  return (
    <components.SingleValue {...props}>
      <SelectValueOptionChip
        name={data.label}
        showAvatar={true}
        avatarUrl={data.avatar_url}
        onDeleteClick={handleDelete}
      />
    </components.SingleValue>
  );
};
