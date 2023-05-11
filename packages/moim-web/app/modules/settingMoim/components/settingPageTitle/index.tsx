import * as React from "react";
import { Title } from "./styled";
import { BaseItemCell } from "common/components/itemCell";

interface IProps {
  title: string;
}

function SettingPageTitle({ title }: IProps) {
  return <BaseItemCell title={<Title>{title}</Title>} size="s" />;
}

export default SettingPageTitle;
