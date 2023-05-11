import * as React from "react";
import { ThemeContext } from "styled-components";
import { FormattedMessage, useIntl } from "react-intl";
import BoxInput from "common/components/designSystem/boxInput/preset/singleline";
import { Spacer } from "common/components/designSystem/spacer";
import AlertDialog from "common/components/alertDialog";
import useOpenState from "app/common/hooks/useOpenState";
import GroupInput, { IForwardRef } from "common/components/groupInput";
import isEmpty from "common/components/richEditor/helpers/isEmpty";
import { useStoreState } from "app/store";
import { fileListSelector } from "app/selectors/file";
import { StaticSelection } from "common/components/designSystem/selection";
import {
  Wrapper,
  DialogTitle,
  Title,
  Description,
  Inner,
  Footer,
  CancelButton,
  SubmitButton,
  SelectionStyle,
  TokenInputWrapper,
  SuffixLabel,
} from "./styled";

export interface IRef {
  openCancelAlert(): void;
}

interface IProps {
  campaignId: Moim.Id | null;
  currency: string;
  rules: Moim.Campaign.ISimpleExecutionRule[];
  token?: Moim.Campaign.IToken;
  isSubmitLoading: boolean;
  onSubmit(payload: {
    title: string;
    contents: Moim.Blockit.Blocks[];
    ruleId: number;
    amount: number;
  }): void;
  onCancel(): void;
}

const ExecutionCreateComponent = React.forwardRef<IRef, IProps>(
  ({ currency, token, rules, isSubmitLoading, onSubmit, onCancel }, ref) => {
    const refEditor = React.useRef<IForwardRef>(null);
    const intl = useIntl();
    const theme = React.useContext(ThemeContext);
    const [title, setTitle] = React.useState("");
    const [amount, setAmount] = React.useState<number>(0);
    const [tmpContents, setTmpContents] = React.useState<Moim.Blockit.Blocks[]>(
      [],
    );
    const [tmpFiles, setTmpFiles] = React.useState<Moim.Blockit.IFileBlock[]>(
      [],
    );
    const [rule, setRule] = React.useState<string | null>(null);
    const { storeState } = useStoreState(state => ({ storeState: state }));

    const {
      isOpen: cancelAlertOpen,
      open: handleCancelAlertOpen,
      close: handleCancelAlertClose,
    } = useOpenState(false);
    const {
      isOpen: submitAlertOpen,
      open: handleSubmitAlertOpen,
      close: handleSubmitAlertClose,
    } = useOpenState(false);
    const {
      isOpen: openUploadLoadingAlert,
      open: handleOpenUploadLoadingAlert,
      close: handleCloseUploadLoadingAlert,
    } = useOpenState();

    const isEmptyContent = React.useMemo(() => {
      const { isEmptyText } = isEmpty(tmpContents);
      return isEmptyText;
    }, [tmpContents]);

    const validToSubmit = React.useMemo(
      () => !isEmptyContent && title && amount && rule !== null,
      [amount, isEmptyContent, rule, title],
    );

    const checkUploadDone = React.useCallback(() => {
      const ids = refEditor.current?.getUploadQueue();
      if (!ids) return true;
      const files = fileListSelector(storeState, ids);
      return !files
        .map(f => f?.status.name ?? "WAITING_FOR_UPLOAD")
        .some(statusName => statusName !== "AVAILABLE");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeState.entities.files, refEditor]);

    const handleChange = React.useCallback(
      (_contents: Moim.Blockit.Blocks[], files: Moim.Blockit.IFileBlock[]) => {
        setTmpContents(_contents);
        setTmpFiles(files);
      },
      [],
    );

    const clearInputs = React.useCallback(() => {
      setTitle("");
      setTmpContents([]);
      setTmpFiles([]);
      setRule(null);
    }, []);

    const handleCancel = React.useCallback(() => {
      handleCancelAlertClose();
      handleSubmitAlertClose();
      clearInputs();
      onCancel();
    }, [clearInputs, handleCancelAlertClose, handleSubmitAlertClose, onCancel]);

    const handleSubmit = React.useCallback(() => {
      const allUploadDone = checkUploadDone();
      if (!allUploadDone) {
        handleOpenUploadLoadingAlert();
        return;
      }

      handleCancelAlertClose();
      handleSubmitAlertClose();
      onSubmit({
        title,
        contents: tmpContents.concat(tmpFiles),
        ruleId: parseInt(rule!, 10),
        amount: Number(amount),
      });
      clearInputs();
    }, [
      amount,
      checkUploadDone,
      clearInputs,
      handleCancelAlertClose,
      handleOpenUploadLoadingAlert,
      handleSubmitAlertClose,
      onSubmit,
      rule,
      title,
      tmpContents,
      tmpFiles,
    ]);

    const cancelAlertButtons = React.useMemo(
      () => [
        {
          text: <FormattedMessage id="button_cancel" />,
          textColor: theme.colorV2.colorSet.grey600,
          onClick: handleCancelAlertClose,
        },
        { text: <FormattedMessage id="button_ok" />, onClick: handleCancel },
      ],
      [theme.colorV2.colorSet.grey600, handleCancelAlertClose, handleCancel],
    );

    const submitAlertButtons = React.useMemo(
      () => [
        {
          text: <FormattedMessage id="button_cancel" />,
          textColor: theme.colorV2.colorSet.grey600,
          onClick: handleSubmitAlertClose,
        },
        { text: <FormattedMessage id="button_ok" />, onClick: handleSubmit },
      ],
      [handleSubmit, handleSubmitAlertClose, theme.colorV2.colorSet.grey600],
    );

    const uploadLoadingAlertButtons = React.useMemo(
      () => [
        {
          text: intl.formatMessage({ id: "ok_button" }),
          onClick: handleCloseUploadLoadingAlert,
        },
      ],
      [handleCloseUploadLoadingAlert, intl],
    );

    const handleChangeAmount = React.useCallback((val: string) => {
      const safeVal = parseInt(val.replace(/,/g, ""), 10);
      if (safeVal.toString().length <= 12) {
        if (safeVal >= 0) {
          setAmount(safeVal);
        } else {
          setAmount(0);
        }
      }
    }, []);

    const ruleLabel = React.useCallback(
      (voteDuration: number, passRule: string) => {
        const days = Math.round(voteDuration / 864000);
        const hours = Math.round(voteDuration / 3600);
        const minutes = Math.round(voteDuration / 60);
        let text = "";
        if (days > 0) {
          text = `${intl.formatMessage(
            { id: "time_days" },
            { plain_count: days, formattedCount: days },
          )}`;
        } else if (hours > 0) {
          text = ` ${intl.formatMessage(
            { id: "time_hours" },
            { plain_count: hours, formattedCount: hours },
          )}`;
        } else if (minutes > 0) {
          text = `${intl.formatMessage(
            { id: "time_minutes" },
            { plain_count: minutes, formattedCount: minutes },
          )}`;
        }
        return `${text} | ${intl.formatMessage(
          { id: "dialog_funding_proposal_approval_options_condition" },
          { formattedCount: Math.round(parseInt(passRule, 10)) },
        )}`;
      },
      [intl],
    );

    const executionRuleOptions = React.useMemo(
      () =>
        rules.map(_rule => ({
          value: _rule.id.toString(),
          label: ruleLabel(_rule.voteDuration, _rule.passRule),
        })),
      [ruleLabel, rules],
    );

    const handleChangeCountryCode = React.useCallback((ruleId: any) => {
      setRule(ruleId);
    }, []);

    React.useImperativeHandle(ref, () => ({
      openCancelAlert: handleCancelAlertOpen,
    }));

    React.useEffect(() => {
      if (rule === null && Boolean(rules.length)) {
        setRule(rules[0].id.toString());
      }
    }, [rule, rules]);

    return (
      <>
        <Wrapper>
          <Inner data-scroll-lock-scrollable>
            <div>
              <DialogTitle>
                <FormattedMessage id="dialog_funding_proposal_title" />
              </DialogTitle>
              <Spacer value={8} />
              <Title>
                <FormattedMessage id="dialog_funding_proposal_title_input" />
              </Title>
              <BoxInput
                key="input_title"
                type="text"
                size="Large"
                placeholder={intl.formatMessage({
                  id: "dialog_funding_proposal_title_placeholder",
                })}
                value={title}
                autoFocus={true}
                onChange={setTitle}
              />
              <Spacer value={16} />
              <Title>
                <FormattedMessage id="dialog_funding_proposal_amount_input" />
              </Title>
              <BoxInput
                key="input_amount"
                type="text"
                size="Large"
                placeholder="0"
                suffix={{
                  type: "text",
                  text: currency,
                }}
                value={amount.toLocaleString()}
                onChange={handleChangeAmount}
              />

              {token && (
                <>
                  <Spacer value={8} />
                  <BoxInput
                    key="input_amount"
                    tabIndex={-1}
                    type="text"
                    size="Small"
                    disabled={true}
                    suffix={{
                      type: "text",
                      text: <SuffixLabel>{token.symbol}</SuffixLabel>,
                    }}
                    value={(amount / token.price).toLocaleString()}
                    wrapperStyle={TokenInputWrapper}
                  />
                </>
              )}
              <Spacer value={16} />
              <Title>
                <FormattedMessage id="dialog_funding_proposal_approval_options" />
              </Title>
              <Description>
                <FormattedMessage id="dialog_funding_proposal_approval_options_description" />
              </Description>
              <Spacer value={8} />
              <StaticSelection
                size="l"
                state="normal"
                selected={rule}
                options={executionRuleOptions}
                isMultiple={false}
                useSearch={false}
                placeholder={intl.formatMessage({
                  id: "dialog_funding_proposal_approval_options_placeholder",
                })}
                overrideStyle={SelectionStyle}
                onChange={handleChangeCountryCode}
              />

              <Spacer value={16} />
              <Title>
                <FormattedMessage id="dialog_funding_proposal_description_input" />
              </Title>
              <Spacer value={8} />
              <GroupInput
                ref={refEditor}
                id="createReviewDialog"
                placeholder={intl.formatMessage({
                  id: "dialog_funding_proposal_description_placeholder",
                })}
                value={tmpContents}
                maxAttachmentCount={50}
                minInputLine={3}
                autoFocus={false}
                useSaveButton={false}
                useImageFileAttachButton={true}
                disableCreateMeeting={true}
                onChange={handleChange}
                onCancel={handleCancel}
              />
            </div>
          </Inner>
          <Footer>
            <CancelButton onClick={handleCancelAlertOpen}>
              <FormattedMessage id="button_cancel" />
            </CancelButton>
            <SubmitButton
              waiting={isSubmitLoading}
              disabled={!validToSubmit || isSubmitLoading}
              onClick={handleSubmitAlertOpen}
            >
              <FormattedMessage id="button_submit" />
            </SubmitButton>
          </Footer>
        </Wrapper>

        <AlertDialog
          key="leave_alert"
          open={cancelAlertOpen}
          content={
            <FormattedMessage id="dialog_funding_proposal_leave_alert" />
          }
          rightButtons={cancelAlertButtons}
          onClose={handleCancelAlertClose}
        />
        <AlertDialog
          key="submit_alert"
          open={submitAlertOpen}
          content={<FormattedMessage id="dialog_funding_proposal_post_alert" />}
          rightButtons={submitAlertButtons}
          onClose={handleSubmitAlertClose}
        />
        <AlertDialog
          key="upload_alert"
          open={openUploadLoadingAlert}
          content={
            <FormattedMessage id="product_show_qna_question_create_dialog_upload_working_message" />
          }
          rightButtons={uploadLoadingAlertButtons}
          onClose={handleCloseUploadLoadingAlert}
        />
      </>
    );
  },
);

export default ExecutionCreateComponent;
