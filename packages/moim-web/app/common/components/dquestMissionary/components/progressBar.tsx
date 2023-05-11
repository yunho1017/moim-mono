import * as React from "react";
import { rgba } from "polished";
import { LinearProgress } from "@mui/material";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import useTheme from "app/theme/hooks/useTheme";
import CheckIconBase from "@icon/36-check.svg";
import { ThemeType } from "../component";
import { H9BoldStyle } from "common/components/designSystem/typos";

const CheckIcon = styled(CheckIconBase).attrs(props => ({
  size: "xs",
  iconColor:
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.white800
      : props.theme.themeMode.lightPalette.colorSet.grey800,
}))<{ selectedTheme: ThemeType }>``;

const CompleteIcon = styled.div`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  border: ${px2rem(2)} solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: ${props => props.theme.color.green400};
  margin-left: ${px2rem(4)};
`;

const Percentage = styled.div`
  margin-left: ${px2rem(8)};
  ${H9BoldStyle}
`;

const ProgressWrapper = styled.div<{
  value: number;
  selectedTheme: ThemeType;
  barColor?: string;
}>`
  width: 100%;
  height: 100%;
  flex: 1;
  min-width: 0;
  border: ${px2rem(3)} solid;
  border-color: ${props =>
    props.selectedTheme === "black"
      ? props.theme.themeMode.lightPalette.colorSet.grey800
      : props.theme.themeMode.lightPalette.colorSet.white800};
  background-color: ${props =>
    props.selectedTheme === "black"
      ? rgba(props.theme.themeMode.lightPalette.colorSet.grey1000, 0.06)
      : rgba(props.theme.themeMode.lightPalette.colorSet.white1000, 0.06)};
  border-radius: ${px2rem(12)};
  overflow: hidden;

  .lp-root {
    height: ${px2rem(18)};
    border-radius: ${px2rem(12)};
    background-color: transparent;
  }

  .lp-barPrimary {
    height: ${px2rem(18)};
    border-radius: ${px2rem(12)};
    background-color: ${props => props.barColor ?? props.theme.color.green400};

    ::before {
      transition: width 400ms linear;
      content: "";
      position: absolute;
      border-radius: ${px2rem(12)};
      width: ${props => `calc(${props.value}% - ${px2rem(16)})`};
      height: ${px2rem(4)};
      top: ${px2rem(4)};
      right: ${px2rem(8)};
      background-color: ${props =>
        props.selectedTheme === "black"
          ? rgba(0, 0, 0, 0.2)
          : rgba(255, 255, 255, 0.7)};
    }
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    .lp-root {
      height: ${px2rem(16)};
    }
    .lp-barPrimary {
      height: ${px2rem(16)};
    }
  }
`;

const Wrapper = styled.div<{
  selectedTheme: ThemeType;
}>`
  width: 100%;
  height: ${px2rem(24)};
  display: flex;
  align-items: center;

  ${Percentage} {
    color: ${props =>
      props.selectedTheme === "black"
        ? props.theme.themeMode.lightPalette.colorSet.grey800
        : props.theme.themeMode.lightPalette.colorSet.white800};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(20)};
    border-width: ${px2rem(2)};
  }
`;

interface IProps {
  isReJoinable?: boolean;
  value: number;
  max: number;
  selectedTheme: ThemeType;
}

const Progress: React.FC<IProps> = ({
  isReJoinable,
  value,
  max,
  selectedTheme,
}) => {
  const theme = useTheme();
  const currentVal = isReJoinable ? 0 : value;
  const progressVal = React.useMemo(
    () => Math.round((currentVal / max) * 100),
    [max, currentVal],
  );

  return (
    <Wrapper selectedTheme={selectedTheme}>
      <ProgressWrapper
        selectedTheme={selectedTheme}
        value={progressVal}
        barColor={theme?.theme.color.green400}
      >
        <LinearProgress
          variant="determinate"
          classes={{ root: "lp-root", barColorPrimary: "lp-barPrimary" }}
          value={progressVal}
        />
      </ProgressWrapper>

      <Percentage>{progressVal}%</Percentage>
      <CompleteIcon>
        <CheckIcon />
      </CompleteIcon>
    </Wrapper>
  );
};

export default Progress;
