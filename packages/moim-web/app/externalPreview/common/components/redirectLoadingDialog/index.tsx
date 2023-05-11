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
import { BubblingItem } from "common/components/loading/icon/styledComponents";

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

const LoaderWrapper = styled.div`
  ${BubblingItem} {
    background-color: var(--external-main-color);
  }
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

interface IProps {
  open: boolean;
  onClose(): void;
}

const RedirectLoadingDialog: React.FC<IProps> = ({ open, onClose }) => {
  const handleClose = React.useCallback(() => {
    onClose();
  }, [onClose]);

  React.useLayoutEffect(() => {
    if (open) {
      setTimeout(() => {
        handleClose();
      }, 2000);
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
        <FormattedMessage id="mint_redirect_dialog_title" />
      </Title>
      <Description>
        <FormattedMessage id="mint_redirect_dialog_body" />
      </Description>
      <LoaderWrapper>
        <DefaultLoader />
      </LoaderWrapper>
    </Dialog>
  );
};

export default RedirectLoadingDialog;
