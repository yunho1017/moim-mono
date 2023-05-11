import styled from "styled-components";
import { Popover as BasePopover, withStyles } from "@material-ui/core";
import DialogBase from "@material-ui/core/Dialog";

import CloseIconBase from "@icon/24-close-b.svg";
import { H8Bold } from "common/components/designSystem/typos";

import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";

import { MEDIA_QUERY } from "common/constants/responsive";
import { getBGLevel4DialogStyle } from "common/components/designSystem/BGLevel";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Contents = styled.div`
  flex: 1;
  min-width: 0;
  ${useScrollStyle}
`;

export const CloseButton = styled(CloseIconBase).attrs({
  size: "s",
  touch: 44,
  role: "button",
})``;

export const Title = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const DialogWrapper = styled.div`
  width: ${px2rem(455)};
  height: ${px2rem(655)};
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    height: 100%;
  }
`;

export const Popover = styled(BasePopover).attrs({
  classes: { paper: "paper" },
})`
  .paper {
    ${getBGLevel4DialogStyle({ borderRadius: 8 })}

    position: absolute;
    border-radius: ${px2rem(8)};

    padding-top: ${px2rem(4)};
  }
`;

export const Dialog = withStyles({
  paperScrollPaper: {
    width: "100%",
    height: "100%",
    maxHeight: "initial",
  },
})(DialogBase);
