import styled from "styled-components";
import { Link } from "react-router-dom";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import CryptoBadgeButton from "common/components/buttons/cryptoBadge";
import { H2Bold, B4Regular } from "common/components/designSystem/typos";
import { FixedHeightSmallModalLayout } from "common/components/modalLayout/small";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  padding: ${px2rem(40)};
`;

export const TitleWrapper = styled.header`
  flex: 1;
`;
export const Title = styled(H2Bold)``;

export const Description = styled(B4Regular)`
  margin: ${px2rem(30)} ${px2rem(16)} ${px2rem(26)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const LoginButton = styled(CryptoBadgeButton)`
  margin: 0 ${px2rem(24)};
`;

export const StyledLink = styled(Link)`
  color: inherit;
`;

export const ModalLayoutContainer = styled(FixedHeightSmallModalLayout)`
  box-shadow: ${props => props.theme.shadow.whiteElevated};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 0;
    border-radius: ${px2rem(8)};
    width: ${px2rem(455)};
    height: ${px2rem(600)};
    transform: translate(-50%, -50%);
  }
`;
