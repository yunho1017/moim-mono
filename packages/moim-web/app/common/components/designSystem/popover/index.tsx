import styled, { FlattenInterpolation } from "styled-components";
import PopoverBase from "@material-ui/core/Popover";
import { px2rem } from "common/helpers/rem";
import { getBGLevel3DialogStyle } from "../BGLevel";

const Popover = styled(PopoverBase).attrs({
  classes: { paper: "paper" },
})<{ paperOverrideStyle?: FlattenInterpolation<any> }>`
  .MuiPaper-root {
    border-radius: ${px2rem(2)};

    ${getBGLevel3DialogStyle({ borderRadius: 2 })}
    position: absolute;
    ${props => props.paperOverrideStyle};
  }
`;

export default Popover;
