import styled, { css } from "styled-components";
import VotedIconBase from "@icon/18-check-circle.svg";
import { B4Regular, B2Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import {
  FlatButton,
  GhostGeneralButton,
} from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: ${px2rem(16)};
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  border-radius: ${px2rem(6)};
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  transition: box-shadow 300ms ease-in-out;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    :hover {
      box-shadow: 0 ${px2rem(2)} ${px2rem(6)} 1px
        ${props => props.theme.colorV2.colorSet.grey50};
    }
  }
`;

export const Status = styled(B4Regular)<{
  status: Moim.Campaign.CampaignExecutionStatus;
}>`
  padding: ${px2rem(2)} 0;
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

export const Title = styled(B2Regular)`
  width: 100%;
  padding: ${px2rem(4)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${useSingleLineStyle}
`;

export const DueDate = styled(B4Regular)`
  width: 100%;
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${useSingleLineStyle}
`;

export const Description = styled(B4Regular)`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const UserSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const AvatarWrapper = styled.div`
  width: ${px2rem(18)};
  height: ${px2rem(18)};

  margin-right: ${px2rem(6)};
`;

export const Username = styled(B4Regular)`
  width: 100%;
  min-width: 0;
  flex: 1;
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${useSingleLineStyle}
`;

export const VoteButton = styled(FlatButton).attrs({ size: "s" })`
  width: 100%;
  margin-top: ${px2rem(8)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
export const VoteStatusButton = styled(GhostGeneralButton).attrs({
  size: "s",
})`
  width: 100%;
  margin-top: ${px2rem(8)};
`;

export const IconWrapper = styled.div`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  margin-left: ${px2rem(8)};
`;

export const VotedIcon = styled(VotedIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.fog800,
}))``;

export const DDayChipStyle = css`
  background-color: ${props => props.theme.color.cobalt200};
  color: ${props => props.theme.color.cobalt800};
`;

export const StatusContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  .left {
    width: 100%;
    flex: 1;
  }
  .right {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
  align-self: flex-start;
`;
export const ButtonContainer = styled.div`
  width: 100%;
  align-self: flex-end;
`;
