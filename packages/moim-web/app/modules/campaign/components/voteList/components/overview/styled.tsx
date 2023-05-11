import styled from "styled-components";
import RightArrowBase from "@icon/18-rightarrow-g.svg";
import CircleRightArrowBase from "@icon/18-rightcircle-g.svg";
import { px2rem } from "common/helpers/rem";
import { FlatButton } from "common/components/designSystem/buttons";
import {
  H4Bold,
  B4Regular,
  H8Bold,
  B3RegularStyle,
  H10BoldStyle,
  H9Bold,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding-bottom: ${px2rem(90)};
  }
`;

export const Status = styled(B4Regular)<{
  status: Moim.Campaign.CampaignExecutionStatus;
}>`
  padding: ${px2rem(2)} ${px2rem(16)};
  color: ${props => {
    switch (props.status) {
      case "proposed": {
        return props.theme.color.cobalt800;
      }
      case "rejected": {
        return props.theme.color.red700;
      }

      default: {
        return props.theme.colorV2.colorSet.grey300;
      }
    }
  }};
`;

export const Title = styled(H4Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const InfoBox = styled.div`
  width: 100%;
  height: fit-content;
  padding: ${px2rem(4)} ${px2rem(16)};

  .box {
    width: 100%;
    height: fit-content;
    padding: ${px2rem(8)} 0 ${px2rem(8)};
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
    border-radius: ${px2rem(4)};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      padding: ${px2rem(12)} 0;
    }
  }
`;

export const AmountLabel = styled(B4Regular)`
  padding: ${px2rem(2)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const AmountValue = styled(H8Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const TokenValue = styled(B4Regular)`
  padding: ${px2rem(2)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const InfoColumRow = styled.div<{ thickTopBottom?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${props => (props.thickTopBottom ? px2rem(12) : px2rem(6))}
    ${px2rem(16)};

  .left {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    color: ${props => props.theme.colorV2.colorSet.grey300};
    ${B3RegularStyle};
  }

  .right {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    flex: 1;
    min-width: 0;
    text-align: right;
    color: ${props => props.theme.colorV2.colorSet.grey800};
    ${H10BoldStyle};
  }
`;

export const ChartTitleContainer = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
  display: flex;
  align-items: center;
`;
export const ChartTitle = styled(H9Bold)`
  width: 100%;
  min-width: 0;
  padding: ${px2rem(8)} 0 ${px2rem(12)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const CircleMoreWrapper = styled.div`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AgreementColorBox = styled.div`
  display: inline-block;
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  background-color: ${props => props.theme.color.green400};
  border-radius: ${px2rem(2)};
  margin-right: ${px2rem(8)};
`;

export const DisagreementColorBox = styled.div`
  display: inline-block;
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  background-color: ${props => props.theme.color.red700};
  border-radius: ${px2rem(2)};
  margin-right: ${px2rem(8)};
`;

export const CircularBarWrapper = styled.div`
  width: ${px2rem(126)};
  height: ${px2rem(126)};
`;

export const CircleMoreIcon = styled(CircleRightArrowBase).attrs({
  size: "xs",
})``;

export const MoreIcon = styled(RightArrowBase).attrs({ size: "xs" })``;

export const ButtonWrapper = styled.div`
  width: 100%;
  padding: ${px2rem(16)} ${px2rem(16)} ${px2rem(24)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    position: sticky;
    bottom: 0;
  }
`;
export const TransferButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
`;

export const MiddleDot = styled.span`
  display: inline-block;
  margin: 0 ${px2rem(4)};
`;
