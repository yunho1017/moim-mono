import * as React from "react";
import styled from "styled-components";
import { B4Regular } from "common/components/designSystem/typos";
import { FormattedMessage } from "react-intl";
import { Spacer } from "common/components/designSystem/spacer";

const CurrentBlockNumber = styled(B4Regular)`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

interface IProps {
  value?: number;
}

const CurrentBlock: React.FC<IProps> = ({ value }: IProps) => {
  if (value === undefined) return null;

  return (
    <>
      <Spacer value={6} />
      <CurrentBlockNumber>
        <FormattedMessage id="current_block_number" /> #{value}
      </CurrentBlockNumber>
    </>
  );
};

export default React.memo(CurrentBlock);
