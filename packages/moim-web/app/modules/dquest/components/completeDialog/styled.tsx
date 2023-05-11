import * as React from "react";
import styled from "styled-components";
import Slide from "@material-ui/core/Slide";
import DialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import { TransitionProps } from "@material-ui/core/transitions";
import { defaultStyle } from "common/components/basicResponsiveDialog/styled";
import { DefaultDivider as BaseDivider } from "common/components/divider";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { H8Bold, H10Bold } from "common/components/designSystem/typos";
import { FlatButton } from "common/components/designSystem/buttons";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const Transition: React.ComponentType<TransitionProps & {
  children?: React.ReactElement<any, any> | undefined;
}> = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export const Divider = styled(BaseDivider)`
  margin: ${px2rem(8)} 0;
`;

export const Wrapper = styled.div`
  padding: 0 ${px2rem(48)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;

export const Title = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(4)} 0;
  ${useSingleLineStyle}
`;

export const Message = styled(H10Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(4)} 0;
  white-space: pre-line;
`;

export const Body = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;

  ${Title} + ${Message} {
    margin-top: ${px2rem(6)};
  }
`;

export const ActionButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  padding: ${px2rem(16)} 0;
`;

export const Dialog = withStyles({
  root: {
    zIndex: "1301 !important" as any,
  },
  scrollPaper: {
    [`@media ${MEDIA_QUERY.ONLY_MOBILE}`]: {
      alignItems: "flex-end",
    },
  },
  paper: {
    ...defaultStyle.paper,
    margin: `0 ${px2rem(8)}`,
    width: px2rem(455),
    maxHeight: `calc(100% - ${px2rem(80)})`,

    [`@media ${MEDIA_QUERY.ONLY_MOBILE}`]: {
      borderRadius: `${px2rem(8)} ${px2rem(8)} 0 0`,
    },
  },
  paperScrollPaper: {
    ...defaultStyle.paperScrollPaper,
    [`@media ${MEDIA_QUERY.ONLY_MOBILE}`]: {
      width: "100%",
    },
  },
})(DialogBase);
