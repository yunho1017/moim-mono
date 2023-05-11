import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B2RegularStyle } from "common/components/designSystem/typos";
import EnabledSendIcon from "@icon/24-send-b.svg";
import DisabledSendIcon from "@icon/24-send-g.svg";
import { useIntl } from "react-intl";

export const IconButton = styled.button.attrs({ tabIndex: -1 })`
  width: ${px2rem(40)};
  height: ${px2rem(40)};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-radius: ${px2rem(2)};
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }
`;

const Wrapper = styled.div`
  margin: ${px2rem(8)} ${px2rem(16)} ${px2rem(24)};
  border-radius: ${px2rem(4)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey200};
`;
const InputContainer = styled.div`
  width: 100%;
  padding: ${px2rem(8)} ${px2rem(16)};

  input {
    width: 100%;
    border: none;
    outline: none;
    color: ${props => props.theme.colorV2.colorSet.grey800};
    ${B2RegularStyle};
  }
`;
const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: ${px2rem(40)};
`;

interface IProps {
  disabled?: boolean;
  onSend(string: string): void;
}

const SimpleMessageInput: React.FC<IProps> = ({ onSend }) => {
  const intl = useIntl();
  const [msg, setMsg] = React.useState("");

  const handleSend = React.useCallback(() => {
    if (msg.trim()) {
      onSend(msg);
      setMsg("");
    }
  }, [msg, onSend]);

  const handleClickSend = React.useCallback(() => {
    handleSend();
  }, [handleSend]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      setMsg(e.currentTarget.value);
    },
    [],
  );
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(
    e => {
      if (e.keyCode === 13) {
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <Wrapper>
      <InputContainer>
        <input
          type="text"
          value={msg}
          placeholder={intl.formatMessage({
            id: "video_chat/screen/chat_placeholder",
          })}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </InputContainer>
      <ToolbarContainer>
        <IconButton
          key="send_buttons"
          disabled={!msg}
          onClick={handleClickSend}
        >
          {msg ? (
            <EnabledSendIcon size="s" touch={40} />
          ) : (
            <DisabledSendIcon size="s" touch={40} />
          )}
        </IconButton>
      </ToolbarContainer>
    </Wrapper>
  );
};

export default SimpleMessageInput;
