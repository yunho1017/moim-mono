import * as React from "react";
import {
  Container,
  Wrapper,
  Icon,
  Title,
  Description,
  ButtonContainer,
} from "../styled";

interface IProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  buttons?: React.ReactNode[];
}

function FeedbackBase({ icon, title, description, buttons }: IProps) {
  return (
    <Container>
      <Wrapper>
        <Icon>{icon}</Icon>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </Wrapper>

      {buttons && Boolean(buttons.length) && (
        <ButtonContainer>{buttons}</ButtonContainer>
      )}
    </Container>
  );
}

export default FeedbackBase;
