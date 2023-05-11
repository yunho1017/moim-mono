import styled from "styled-components";
import MUIDialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import { defaultStyle } from "common/components/basicResponsiveDialog/styled";
import { px2rem } from "common/helpers/rem";
import { H9Bold } from "common/components/designSystem/typos";
import {
  FlatButton,
  GhostGeneralButton,
} from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";

export const MOBILE_MIN_HEIGHT = 180;

export const Wrapper = styled.div`
  width: 100%;

  padding: 0;
  display: flex;
  flex-direction: column;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)} ${px2rem(24)};
    height: 100%;
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    min-height: ${px2rem(MOBILE_MIN_HEIGHT)};
  }
`;

export const Body = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 0;
  flex: 1;
  margin-top: ${px2rem(8)};
`;

export const Footer = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)} ${px2rem(12)};
  display: flex;
  align-items: center;
  margin-top: ${px2rem(8)};
  gap: ${px2rem(8)};
`;

export const TitleMessage = styled(H9Bold)`
  width: 100%;
  white-space: pre-wrap;
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const InputContainer = styled.div`
  width: 100%;
  padding: ${px2rem(4)} ${px2rem(16)};
`;

export const SubmitButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
  flex: 1;
`;

export const CancelButton = styled(GhostGeneralButton).attrs({ size: "l" })`
  width: 100%;
  flex: 1;
`;

export const DialogBase = withStyles({
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
    borderRadius: `${px2rem(8)} !important`,
    margin: `0 ${px2rem(8)}`,
    width: px2rem(455),
    height: px2rem(320),

    [`@media ${MEDIA_QUERY.EXCEPT_MOBILE}`]: {
      minHeight: px2rem(MOBILE_MIN_HEIGHT),
    },
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
})(MUIDialogBase);
