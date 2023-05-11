import * as React from "react";
import { css } from "styled-components";
import DialogBase from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import { MEDIA_QUERY } from "common/constants/responsive";
import {
  defaultStyle,
  CloseButton,
  CloseButtonWrapper,
} from "common/components/basicResponsiveDialog/styled";
import { px2rem } from "app/common/helpers/rem";
import useIsMobile from "common/hooks/useIsMobile";
import CustomAppBarModalLayout from "common/components/modalLayout/customAppbar";
import AppBar from "common/components/appBar";
import FreezeView from "common/components/freezeView";
import { SpacerVertical } from "common/components/designSystem/spacer";

export const Dialog = withStyles({
  ...defaultStyle,
  paper: {
    ...defaultStyle.paper,
    width: px2rem(920),
    height: "fit-content",
    maxWidth: "inherit",
    [`@media ${MEDIA_QUERY.EXCEPT_MOBILE}`]: {
      borderRadius: px2rem(8),
      paddingBottom: px2rem(44),
    },
  },
  scrollPaper: {
    [`@media ${MEDIA_QUERY.EXCEPT_MOBILE}`]: {
      padding: `${px2rem(68)} ${px2rem(24)}`,
    },
  },
})(DialogBase);

interface IProps {
  title?: React.ReactNode;
  open: boolean;
  onClose(): void;
}

const ExecutionShowDialog: React.FC<IProps> = ({
  title,
  open,
  onClose,
  children,
}) => {
  const isMobile = useIsMobile();

  return (
    <Dialog open={open} fullScreen={isMobile} onClose={onClose}>
      <CustomAppBarModalLayout
        appBar={
          <AppBar
            titleElement={title}
            titleAlignment="Center"
            leftButton={
              isMobile ? (
                <CloseButtonWrapper>
                  <CloseButton onClick={onClose} />
                  <SpacerVertical value={8} />
                </CloseButtonWrapper>
              ) : (
                <CloseButton onClick={onClose} />
              )
            }
          />
        }
        hasAppBarBorder={false}
        wrapperStyle={
          isMobile
            ? css`
                margin-top: 0;
              `
            : undefined
        }
      >
        <FreezeView isFreeze={open} delayedFreeze={50}>
          {children}
        </FreezeView>
      </CustomAppBarModalLayout>
    </Dialog>
  );
};

export default ExecutionShowDialog;
