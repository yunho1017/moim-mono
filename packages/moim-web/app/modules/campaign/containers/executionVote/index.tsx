import * as React from "react";
import { FormattedMessage } from "react-intl";
import { css } from "styled-components";
import { useStoreState, useActions } from "app/store";
import { useStoreSecondaryView } from "common/hooks/useSecondaryView";
import useCancelToken from "common/hooks/useCancelToken";
import useIsMobile from "common/hooks/useIsMobile";
import {
  setPaymentRedirectLastSeen,
  setPaymentRedirectRequest,
  removePaymentRedirectLastSeen,
  removePaymentRedirectRequest,
} from "app/modules/commerce/components/checkoutRedirectDialog/helpers";
import {
  voteExecution,
  ActionCreators as CampaignActionCreators,
} from "app/actions/campaign";
import { removeStoreRedirectBlocks } from "app/actions/referenceBlock/cookieHelper";
import AppBar from "common/components/appBar";
import {
  CloseButtonWrapper,
  CloseButton,
} from "common/components/basicResponsiveDialog/styled";
import { WithoutMinHeightResponsiveDialog } from "common/components/basicResponsiveDialog";
import CustomAppBarModalLayout from "common/components/modalLayout/customAppbar";
import ExecutionVoteComponent from "app/modules/campaign/components/vote";
import { SpacerVertical } from "common/components/designSystem/spacer";

interface IProps {}

const ExecutionVoteContainer: React.FC<IProps> = ({}) => {
  const storeSecondaryPanelPath = useStoreSecondaryView();
  const isMobile = useIsMobile();
  const [isLoading, setLoadStatus] = React.useState(false);
  const cancelTokenSource = useCancelToken();
  const { campaignId, executionId, dialogType, isOpen } = useStoreState(
    state => ({
      campaignId: state.campaignPage.currentCampaignId,
      executionId: state.campaignPage.currentExecutionId,
      dialogType: state.campaignPage.executionVoteDialogType,
      isOpen: state.campaignPage.openExecutionVoteDialog,
    }),
  );
  const { vote, closeDialog } = useActions({
    vote: voteExecution,
    closeDialog: CampaignActionCreators.closeExecutionVoteDialog,
  });

  const handleCloseDialog = React.useCallback(() => {
    if (!isLoading) {
      closeDialog();
    }
  }, [isLoading, closeDialog]);

  const handleClickSubmit = React.useCallback(
    (content: string) => {
      if (campaignId && executionId && !isLoading) {
        setLoadStatus(true);
        setPaymentRedirectRequest(true);
        setPaymentRedirectLastSeen();
        storeSecondaryPanelPath();
        const tmpContent: Moim.Blockit.Blocks[] | null =
          content !== "" ? [{ type: "text", content }] : null;
        vote(
          campaignId,
          executionId,
          {
            status: dialogType === "agree" ? "accepted" : "rejected",
            redirectUrl: location.href,
          },
          tmpContent,
          cancelTokenSource.current.token,
        )
          .catch(() => {
            removePaymentRedirectLastSeen();
            removePaymentRedirectRequest();
            removeStoreRedirectBlocks();
          })
          .finally(() => {
            setLoadStatus(false);
            closeDialog();
          });
      }
    },
    [
      campaignId,
      executionId,
      isLoading,
      storeSecondaryPanelPath,
      vote,
      dialogType,
      cancelTokenSource,
      closeDialog,
    ],
  );

  return (
    <WithoutMinHeightResponsiveDialog open={isOpen} onClose={handleCloseDialog}>
      <CustomAppBarModalLayout
        hasAppBarBorder={false}
        appBar={
          <AppBar
            titleElement={
              <FormattedMessage
                id={
                  dialogType === "agree"
                    ? "dialog_vote_for_funding_proposal_agree_title"
                    : "dialog_vote_for_funding_proposal_disagree_title"
                }
              />
            }
            titleAlignment="Center"
            leftButton={
              isMobile ? (
                <CloseButtonWrapper>
                  <CloseButton onClick={handleCloseDialog} />
                  <SpacerVertical value={8} />
                </CloseButtonWrapper>
              ) : (
                <CloseButton onClick={handleCloseDialog} />
              )
            }
          />
        }
        wrapperStyle={
          isMobile
            ? css`
                margin-top: 0;
              `
            : undefined
        }
      >
        <ExecutionVoteComponent
          type={dialogType}
          isLoading={isLoading}
          onClick={handleClickSubmit}
        />
      </CustomAppBarModalLayout>
    </WithoutMinHeightResponsiveDialog>
  );
};

export default ExecutionVoteContainer;
