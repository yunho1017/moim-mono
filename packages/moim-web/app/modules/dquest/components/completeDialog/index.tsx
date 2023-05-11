import * as React from "react";
import { FormattedMessage } from "react-intl";
import useIsMobile from "common/hooks/useIsMobile";
import AppBar from "common/components/appBar";
import { CloseButton } from "common/components/basicResponsiveDialog/styled";
import { CustomAppBarModalLayout } from "common/components/modalLayout";
import FreezeView from "common/components/freezeView";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { Spacer } from "common/components/designSystem/spacer";
import {
  Wrapper,
  Body,
  Title,
  Message,
  Divider,
  ActionButton,
  ButtonContainer,
  Transition,
  Dialog,
} from "./styled";

interface IProps {
  open: boolean;
  id?: Moim.Id;
  title?: string;
  message?: string;
  buttonText?: string;
  totalMessageCount?: number;
  onMessageCheck(messageId: Moim.Id): void;
}

const QuestCompleteDialogComponent: React.FC<IProps> = ({
  open,
  id,
  title,
  message,
  buttonText,
  totalMessageCount = 1,
  onMessageCheck,
}) => {
  const isMobile = useIsMobile();

  const handleMessageCheck = React.useCallback(() => {
    if (id) {
      onMessageCheck(id);
    }
  }, [id]);

  const appBar = React.useMemo(
    () => (
      <AppBar
        titleAlignment="Center"
        titleElement={
          totalMessageCount > 1 ? `1/${totalMessageCount}` : undefined
        }
        ignoreMobileTitleAlignment={true}
        leftButton={<CloseButton touch={48} onClick={handleMessageCheck} />}
      />
    ),
    [totalMessageCount, handleMessageCheck],
  );

  return (
    <Dialog
      open={open}
      keepMounted={true}
      TransitionComponent={isMobile ? Transition : undefined}
      onClose={handleMessageCheck}
    >
      <CustomAppBarModalLayout appBar={appBar} hasAppBarBorder={false}>
        <FreezeView isFreeze={open} delayedFreeze={50}>
          <Wrapper>
            {(title || message) && (
              <>
                <Body>
                  {title && (
                    <Title>
                      <NativeEmojiSafeText value={title} />
                    </Title>
                  )}
                  {message && (
                    <Message>
                      <NativeEmojiSafeText value={message} />
                    </Message>
                  )}
                </Body>
                <Spacer value={23} />
                <Divider />
              </>
            )}
            <ButtonContainer>
              <ActionButton onClick={handleMessageCheck}>
                {buttonText ?? <FormattedMessage id="button_ok" />}
              </ActionButton>
            </ButtonContainer>
          </Wrapper>
        </FreezeView>
      </CustomAppBarModalLayout>
    </Dialog>
  );
};

export default React.memo(QuestCompleteDialogComponent);
