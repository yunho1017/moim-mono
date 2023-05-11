import * as React from "react";
import {
  Wrapper,
  ContentContainer,
  Title,
  Content,
  ButtonContainer,
  LeftButtons,
  RightButtons,
} from "./styled";
import { renderButtons } from "common/components/modalLayout/alert/helper";
import { IButton } from "common/components/modalLayout/alert/types";

export interface IProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  leftButtons?: IButton[];
  rightButtons?: IButton[];
}

function AlertModalLayout(props: IProps) {
  const { title, content, leftButtons, rightButtons } = props;

  return (
    <Wrapper>
      <ContentContainer data-scroll-lock-scrollable>
        {title && <Title>{title}</Title>}
        {content && <Content>{content}</Content>}
      </ContentContainer>

      <ButtonContainer>
        {leftButtons && <LeftButtons>{renderButtons(leftButtons)}</LeftButtons>}

        {rightButtons && (
          <RightButtons>{renderButtons(rightButtons)}</RightButtons>
        )}
      </ButtonContainer>
    </Wrapper>
  );
}

export default AlertModalLayout;
