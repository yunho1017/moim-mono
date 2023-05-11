import * as React from "react";

import { IIconDataWithHandler } from "../interface";

import { FormattedMessage } from "react-intl";
import GroupProfileImage from "common/components/groupProfileImage";

import BaseTemplate from "../template";
import {
  Wrapper,
  MediaWrapper,
  Optional,
  OverrideDescription,
  Loader,
  UpLoadImageIcon,
} from "./styled";
import { useProps, useHandlers } from "./hooks";
import MoimIconUploader from "common/components/moimIconUploader";

export interface IGroupIcon {
  src: string;
  icon?: Moim.Group.IGroupImagePreview;
}

export interface IProps {
  data: IIconDataWithHandler;
  groupName: string;
  stepData?: Moim.Group.ICreateMoimStepData;
  handleButtonClick: () => void;
}

export default function GroupIcon(props: IProps) {
  const hookProps = useProps(props);
  const hookHandlers = useHandlers(hookProps);

  const {
    data,
    stepData,
    groupName,
    cropIcon,
    isIconLoading,
    handleButtonClick,
  } = hookProps;
  const {
    handleStartUploadIcon,
    handleSuccessUploadIcon,
    handleFailUploadIcon,
  } = hookHandlers;

  if (!stepData) {
    return null;
  }

  return (
    <BaseTemplate
      stepData={stepData}
      onClick={handleButtonClick}
      disabledButton={data.isLoading}
    >
      <Wrapper>
        <label>
          <MediaWrapper>
            <GroupProfileImage icon={cropIcon} title={groupName} size="xxl" />
            {isIconLoading ? <Loader /> : <UpLoadImageIcon />}
          </MediaWrapper>

          <Optional>
            <FormattedMessage id="create_moim/moim_icon/optional" />
          </Optional>

          <MoimIconUploader
            onStartLoading={handleStartUploadIcon}
            onSucceed={handleSuccessUploadIcon}
            onFailed={handleFailUploadIcon}
          />
        </label>
      </Wrapper>
      <OverrideDescription>{stepData.description}</OverrideDescription>
    </BaseTemplate>
  );
}
