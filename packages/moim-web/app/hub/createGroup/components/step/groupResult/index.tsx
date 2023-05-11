import * as React from "react";

import getIcon from "app/hub/createGroup/helpers/getIcon";

import { Wrapper, GroupName, OverrideDescription } from "./styled";
import GroupProfileImage from "common/components/groupProfileImage";
import BaseTemplate from "../template";

import { IGroupIcon } from "../groupIcon";

interface IProps {
  name: string;
  domain: string;
  icon: IGroupIcon | null;
  stepData?: Moim.Group.ICreateMoimStepData;
  handleButtonClick?: () => void;
}

export default function GroupResult({
  name,
  domain,
  icon,
  stepData,
  handleButtonClick,
}: IProps) {
  const profile: Moim.IIcon | null = getIcon(icon);

  if (!stepData) {
    return null;
  }

  return (
    <BaseTemplate stepData={stepData} link={domain} onClick={handleButtonClick}>
      <Wrapper>
        <GroupProfileImage icon={profile} title={name} size="xxl" />
        <GroupName>{name}</GroupName>
        <OverrideDescription>{stepData.description}</OverrideDescription>
      </Wrapper>
    </BaseTemplate>
  );
}
