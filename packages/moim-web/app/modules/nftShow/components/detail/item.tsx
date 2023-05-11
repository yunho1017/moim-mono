import React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B3Regular, H10Bold } from "common/components/designSystem/typos";
import { SpacerVertical } from "common/components/designSystem/spacer";
import ShavedText from "common/components/shavedText";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

const Label = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  text-align: left;
  padding: ${px2rem(6)} 0 ${px2rem(6)} ${px2rem(16)};
  flex: 1;
  min-width: 0;
  word-break: break-all;
`;

const Value = styled(H10Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  text-align: right;
  padding: ${px2rem(6)} ${px2rem(16)} ${px2rem(6)} 0;
  flex: 1;
  min-width: 0;
`;

interface PropsType {
  label: string;
  value: React.ReactNode | string;
}

export const DetailItem: React.FC<PropsType> = React.memo(
  ({ label, value }) => {
    return (
      <Wrapper>
        <Label>{label}</Label>
        <SpacerVertical value={5} />
        <Value>
          <ShavedText value={value} line={1} />
        </Value>
      </Wrapper>
    );
  },
);
