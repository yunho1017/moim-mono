import * as React from "react";
import moment from "moment";
import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import {
  B1RegularStyle,
  B3RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";

const Wrapper = styled.div<{
  size: "normal" | "small";
  overrideStyle?: FlattenInterpolation<any>;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colorV2.accent};
  color: ${props => props.theme.colorV2.colorSet.fog800};

  ${props => {
    if (props.size === "normal") {
      return css`
        width: 100%;
        height: ${px2rem(40)};
        border-radius: ${px2rem(4)};
        ${B1RegularStyle};

        .sep {
          margin: 0 ${px2rem(15)} 0 ${px2rem(13)};
        }

        .unit {
          margin-left: ${px2rem(2)};
          ${B4RegularStyle};
        }

        @media ${MEDIA_QUERY.ONLY_MOBILE} {
          border-radius: 0;
        }
      `;
    } else {
      return css`
        width: ${px2rem(78)};
        height: ${px2rem(21)};
        border-radius: ${px2rem(2)};
        ${B3RegularStyle};

        .sep {
          margin: 0 ${px2rem(2)};
        }
      `;
    }
  }}

  ${props => props.overrideStyle}
`;

interface IProps {
  size: "normal" | "small";
  endDateTime: number;
  overrideStyle?: FlattenInterpolation<any>;
}

const Timer: React.FC<IProps> = ({ size, endDateTime, overrideStyle }) => {
  const destDate = React.useMemo(() => moment(endDateTime), [endDateTime]);
  const [diffDuration, setDiffDuration] = React.useState(
    moment.duration(destDate.diff(moment())),
  );

  const element = React.useMemo(() => {
    const isLessThenADay = diffDuration.asHours() < 24;
    const days = parseInt(`${diffDuration.asDays()}`, 10);
    if (size === "normal") {
      return (
        <>
          {!isLessThenADay && (
            <>
              <div>
                <span>{days < 0 ? 0 : days}</span>
                <span className="unit">
                  {/* <FormattedMessage
                    id="timer_day_full_unit"
                    values={{ count: days }}
                  /> */}
                  d
                </span>
              </div>
              <span className="sep"></span>
            </>
          )}

          <div>
            <span>
              {(diffDuration.hours() < 0
                ? 0
                : diffDuration.hours()
              ).toLocaleString(undefined, { minimumIntegerDigits: 2 })}
            </span>
            <span className="unit">
              {/* <FormattedMessage id="timer_hour_short_unit" /> */}h
            </span>
          </div>
          <span className="sep">:</span>

          <div>
            <span>
              {(diffDuration.minutes() < 0
                ? 0
                : diffDuration.minutes()
              ).toLocaleString(undefined, { minimumIntegerDigits: 2 })}
            </span>
            <span className="unit">
              {/* <FormattedMessage id="timer_minute_short_unit" /> */}m
            </span>
          </div>
          <span className="sep">:</span>

          <div>
            <span>
              {(diffDuration.seconds() < 0
                ? 0
                : diffDuration.seconds()
              ).toLocaleString(undefined, { minimumIntegerDigits: 2 })}
            </span>
            <span className="unit">
              {/* <FormattedMessage id="timer_second_short_unit" /> */}s
            </span>
          </div>
        </>
      );
    }

    return (
      <>
        {!isLessThenADay && (
          <>
            <span>{days}</span>
            <span className="sep">:</span>
          </>
        )}
        <span>
          {(diffDuration.hours() < 0
            ? 0
            : diffDuration.hours()
          ).toLocaleString(undefined, { minimumIntegerDigits: 2 })}
        </span>
        <span className="sep">:</span>
        <span>
          {(diffDuration.minutes() < 0
            ? 0
            : diffDuration.minutes()
          ).toLocaleString(undefined, { minimumIntegerDigits: 2 })}
        </span>
        <span className="sep">:</span>
        <span>
          {(diffDuration.seconds() < 0
            ? 0
            : diffDuration.seconds()
          ).toLocaleString(undefined, { minimumIntegerDigits: 2 })}
        </span>
      </>
    );
  }, [diffDuration, size]);

  React.useEffect(() => {
    const tick = setInterval(() => {
      setDiffDuration(moment.duration(destDate.diff(moment())));
    }, 1000);
    return () => {
      clearInterval(tick);
    };
  }, [destDate]);

  return (
    <Wrapper size={size} overrideStyle={overrideStyle}>
      {element}
    </Wrapper>
  );
};

export default Timer;
