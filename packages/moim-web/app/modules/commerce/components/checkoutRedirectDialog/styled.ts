import styled from "styled-components";
import DialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import { Backdrop } from "@material-ui/core";
import {
  B1RegularStyle,
  H8BoldStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const CustomBackdrop = styled(Backdrop)`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const Title = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-bottom: ${px2rem(13)};
  ${H8BoldStyle}
`;

export const Description = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  margin-bottom: ${px2rem(24)};
  ${B1RegularStyle}
`;

export const Dialog = withStyles({
  root: {
    zIndex: "1400 !important" as any,
  },
  paper: {
    display: "flex",
    alignItems: "center",
    padding: px2rem(24),
    width: px2rem(455),
  },
  [`@media ${MEDIA_QUERY.ONLY_MOBILE}`]: {
    width: px2rem(295),
  },
})(DialogBase);
