import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import MultilineBoxInput from "common/components/designSystem/boxInput/preset/multiline";
import {
  Wrapper,
  Title,
  Inner,
  Footer,
  DenyVoteButton,
  AgreeVoteButton,
} from "./styled";

interface IProps {
  type: "deny" | "agree";
  isLoading: boolean;
  onClick(content: string): void;
}

const ExecutionVoteComponent: React.FC<IProps> = ({
  isLoading,
  type,
  onClick,
}) => {
  const intl = useIntl();
  const [content, setContent] = React.useState("");

  const handleClick = React.useCallback(() => {
    onClick(content);
  }, [content, onClick]);

  return (
    <Wrapper>
      <Inner>
        <Title>
          <FormattedMessage
            id={
              type === "agree"
                ? "dialog_vote_for_funding_proposal_agree_note_title"
                : "dialog_vote_for_funding_proposal_disagree_note_title"
            }
          />
        </Title>
        <MultilineBoxInput
          autoFocus={true}
          placeholder={intl.formatMessage({
            id:
              type === "agree"
                ? "dialog_vote_for_funding_proposal_agree_note_placeholder"
                : "dialog_vote_for_funding_proposal_disagree_note_placeholder",
          })}
          value={content}
          onChange={setContent}
        />
      </Inner>
      <Footer>
        {type === "agree" ? (
          <AgreeVoteButton waiting={isLoading} onClick={handleClick}>
            <FormattedMessage id="button_agree" />
          </AgreeVoteButton>
        ) : (
          <DenyVoteButton waiting={isLoading} onClick={handleClick}>
            <FormattedMessage id="button_disagree" />
          </DenyVoteButton>
        )}
      </Footer>
    </Wrapper>
  );
};

export default ExecutionVoteComponent;
