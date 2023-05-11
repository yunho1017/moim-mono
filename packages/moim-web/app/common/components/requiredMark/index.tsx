import * as React from "react";
import { useIntl } from "react-intl";
import styled, { FlattenInterpolation } from "styled-components";
import ReactTooltip from "react-tooltip";
import { px2rem } from "common/helpers/rem";
import { B4RegularStyle } from "../designSystem/typos";

export const RequiredMarkContainer = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  display: inline-block;
  margin-left: ${px2rem(4)};

  > span {
    cursor: help;
    color: ${props => props.theme.color.red700};
  }

  .customTooltipTheme {
    color: ${props => props.theme.colorV2.colorSet.white1000} !important;
    background-color: ${props =>
      props.theme.colorV2.colorSet.grey700} !important;
    ${B4RegularStyle};
    &.place-bottom {
      margin-top: ${px2rem(4)};
      &::after {
        border-bottom-width: 0 !important;
      }
    }

    &.place-top {
      margin-bottom: ${px2rem(4)};
      &::after {
        border-top-width: 0 !important;
      }
    }

    &.place-left {
      margin-right: ${px2rem(4)};
      &::after {
        border-left-width: 0 !important;
      }
    }

    &.place-right {
      margin-left: ${px2rem(4)};
      &::after {
        border-right-width: 0 !important;
      }
    }
  }
`;

interface IProps {
  tooltipText?: string;
  overrideStyle?: FlattenInterpolation<any>;
}

const RequiredMark: React.FC<IProps> = ({ tooltipText, overrideStyle }) => {
  const intl = useIntl();

  return (
    <RequiredMarkContainer
      overrideStyle={overrideStyle}
      data-tip={
        tooltipText ??
        intl.formatMessage({
          id: "guide_required_input",
        })
      }
    >
      <span>*</span>
      <ReactTooltip
        className="customTooltipTheme"
        place="bottom"
        effect="solid"
        multiline={false}
      />
    </RequiredMarkContainer>
  );
};

export default RequiredMark;
