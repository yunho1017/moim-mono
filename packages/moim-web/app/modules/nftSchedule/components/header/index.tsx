import * as React from "react";
import AppBar from "common/components/appBar";
import { useProps } from "./useHook";
import {
  getAppBarWrapperStyle,
  AppBarWrapperStickedStyle,
  CenterAlignmentWrapper,
  Title,
} from "./styled";
import ShavedText from "common/components/shavedText";
import { WithENWordKeepAllStyle } from "common/components/designSystem/styles";
import BackIcon from "@icon/24-back-b.svg";

interface IProps {
  title: string;
}

const NFTScheduleShowHeader: React.FC<IProps> = ({ title }) => {
  const { appBarTopPosition, onBack } = useProps();

  const titleElement = React.useMemo(
    () => (
      <Title>
        <ShavedText
          value={<WithENWordKeepAllStyle>{title}</WithENWordKeepAllStyle>}
          line={1}
        />
      </Title>
    ),
    [title],
  );

  return (
    <AppBar
      alwaysShowAppBarTitle={true}
      wrapperStickyStyle={getAppBarWrapperStyle(appBarTopPosition)}
      wrapperStickedStyle={AppBarWrapperStickedStyle}
      titleElement={titleElement}
      enableScrollParallax={true}
      useScrollDownHide={false}
      parallaxWrapperComponent={CenterAlignmentWrapper}
      leftButton={
        <BackIcon size="s" touch={44} role="button" onClick={onBack} />
      }
    />
  );
};

export default NFTScheduleShowHeader;
