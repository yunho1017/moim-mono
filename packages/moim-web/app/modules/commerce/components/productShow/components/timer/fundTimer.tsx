import * as React from "react";
import styled, { css } from "styled-components";
import ChipBase from "common/components/chips";
import { px2rem } from "common/helpers/rem";
import { calculateDDay, DDayType } from "app/common/components/period/helper";
import DDayComponent from "common/components/period";
import useProductStatusLabel from "common/components/commerce/statusLabel";
import { rgba } from "polished";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChipBaseStyle = css`
  margin-bottom: ${px2rem(8)};
`;

interface IProps {
  endDateTime: number;
  startDateTime?: number;
}

const FundTimer: React.FC<IProps> = ({ startDateTime, endDateTime }) => {
  const { scheduledText, completedText } = useProductStatusLabel("fund");
  const [isBegin, setBeginStatus] = React.useState(
    !startDateTime ? true : startDateTime - Date.now() <= 0,
  );
  const [isEnd, setEndStatus] = React.useState(
    !endDateTime ? false : endDateTime - Date.now() <= 0,
  );
  const handleBeginCheck = React.useCallback(() => {
    if (startDateTime) {
      setBeginStatus(startDateTime - Date.now() <= 0);
    }
  }, [startDateTime]);

  const handleEndCheck = React.useCallback(() => {
    if (endDateTime) {
      setEndStatus(endDateTime - Date.now() <= 0);
    }
  }, [endDateTime]);

  const [dDayDate, setDDayDate] = React.useState<DDayType | null>(
    calculateDDay({
      startTime: startDateTime,
      endTime: endDateTime,
    }),
  );

  const chipStyle = React.useMemo(() => {
    if (!isBegin && !isEnd) {
      // before start
      return css`
        background-color: ${props => rgba(props.theme.colorV2.accent, 0.06)};
        color: ${props => props.theme.colorV2.accent};
        ${ChipBaseStyle}
      `;
    }
    if (isEnd) {
      return css`
        background-color: ${props => props.theme.colorV2.colorSet.grey600};
        color: ${props => props.theme.colorV2.colorSet.white1000};
        ${ChipBaseStyle}
      `;
    }
    if (isBegin) {
      return css`
        background-color: ${props => props.theme.colorV2.accent};
        color: ${props => props.theme.colorV2.colorSet.fog800};
        ${ChipBaseStyle}
      `;
    }
  }, [isBegin, isEnd]);

  React.useLayoutEffect(() => {
    if (startDateTime) {
      const tick = setInterval(() => {
        handleBeginCheck();
      }, 1000);
      return () => {
        clearInterval(tick);
      };
    }
  }, [startDateTime, handleBeginCheck]);

  React.useLayoutEffect(() => {
    const tick = setInterval(() => {
      setDDayDate(
        calculateDDay({
          startTime: startDateTime,
          endTime: endDateTime,
        }),
      );
      handleEndCheck();
    }, 1000);
    return () => {
      clearInterval(tick);
    };
  }, [endDateTime, handleEndCheck, startDateTime]);

  return (
    <ChipBase shape="round" size="large" overrideStyle={chipStyle}>
      {isEnd ? (
        completedText
      ) : isBegin ? (
        <Wrapper>
          <DDayComponent dDay={dDayDate} />
        </Wrapper>
      ) : (
        scheduledText
      )}
    </ChipBase>
  );
};

export default FundTimer;
