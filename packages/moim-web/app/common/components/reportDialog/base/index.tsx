import * as React from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import AppBar from "common/components/appBar";
import BasicResponsiveDialog from "common/components/basicResponsiveDialog";
import {
  CloseButton,
  AppBarWrapper,
  CloseButtonWrapper,
} from "common/components/basicResponsiveDialog/styled";
import { Wrapper, Inner } from "./styled";

import { AppDispatch } from "app/store";
import { report } from "./actions";
import Component from "./component";

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators(
    {
      dispatchReport: report,
    },
    dispatch,
  );
}

interface IProps extends ReturnType<typeof mapDispatchToProps> {
  threadId: string | null;
  isOpen: boolean;

  id: string;
  title: string;
  placeholder: string;

  snackbarMessage: {
    getSucceed: () => string;
    getFailed: (code?: string) => string;
  };
  onClose: () => void;
}

class GlobalReportDialogBase extends React.PureComponent<IProps> {
  private cancelToken = axios.CancelToken.source();

  public render() {
    const { isOpen, onClose, title, placeholder } = this.props;
    return (
      <BasicResponsiveDialog open={isOpen} onClose={onClose}>
        <Wrapper>
          <AppBarWrapper>
            <AppBar
              titleAlignment="Center"
              leftButton={
                <CloseButtonWrapper>
                  <CloseButton onClick={onClose} />
                </CloseButtonWrapper>
              }
              titleElement={<FormattedMessage id={title} />}
            />
          </AppBarWrapper>
          <Inner>
            <Component
              id=""
              placeholder={placeholder}
              onReport={this.handleReport}
              onClose={onClose}
            />
          </Inner>
        </Wrapper>
      </BasicResponsiveDialog>
    );
  }

  protected readonly handleReport = async (
    contents: Moim.Blockit.Blocks[],
    files: Moim.Blockit.IFileBlock[],
  ) => {
    const { threadId, onClose, dispatchReport, snackbarMessage } = this.props;
    if (threadId) {
      const result = await dispatchReport(
        threadId,
        {
          type: "report",
          content: contents.concat(files),
        },
        this.cancelToken.token,
        snackbarMessage,
      );

      if (result.success) {
        onClose();
      }
    }
  };
}

export default connect(undefined, mapDispatchToProps)(GlobalReportDialogBase);
