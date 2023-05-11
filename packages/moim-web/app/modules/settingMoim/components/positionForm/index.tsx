import * as React from "react";
import {
  FormWrapper,
  SubmitButton,
  SubmitButtonWrapper,
  Wrapper,
} from "./styled";
import FreezeView from "common/components/freezeView";
import PositionPreview from "./components/positionPreview";
import { useHandlers, useProps } from "./hooks";
import PositionNameForm from "./components/positionNameForm";
import PositionDescriptionForm from "./components/positionDescriptionForm";
import PositionColorForm from "./components/positionColorForm";
import { FORM_MODE } from "common/constants/form";
import { Divider } from "common/components/itemCell/styled";

export interface IProps {
  mode: FORM_MODE;
  onSubmit: (data: Moim.Position.IPositionFormData) => void;
  positionId?: Moim.Id;
  name?: string;
  description?: string;
  color?: string;
}

function PositionForm(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  const {
    name,
    nameValidationError,
    description,
    descriptionValidationError,
    color,
    userName,
    userProfileImage,
    isCanSubmit,
    buttonText,
  } = hookProps;
  const {
    handleChangeName,
    handleChangeDescription,
    handleChangeColor,
    handleSubmit,
  } = hookHandlers;

  return (
    <Wrapper>
      <PositionPreview
        positionName={name}
        positionColor={color}
        userName={userName}
        userProfileImage={userProfileImage}
      />

      <Divider />

      <FreezeView isFreeze={false}>
        <FormWrapper>
          <PositionNameForm
            name={name}
            onChange={handleChangeName}
            error={nameValidationError}
          />

          <PositionDescriptionForm
            description={description}
            onChange={handleChangeDescription}
            error={descriptionValidationError}
          />

          <PositionColorForm color={color} onChange={handleChangeColor} />
        </FormWrapper>
      </FreezeView>

      <SubmitButtonWrapper>
        <SubmitButton disabled={!isCanSubmit} onClick={handleSubmit}>
          {buttonText}
        </SubmitButton>
      </SubmitButtonWrapper>
    </Wrapper>
  );
}

export default PositionForm;
