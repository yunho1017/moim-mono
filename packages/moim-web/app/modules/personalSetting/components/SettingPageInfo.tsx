import * as React from "react";
import {
  SettingPageTitle,
  SettingPageDescription,
  SettingPageInfoWrapper,
} from "../styled";

interface IProps {
  title: React.ReactNode;
  description?: React.ReactNode;
}

export default function SettingPageInfo(props: IProps) {
  const { title, description } = props;
  return (
    <SettingPageInfoWrapper>
      <SettingPageTitle>{title}</SettingPageTitle>
      {description && (
        <SettingPageDescription>{description}</SettingPageDescription>
      )}
    </SettingPageInfoWrapper>
  );
}
