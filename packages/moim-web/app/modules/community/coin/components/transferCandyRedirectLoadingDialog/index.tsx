import * as React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Backdrop } from "@material-ui/core";
import DialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import { DefaultLoader } from "common/components/loading";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import {
  B1RegularStyle,
  H8BoldStyle,
} from "common/components/designSystem/typos";

const CustomBackdrop = styled(Backdrop)`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

const Title = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-bottom: ${px2rem(13)};
  ${H8BoldStyle}
`;

const Description = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  margin-bottom: ${px2rem(24)};
  ${B1RegularStyle}
`;

const Dialog = withStyles({
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

const TransferCandyRedirectLoadingDialog: React.FC<{
  open: boolean;
  close(): void;
}> = ({ open, close }) => {
  const handleClose = React.useCallback(() => {
    close();
  }, [close]);

  React.useLayoutEffect(() => {
    if (open) {
      setTimeout(() => {
        handleClose();
      }, 10000);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      BackdropComponent={CustomBackdrop}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      onClose={handleClose}
    >
      <Title>
        <FormattedMessage id="send_candy_redirect_dialog_title" />
      </Title>
      <Description>
        <FormattedMessage id="send_candy_redirect_dialog_body" />
      </Description>
      <DefaultLoader />
    </Dialog>
  );
};

export default TransferCandyRedirectLoadingDialog;
