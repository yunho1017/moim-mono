import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { B4RegularStyle } from "common/components/designSystem/typos";

export const OutcomeContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: ${px2rem(2)};

  .icon {
    width: ${px2rem(18)};
    height: ${px2rem(18)};
  }

  .text {
    flex: 1;
    min-width: 0;
    ${useSingleLineStyle}
  }
`;

export const Footer = styled.div`
  display: flex;
  height: ${px2rem(34)};
  padding: ${px2rem(7)} ${px2rem(8)};
  overflow: hidden;

  .left,
  .right {
    display: flex;
    min-width: 0;
  }

  .left {
    gap: ${px2rem(4)};
  }

  .right {
    margin-left: ${px2rem(16)};
  }
`;

export const OutcomeFooter = styled(Footer)`
  flex-wrap: wrap;
  gap: ${px2rem(8)};
`;

export const ProgressFooter = styled.div`
  display: flex;
  padding: ${px2rem(4)} ${px2rem(6)};
  margin: ${px2rem(6)} ${px2rem(8)};

  height: ${px2rem(24)};
  border-radius: ${px2rem(6)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey100};
  gap: ${px2rem(8)};

  .progress,
  .left,
  .right {
    display: flex;
  }

  .progress {
    flex: 1;
    width: 100%;
    min-width: 0;
    display: flex;
    align-items: center;
  }

  .left,
  .right {
    ${B4RegularStyle}
    color: ${props => props.theme.colorV2.colorSet.grey800}
  }

  .left {
    justify-content: flex-start;

  }

  .right {
    justify-content: flex-end;

  }
`;

export const CTAContainer = styled.div`
  display: flex;
  height: ${px2rem(48)};
  padding: ${px2rem(8)};
  overflow: hidden;
`;
