import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H10Bold } from "common/components/designSystem/typos";
import ReviewReward from "common/components/groupInput/preset/reviewDialogGroupInput/components/reviewReward";

export const Title = styled(H10Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const CustomStatus = styled(H10Bold)`
  color: ${props => props.theme.color.cobalt800};
`;

export const PriceWrapper = styled.div`
  display: flex;
  align-items: center;

  & > .quantity:before {
    content: "･";
    margin: 0 ${px2rem(2)};
  }
`;

export const StyledReviewReward = styled(ReviewReward)`
  padding: 0;
`;

export const TitleContainer = styled.div`
  display: flex;
  padding: ${px2rem(6)} ${px2rem(16)};

  & > ${CustomStatus} + ${Title} {
    ::before {
      content: " · ";
      margin: 0 ${px2rem(4)};
      display: inline-block;
    }
  }
`;
