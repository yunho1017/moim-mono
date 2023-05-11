import * as React from "react";
import { FormattedMessage } from "react-intl";
import {
  Container,
  Contents,
  Text,
  Buttons,
  RequestButton,
  DismissButton,
  CloseButton,
} from "./styled";
import useIsMobile from "common/hooks/useIsMobile";

interface IProps {
  moimName: string;
  onRequestClick: VoidFunction;
  onDismissClick: VoidFunction;
}

const NotificationRequestComponent: React.FC<IProps> = ({
  moimName,
  onRequestClick,
  onDismissClick,
}) => {
  const isMobile = useIsMobile();

  return (
    <Container>
      <Contents>
        <Text>
          <FormattedMessage
            id="notification/induce_web_noti_permission_agreement_dailog_body"
            values={{ moim_name: moimName }}
          />
        </Text>
        <CloseButton onClick={onDismissClick} />
      </Contents>
      <Buttons>
        <RequestButton onClick={onRequestClick}>
          <FormattedMessage id="notification/induce_web_noti_permission_agreement_dailog_button" />
        </RequestButton>
        {!isMobile && (
          <DismissButton onClick={onDismissClick}>
            <FormattedMessage id="do_next_button" />
          </DismissButton>
        )}
      </Buttons>
    </Container>
  );
};
export default NotificationRequestComponent;
