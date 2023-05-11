import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import BackIcon from "@icon/24-back-b.svg";

import AppBar from "common/components/appBar";
import GroupForm from "./components/step";
import {
  Wrapper,
  BackIconWrapper,
  ModalLayoutContainer,
} from "./components/styled";

import { useProps, useHandlers } from "./hooks";
import { SignInRenderer } from "../landing";
import { CreateMoimStep } from "app/enums";

export default function CreateGroup() {
  const hookProps = useProps();
  const hookHandlers = useHandlers(hookProps);

  const {
    cryptoBadgeAccessToken,
    classes,
    step,
    percentOfStep,
    name,
    domain,
    access,
    icon,
    username,
    clearMoimIcon,
  } = hookProps;
  const { handleBackButtonClick, handleNextButtonClick } = hookHandlers;

  React.useEffect(() => {
    clearMoimIcon();
  }, [clearMoimIcon]);

  return (
    <Wrapper>
      <SignInRenderer cryptoBadgeAccessToken={cryptoBadgeAccessToken} />
      <AppBar
        leftButton={
          step !== CreateMoimStep.MOIM_RESULT && (
            <BackIconWrapper>
              <BackIcon size="s" onClick={handleBackButtonClick} />
            </BackIconWrapper>
          )
        }
        titleElement={null}
      />
      <LinearProgress
        variant="determinate"
        value={percentOfStep}
        classes={{
          root: classes.root,
          barColorPrimary: classes.barColorPrimary,
        }}
      />
      <ModalLayoutContainer>
        <GroupForm
          currentStep={step}
          name={name}
          domain={domain}
          access={access}
          icon={icon}
          username={username}
          handleNextButtonClick={handleNextButtonClick}
        />
      </ModalLayoutContainer>
    </Wrapper>
  );
}
