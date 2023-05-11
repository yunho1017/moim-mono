import styled from "styled-components";
import Popover from "@material-ui/core/Popover";
import { px2rem } from "common/helpers/rem";
import { B4RegularStyle } from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  margin: 0 ${px2rem(6)};
  display: grid;
  grid-template-columns: ${px2rem(75)} ${`minmax(${px2rem(5)}, auto)`};
  grid-template-rows: ${px2rem(24)} ${px2rem(16)};
  align-items: center;
  background-color: transparent;
  color: #e4e9f2;
`;

export const IconBox = styled.span`
  display: inline-block;
  text-align: center;
  position: relative;
  grid-column-start: 1;
`;

export const IconButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .ch-icon {
    width: ${px2rem(24)};
    height: ${px2rem(24)};
  }

  .ch-label {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    width: 1px;
    overflow: hidden;
    position: absolute !important;
  }

  &:hover {
  }
`;

export const MoreButton = styled.span``;

export const Label = styled.div`
  grid-row-start: 2;
  grid-column: 1;
  padding-top: ${px2rem(2)};
  justify-self: center;
  ${B4RegularStyle};
`;

export const OptionPopover = styled(Popover).attrs({
  classes: { paper: "paper" },
})`
  .paper {
    background-color: initial;
    color: initial;
  }
`;

export const OptionContainer = styled.ul`
  // TBD STYLE
  width: fit-content;
  background-color: rgba(46, 47, 52, 0.85);
  border: #1b1c20;
  margin: 0;
  border-radius: ${px2rem(2)};
  backdrop-filter: blur(1px);
  list-style: none;
  padding: ${px2rem(5)} 0;
  box-shadow: 0 ${px2rem(8)} ${px2rem(18)} 0 rgb(0 0 0 / 15%);
  display: table;

  li {
    display: flex;
    color: #e4e9f2;
    height: ${px2rem(20)};

    .ch-check {
      width: ${px2rem(20)};
      height: ${px2rem(20)};
    }

    .content {
      flex: 1;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      text-decoration: none;
      outline: 0;
      font-weight: 400;
      padding: 0 ${px2rem(20)};
      font-size: ${px2rem(12)};
      line-height: ${px2rem(16)};
    }

    .ch-check + .content {
      padding-left: 0;
    }
  }

  li:hover {
    background-color: #29dcf8;
    color: #3f4149;
    outline: 0;
  }
`;
