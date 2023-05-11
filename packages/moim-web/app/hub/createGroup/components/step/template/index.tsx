import * as React from "react";

import { MOIM_AUTO_SIGN_IN_KEY } from "common/constants/keys";
import {
  Header,
  Contents,
  Description,
  Title,
  SubTitle,
  SmallModalLayoutButton,
} from "./styled";
import ExternalMoimLink from "common/components/externalMoimLink";

interface IProps extends React.PropsWithChildren<{}> {
  stepData: Moim.Group.ICreateMoimStepData;
  disabledButton?: boolean;
  waitingButton?: boolean;
  link?: string;
  onClick?: () => void;
}

export default function BaseTemplate({
  stepData,
  disabledButton,
  waitingButton,
  link,
  onClick,
  children,
}: IProps) {
  const buttonElement = (
    <SmallModalLayoutButton
      onClick={onClick}
      description={stepData.buttonDescription}
      disabled={disabledButton}
      waiting={waitingButton}
    >
      {stepData.buttonText}
    </SmallModalLayoutButton>
  );

  return (
    <>
      <Header>
        <Title>{stepData.title}</Title>
        {stepData.subTitle && <SubTitle>{stepData.subTitle}</SubTitle>}
      </Header>
      <Contents>{children}</Contents>
      {link ? (
        <ExternalMoimLink domain={link} query={`${MOIM_AUTO_SIGN_IN_KEY}=true`}>
          {buttonElement}
        </ExternalMoimLink>
      ) : (
        buttonElement
      )}
    </>
  );
}

export { Description };
