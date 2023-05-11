import * as React from "react";
import { FormattedMessage } from "react-intl";
import { css } from "styled-components";
import {
  Overview,
  VoteParticipants,
  Transfer,
} from "app/modules/campaign/components/voteList";
import useIsMobile from "common/hooks/useIsMobile";
import useOpenState from "app/common/hooks/useOpenState";
import { FixedHeightBasicDialog } from "common/components/basicResponsiveDialog";
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import AppBar from "common/components/appBar";
import { useStoreState, useActions } from "app/store";
import useHubSeller from "common/hooks/commerce/useHubSeller";
import useCurrentUser from "common/hooks/useCurrentUser";
import {
  selectCampaignProject,
  selectCampaignExecution,
  selectExecutionVotes,
} from "app/selectors/campaign";
import {
  ActionCreators as CampaignActionCreators,
  getExecutionVotes,
  remitExecutionFund,
} from "app/actions/campaign";
import {
  CloseButtonWrapper,
  CloseButton,
  BackButton,
} from "common/components/basicResponsiveDialog/styled";
import RedirectLoadingDialog from "app/modules/campaign/components/redirectLoadingDialog/index";
import { Wrapper, DialogContent, BackButtonWrapper } from "./styled";

export type VOTE_LIST_TYPE = "participant-agree" | "participant-disagree";
export type STEP = "overview" | VOTE_LIST_TYPE | "transfer";

const VoteListContainer: React.FC = ({}) => {
  const isMobile = useIsMobile();
  const hubSeller = useHubSeller();
  const currentUser = useCurrentUser();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [step, setStep] = React.useState<STEP>("overview");
  const [isLoading, setLoadStatus] = React.useState(false);
  const [isTransferSubmitLoading, setTransferSubmitLoadStatus] = React.useState(
    false,
  );
  const [isFetched, setFetchStatus] = React.useState(false);
  const [transferPayload, setTransferPayload] = React.useState<{
    bankCode: string;
    bankAccount: string;
    recipientName: string;
    senderInfo: string;
  } | null>(null);
  const {
    isOpen: isOpenRedirectLoadingDialog,
    open: handleOpenRedirectLoadingDialog,
    close: handleCloseRedirectLoadingDialog,
  } = useOpenState();

  const handleClickToVoteList = React.useCallback((type: VOTE_LIST_TYPE) => {
    setStep(type);
  }, []);

  const {
    campaignId,
    executionId,
    campaign,
    execution,
    isOpen,
    bankCodes,
    votes,
  } = useStoreState(state => {
    const cId = state.campaignPage.currentCampaignId;
    const exeId = state.campaignPage.currentExecutionId;

    return {
      campaignId: cId,
      executionId: exeId,
      campaign: cId ? selectCampaignProject(state, cId) : undefined,
      execution: exeId ? selectCampaignExecution(state, exeId) : undefined,
      isOpen: state.campaignPage.openExecutionVoteListDialog,
      bankCodes: state.commerce.info.nicepayBankCodes,
      votes: {
        accepted: selectExecutionVotes(
          state,
          state.campaignPage.votes.accepted,
        ) as Moim.IPaginatedListResponse<
          Moim.Campaign.IDenormalizedExecutionVote
        >,
        rejected: selectExecutionVotes(
          state,
          state.campaignPage.votes.rejected,
        ) as Moim.IPaginatedListResponse<
          Moim.Campaign.IDenormalizedExecutionVote
        >,
      },
    };
  });
  const { getVotes, dispatchRemitExecutionFund, closeDialog } = useActions({
    getVotes: getExecutionVotes,
    dispatchRemitExecutionFund: remitExecutionFund,
    closeDialog: CampaignActionCreators.closeExecutionVoteListDialog,
  });


  const handleClose = React.useCallback(() => {
    if (!isTransferSubmitLoading) {
      closeDialog();
    }
  }, [isTransferSubmitLoading, closeDialog]);

  const handleLocateToOverview = React.useCallback(() => {
    setStep("overview");
  }, []);

  const handleLocateToTransfer = React.useCallback(() => {
    setStep("transfer");
  }, []);

  const appBarCloseElem = React.useMemo(
    () =>
      step === "overview" ? (
        <CloseButton onClick={handleClose} />
      ) : (
        <BackButtonWrapper>
          <BackButton onClick={handleLocateToOverview} />
        </BackButtonWrapper>
      ),
    [handleClose, handleLocateToOverview, step],
  );

  const handleChangeVoteListType = React.useCallback((type: VOTE_LIST_TYPE) => {
    setStep(type);
  }, []);

  const handleLoadMoreVoter = React.useCallback(
    (
      payload: {
        status: Moim.Campaign.CampaignExecutionVoteStatus;
      } & Moim.IPaging,
    ) => {
      if (executionId && !isLoading) {
        setLoadStatus(true);
        getVotes("more", executionId, payload).finally(() => {
          setLoadStatus(false);
        });
      }
    },
    [executionId, getVotes, isLoading],
  );

  const handleSubmitTransfer = React.useCallback(() => {
    if (campaignId && executionId && transferPayload) {
      setTransferSubmitLoadStatus(true);

      dispatchRemitExecutionFund(campaignId, executionId, {
        bankInformation: {
          bankName: transferPayload.bankCode,
          accountNumber: transferPayload.bankAccount,
          accountName: transferPayload.recipientName,
          recipientMessage: transferPayload.senderInfo,
        },
        redirectUrl: location.href,
      }).finally(() => {
        setTransferSubmitLoadStatus(false);
      });
    }
  }, [campaignId, dispatchRemitExecutionFund, transferPayload, executionId]);

  const handleAfterAction = React.useCallback(() => {
    handleSubmitTransfer();
  }, [handleSubmitTransfer]);

  const handleRedirectLoad = React.useCallback(
    (payload: {
      bankCode: string;
      bankAccount: string;
      recipientName: string;
      senderInfo: string;
    }) => {
      setTransferPayload(payload);
      handleOpenRedirectLoadingDialog();
    },
    [handleOpenRedirectLoadingDialog],
  );

  const contentElem = React.useMemo(() => {
    if (!execution) return <></>;
    switch (step) {
      case "overview": {
        return (
          <Overview
            token={campaign?.token}
            execution={execution}
            currency={hubSeller?.currency ?? "KRW"}
            isCreator={execution.profileId === currentUser?.id}
            onClickToVoteList={handleClickToVoteList}
            onClickToTransfer={handleLocateToTransfer}
          />
        );
      }

      case "participant-agree":
      case "participant-disagree": {
        return (
          <VoteParticipants
            type={step}
            isLoading={isLoading}
            votes={votes}
            onChangeType={handleChangeVoteListType}
            onLoadMore={handleLoadMoreVoter}
          />
        );
      }

      case "transfer": {
        return (
          <Transfer
            isLoading={isTransferSubmitLoading}
            currency={hubSeller?.currency ?? "KRW"}
            token={campaign?.token}
            bankCodes={bankCodes}
            transferAmount={execution.amount}
            onSubmit={handleRedirectLoad}
          />
        );
      }
    }
  }, [
    bankCodes,
    campaign,
    currentUser,
    execution,
    handleChangeVoteListType,
    handleClickToVoteList,
    handleLoadMoreVoter,
    handleLocateToTransfer,
    hubSeller,
    isLoading,
    isTransferSubmitLoading,
    step,
    votes,
    handleRedirectLoad,
  ]);

  const dialogTitle = React.useMemo(() => {
    switch (step) {
      case "overview": {
        return "";
      }

      case "participant-agree":
      case "participant-disagree": {
        return (
          <FormattedMessage id="dialog_vote_result_for_funding_proposal_result_title" />
        );
      }

      case "transfer": {
        return <FormattedMessage id="dialog_transfer_fund_title" />;
      }
    }
  }, [step]);

  React.useEffect(() => {
    if (!isOpen) {
      setStep("overview");
      setLoadStatus(false);
      setFetchStatus(false);
    }
  }, [isOpen]);

  React.useLayoutEffect(() => {
    if (isOpen && executionId && !isLoading && !isFetched) {
      setLoadStatus(true);
      Promise.all([
        getVotes("new", executionId, {
          status: "accepted",
        }),
        getVotes("new", executionId, {
          status: "rejected",
        }),
      ]).finally(() => {
        setFetchStatus(true);
        setLoadStatus(false);
      });
    }
  }, [executionId, getVotes, isFetched, isLoading, isOpen]);

  React.useLayoutEffect(() => {
    wrapperRef.current?.scrollTo(0, 0);
  }, [wrapperRef, step]);

  return (
    <>
      <FixedHeightBasicDialog open={isOpen} onClose={handleClose}>
        <CustomAppBarModalLayout
          hasAppBarBorder={false}
          appBar={
            <AppBar
              titleElement={dialogTitle}
              titleAlignment="Center"
              leftButton={
                isMobile ? (
                  <CloseButtonWrapper>{appBarCloseElem}</CloseButtonWrapper>
                ) : (
                  appBarCloseElem
                )
              }
            />
          }
          contentStyle={step !== "overview" ? DialogContent : undefined}
          disableScrollLock={step !== "overview" && step !== "transfer"}
          wrapperStyle={
            isMobile
              ? css`
                  margin-top: 0;
                `
              : undefined
          }
        >
          <Wrapper ref={wrapperRef}>{contentElem}</Wrapper>
        </CustomAppBarModalLayout>
      </FixedHeightBasicDialog>
      <RedirectLoadingDialog
        open={isOpenRedirectLoadingDialog}
        onAfterAction={handleAfterAction}
        onClose={handleCloseRedirectLoadingDialog}
      />
    </>
  );
};

export default VoteListContainer;
