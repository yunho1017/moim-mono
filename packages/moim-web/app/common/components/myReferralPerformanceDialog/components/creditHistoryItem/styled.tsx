import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B2RegularStyle,
  B4RegularStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  height: ${px2rem(64)};
  display: flex;
  align-items: flex-start;
  padding: ${px2rem(12)} ${px2rem(16)};
`;

export const Left = styled.div`
  width: ${px2rem(40)};
  margin-right: ${px2rem(8)};
`;
export const Right = styled.div`
  width: 100%;
  height: fit-content;
  flex: 1;
  min-width: 0;

  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;

  & + & {
    margin-top: ${px2rem(2)};
  }
`;

export const Title = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  height: ${px2rem(22)};

  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B2RegularStyle};
`;

export const Description = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;
  height: ${px2rem(16)};
  margin-right: ${px2rem(4)};

  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${useSingleLineStyle}
  ${B4RegularStyle};
`;

export const CreditLabel = styled.span<{
  colorType: "blue" | "red" | "black";
}>`
  display: inline-block;

  flex: 1;
  min-width: 0;
  text-align: right;
  color: ${props => {
    switch (props.colorType) {
      case "black":
        return props.theme.colorV2.colorSet.grey800;
      case "red":
        return props.theme.color.red700;
      case "blue":
        return props.theme.color.cobalt800;
    }
  }};

  ${H10BoldStyle}
`;

export const ExpirationLabel = styled.span`
  display: inline-block;
  flex: 1;
  min-width: 0;
  text-align: right;
  color: ${props => props.theme.colorV2.colorSet.grey200};
  ${B4RegularStyle}
`;

export const LogDateLabel = styled.div`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B4RegularStyle}
  line-height:${px2rem(22)};  // same to Title height
`;
