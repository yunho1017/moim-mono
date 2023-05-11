import * as React from "react";
import { IGroupDataWithHandler, IIconDataWithHandler } from "./interface";

import GroupAccess from "./groupAccess";
import GroupIcon from "./groupIcon";
import GroupName from "./groupName";
import Username from "./username";
import GroupResult from "./groupResult";
import GroupUrl from "./groupUrl";

import { FormWrapper, Form } from "../styled";

import { getStepData } from "../../helpers/getStepData";
import { CreateMoimStep } from "app/enums";

interface IProps {
  currentStep: number;
  name: IGroupDataWithHandler<string>;
  domain: IGroupDataWithHandler<string>;
  access: IGroupDataWithHandler<Moim.Channel.AccessRight>;
  icon: IIconDataWithHandler;
  username: IGroupDataWithHandler<string>;
  handleNextButtonClick: () => void;
}

export default function GroupForm({
  currentStep,
  name,
  domain,
  access,
  icon,
  username,
  handleNextButtonClick,
}: IProps) {
  return (
    <FormWrapper step={currentStep}>
      <Form>
        <GroupName
          stepData={getStepData(CreateMoimStep.MOIM_NAME)}
          handleButtonClick={handleNextButtonClick}
          data={name}
        />
      </Form>
      <Form>
        <GroupUrl
          stepData={getStepData(CreateMoimStep.MOIM_DOMAIN)}
          handleButtonClick={handleNextButtonClick}
          data={domain}
        />
      </Form>
      <Form>
        <GroupAccess
          stepData={getStepData(CreateMoimStep.MOIM_ACCESS)}
          handleButtonClick={handleNextButtonClick}
          data={access}
        />
      </Form>
      <Form>
        <GroupIcon
          stepData={getStepData(CreateMoimStep.MOIM_ICON)}
          handleButtonClick={handleNextButtonClick}
          data={icon}
          groupName={name.value}
        />
      </Form>
      <Form>
        <Username
          stepData={getStepData(CreateMoimStep.USER_NAME, name.value)}
          handleButtonClick={handleNextButtonClick}
          data={username}
        />
      </Form>
      <Form>
        <GroupResult
          stepData={getStepData(CreateMoimStep.MOIM_RESULT)}
          icon={icon.value}
          name={name.value}
          domain={domain.value}
          handleButtonClick={handleNextButtonClick}
        />
      </Form>
    </FormWrapper>
  );
}
