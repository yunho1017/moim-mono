import styled from "styled-components";
import {
  B1Regular,
  B4Regular,
  H8Bold,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { GhostButton } from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(407)};
    margin: ${px2rem(6)} ${px2rem(24)} ${px2rem(24)} ${px2rem(24)};
  }
`;

export const Title = styled(H8Bold)`
  padding: ${px2rem(10)} 0;
  text-align: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Description = styled(B1Regular)`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Label = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const CheckBoxWrapper = styled.div.attrs({ role: "button" })`
  margin-bottom: ${px2rem(16)};
  padding-left: ${px2rem(4)};
`;

export const DeleteButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${px2rem(16)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding-bottom: ${px2rem(16)};
  }
`;

export const DeleteButton = styled(GhostButton)`
  height: ${px2rem(48)};
  line-height: ${px2rem(48)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey300};
`;

export const StyledErrorMessage = styled(B4Regular)`
  margin-top: ${px2rem(8)};
  color: ${props => props.theme.color.red700};
`;
