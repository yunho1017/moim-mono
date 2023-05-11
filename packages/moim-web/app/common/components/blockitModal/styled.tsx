import styled, { css } from "styled-components";
import DialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from "@icon/24-close-b.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { defaultStyle } from "common/components/basicResponsiveDialog/styled";
import { useSingleLineStyle, useScrollStyle } from "../designSystem/styles";

export const CloseButton = styled(CloseIcon).attrs({
  role: "button",
  size: "s",
  touch: 24,
})``;

export const AppBarHeaderStyle = css`
  margin-top: ${px2rem(8)};
`;

export const Title = styled.div`
  white-space: nowrap;
  ${useSingleLineStyle};
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  width: 100%;
  height: 100%;
  padding: 0 ${px2rem(24)} ${px2rem(24)};

  @media ${MEDIA_QUERY.EXCEPT_DESKTOP} {
    padding: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
  min-height: 0;
  width: 100%;
  height: 100%;
  ${useScrollStyle};
`;

export const Dialog = withStyles({
  ...defaultStyle,
  paper: {
    ...defaultStyle.paper,
    margin: `${px2rem(40)} 0`,
    width: px2rem(455),
    maxHeight: `calc(100% - ${px2rem(80)})`,
  },
})(DialogBase);

export const blockWrapperStyle = css`
  flex: 1;
  min-height: 0;
  min-width: 0;
`;
