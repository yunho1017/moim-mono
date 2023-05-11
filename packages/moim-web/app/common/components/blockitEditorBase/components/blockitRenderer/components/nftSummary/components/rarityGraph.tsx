import * as React from "react";
import { ThemeContext } from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  ProgressBar,
  RarityCircularbarWrapper,
  RarityCircularPercent,
  TextRarity,
} from "./styled";
import { rgba } from "polished";
import { FormattedMessage } from "react-intl";

interface IProps {
  type: "DONUT" | "BAR" | "NORMAL";
  value: number;
}

const RarityGraph = ({ type, value }: IProps) => {
  const theme = React.useContext(ThemeContext);
  const percent = value * 100;
  const textPercent = !Number.isInteger(percent) ? percent.toFixed(1) : percent;

  switch (type) {
    case "DONUT": {
      return (
        <RarityCircularbarWrapper>
          <CircularProgressbar
            value={percent}
            strokeWidth={15}
            counterClockwise={false}
            styles={buildStyles({
              strokeLinecap: "butt",
              pathColor: theme.colorV2.accent,
              trailColor: rgba(theme.colorV2.accent, 0.14),
            })}
          />
          <RarityCircularPercent>{textPercent}%</RarityCircularPercent>
        </RarityCircularbarWrapper>
      );
    }
    case "BAR": {
      return (
        <>
          <ProgressBar
            value={value}
            isFull={Boolean(value === 1)}
          ></ProgressBar>
          <TextRarity>
            {`${textPercent}% `}
            <FormattedMessage id="nft_show_properties_rarity" />
          </TextRarity>
        </>
      );
    }
    default: {
      return (
        <TextRarity>
          {`${textPercent}% `}
          <FormattedMessage id="nft_show_properties_rarity" />
        </TextRarity>
      );
    }
  }
};

export default React.memo(RarityGraph);
