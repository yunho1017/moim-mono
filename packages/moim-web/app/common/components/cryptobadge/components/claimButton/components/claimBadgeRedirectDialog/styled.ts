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
import MetamaskIconBase from "@icon/36_metamask";

export const CustomBackdrop = styled(Backdrop)`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const MetamaskIcon = styled(MetamaskIconBase).attrs({
  size: "l",
})``;

export const Title = styled.div`
  ${H8BoldStyle}
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-bottom: ${px2rem(13)};
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
