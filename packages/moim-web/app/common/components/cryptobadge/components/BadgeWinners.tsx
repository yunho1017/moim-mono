import {
  B3RegularStyle,
  H4BoldStyle,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import React from "react";
import styled from "styled-components";

const WinnerWrapper = styled.div<{
  textColor?: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${props => props.textColor};
  opacity: 86%;
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    margin: ${px2rem(16)} 0;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  align-items: baseline;
  gap: ${px2rem(5)};
`;

const CertCount = styled.div`
  ${H4BoldStyle};
  margin-bottom: 0;
`;

const Winners = styled.div`
  ${B3RegularStyle};
  margin-bottom: ${px2rem(2)};
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  -webkit-box-pack: end;
  justify-content: space-between;
  width: ${px2rem(100)};
  overflow: hidden;
`;

const BadgeWinners: React.FC<{
  profileElements?: any;
  certCount: number;
  backgroundColor?: string;
  textColor?: string;
}> = ({ profileElements, certCount, textColor }) => (
  <WinnerWrapper textColor={textColor}>
    <InfoWrapper>
      <CertCount>{certCount ?? 0}</CertCount>
      <Winners>Winners</Winners>
    </InfoWrapper>
    <ProfileImageWrapper>{profileElements ?? <></>}</ProfileImageWrapper>
  </WinnerWrapper>
);

export default React.memo(BadgeWinners);
