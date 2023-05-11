import * as React from "react";
import { rgba } from "polished";
import { css } from "styled-components";
import { FormattedMessage } from "react-intl";
import Chip from "common/components/chips";
import { Spacer } from "common/components/designSystem/spacer";

interface IProps {
  rangeStart: number;
  rangeEnd: number;
  maxTokenId: number | null;
}

const ScheduleMaxTokenStyle = css`
  color: ${props => props.theme.colorV2.accent};
  background-color: ${props => rgba(props.theme.colorV2.accent, 0.14)};
`;

const ScheduleTokenSoldOutStyle = css`
  color: ${props => props.theme.color.red700};
  background-color: ${props => props.theme.color.red200};
`;

const Schedule: React.FC<IProps> = ({
  rangeStart,
  rangeEnd,
  maxTokenId,
}: IProps) => (
  <>
    <Spacer value={8} />
    {maxTokenId !== null &&
      (maxTokenId > rangeEnd - rangeStart ? (
        <Chip
          size="small"
          shape="round"
          overrideStyle={ScheduleTokenSoldOutStyle}
        >
          <FormattedMessage id="label_nft_sold_out" />
        </Chip>
      ) : (
        <Chip size="small" shape="round" overrideStyle={ScheduleMaxTokenStyle}>
          <FormattedMessage
            id="label_nft_sold"
            values={{ count: maxTokenId ?? 0 }}
          />
        </Chip>
      ))}
  </>
);

export default React.memo(Schedule);
