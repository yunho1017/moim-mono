import styled from "styled-components";
import { Popover as BasePopover } from "@material-ui/core";

import { px2rem } from "common/helpers/rem";

import { PopoverChannelItemWrapper } from "../popoverChannelItem";
import { WithPopoverCategory } from "../popoverCategoryItem";
import { getBGLevel3DialogStyle } from "common/components/designSystem/BGLevel";
import { useScrollStyle } from "common/components/designSystem/styles";

const Popover = styled(BasePopover).attrs({
  classes: { paper: "paper" },
})`
  .paper {
    ${getBGLevel3DialogStyle({ borderRadius: 2 })}

    position: absolute;
    border-radius: ${px2rem(2)};

    width: ${px2rem(230)};
    max-height: ${px2rem(483)};
    display: flex;
    flex-direction: column;

    & > ${PopoverChannelItemWrapper} + ${WithPopoverCategory} {
      margin-top: ${px2rem(16)};
    }

    & > ${WithPopoverCategory}:first-child {
      border-top: none;
    }

    & > ${WithPopoverCategory} + ${PopoverChannelItemWrapper} {
      border-top: ${px2rem(1)} solid
        ${props => props.theme.colorV2.colorSet.grey50};
    }
  }
`;

export const PopoverInner = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  padding: ${px2rem(4)} 0;
  ${useScrollStyle}
`;
export default Popover;
