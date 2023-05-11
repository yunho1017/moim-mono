import * as React from "react";
import { FormattedMessage } from "react-intl";
import useIsMobile from "common/hooks/useIsMobile";
import SingleLineBoxInput from "common/components/designSystem/boxInput/preset/singleline";
import {
  Wrapper,
  Body,
  Footer,
  TitleMessage,
  CancelButton,
  SubmitButton,
  InputContainer,
} from "./styled";
import { Spacer } from "common/components/designSystem/spacer";

interface IProps {
  form: Moim.DQuest.IMissionActionForm;
  onClickSubmit(answer: any): void;
  onClickClose(): void;
}

const DQuestFormActionComponent: React.FC<IProps> = ({
  form,
  onClickSubmit,
  onClickClose,
}) => {
  const inputRef = React.useRef<SingleLineBoxInput>(null);
  const isMobile = useIsMobile();
  const [value, setValue] = React.useState("");
  const isEmptyValue = value === "";

  const handleClickSubmit = React.useCallback(() => {
    onClickSubmit(value.trim());
  }, [onClickSubmit, value]);

  const handleChangeInput = React.useCallback((_val: string) => {
    setValue(_val);
  }, []);

  React.useLayoutEffect(() => {
    if (isMobile) {
      // NOTE: 모바일+바텀시트에서 input 사용시 autofocus 동작이 정상적으로 이루어지지 않아서
      // RAF랑 setTimeout으로 살짝 글리치하게 동작시킨 코드입니다.
      requestAnimationFrame(() => {
        setTimeout(() => {
          inputRef.current?.focusInput();
        }, 100);
      });
    }
  }, []);

  return (
    <Wrapper>
      <Body>
        <TitleMessage>
          {form.description ?? (
            <FormattedMessage id="input_answer_fallback_description" />
          )}
        </TitleMessage>
        <InputContainer>
          <SingleLineBoxInput
            ref={inputRef}
            type="text"
            size="Large"
            autoFocus={true}
            status={isEmptyValue ? "Inactive" : "Focused"}
            value={value}
            onChange={handleChangeInput}
          />
        </InputContainer>
        <Spacer value={12} />
      </Body>
      <Footer>
        {isMobile ? (
          <CancelButton onClick={onClickClose}>
            <FormattedMessage id="button_cancel" />
          </CancelButton>
        ) : null}
        <SubmitButton disabled={isEmptyValue} onClick={handleClickSubmit}>
          <FormattedMessage id="button_quest_submit_form" />
        </SubmitButton>
      </Footer>
    </Wrapper>
  );
};

export default DQuestFormActionComponent;
