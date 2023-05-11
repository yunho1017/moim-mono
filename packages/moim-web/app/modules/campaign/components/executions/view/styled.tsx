import styled, { css } from "styled-components";
import VotedIconBase from "@icon/18-check-circle.svg";
import {
  B4Regular,
  H4Bold,
  H8Bold,
  H10Bold,
  B3RegularStyle,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import {
  FlatGeneralButton,
  FlatButton,
} from "common/components/designSystem/buttons";
import { DefaultDivider } from "common/components/divider/styled";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    max-width: ${px2rem(720)};
    margin: 0 auto;
  }
`;

export const Inner = styled.div`
  width: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: 100%;
    flex: 1;
    min-height: 0;
    padding: 0 ${px2rem(16)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-bottom: ${px2rem(90)};
  }
`;

export const Footer = styled.div`
  position: sticky;
  width: 100%;
  height: fit-content;
  bottom: 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  .inner {
    width: 100%;
    padding: ${px2rem(8)} ${px2rem(16)};
    display: flex;
    justify-content: space-between;
    column-gap: ${px2rem(12)};

    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      padding: ${px2rem(8)} ${px2rem(16)} ${px2rem(16)};
    }
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: fixed;
    left: 0;
    right: 0;
  }
`;

export const VotingDate = styled(B4Regular)`
  padding: ${px2rem(4)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(2)} ${px2rem(16)};
  }
`;

export const Title = styled(H4Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 ${px2rem(16)};
`;

export const InfoBox = styled.div`
  width: 100%;
  height: fit-content;
  padding: ${px2rem(4)} ${px2rem(16)};

  .box {
    width: 100%;
    height: fit-content;
    padding: ${px2rem(8)} 0;
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

export const InfoColumRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${px2rem(6)} ${px2rem(16)};

  .left {
    display: inline-block;
    color: ${props => props.theme.colorV2.colorSet.grey300};
    ${B3RegularStyle}
  }

  .right {
    display: inline-block;
    width: 100%;
    flex: 1;
    min-width: 0;
    text-align: right;
    color: ${props => props.theme.colorV2.colorSet.grey800};
    ${H10BoldStyle}
  }
`;

export const Divider = styled(DefaultDivider)`
  margin: ${px2rem(8)} 0;
`;

export const DenyVoteButton = styled(FlatGeneralButton).attrs({ size: "l" })`
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const AgreeVoteButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const IconWrapper = styled.div`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  margin-left: ${px2rem(8)};
`;

export const DDayChipStyle = css`
  background-color: ${props => props.theme.color.cobalt200};
  color: ${props => props.theme.color.cobalt800};
  margin-left: ${px2rem(4)};
`;

export const StatusContainer = styled.div`
  width: 100%;
  padding: ${px2rem(6)} ${px2rem(16)};
`;

export const Status = styled(H10Bold)<{
  status: Moim.Campaign.CampaignExecutionStatus;
}>`
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

export const VoteAgreeIcon = styled(VotedIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.accent,
}))``;

export const VoteDenyIcon = styled(VotedIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
