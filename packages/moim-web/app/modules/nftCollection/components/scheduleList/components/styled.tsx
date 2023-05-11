import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";
import {
  FlatButton,
  GhostGeneralButton,
} from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";

export const ScheduleListItem = styled.div`
  min-height: ${px2rem(98)};
  margin: ${px2rem(12)} 0;
  border: solid ${px2rem(1)} ${props => props.theme.colorV2.colorSet.grey50};
  border-radius: ${px2rem(8)};
  overflow: hidden;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding-bottom: ${px2rem(14)};
  }
  &:first-child {
    margin-top: 0;
  }
`;

export const ScheduleListBanner = styled.div`
  width: 100%;
  height: ${px2rem(80)};
  img {
    width: 100%;
    height: ${px2rem(80)};
    object-fit: cover;
    object-position: center;
  }
`;

export const RepresentImgWrapper = styled.div`
  border-radius: ${px2rem(6)};
  overflow: hidden;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(86)};
    height: ${px2rem(86)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(71)};
    height: ${px2rem(71)};
  }
`;

export const ScheduleListItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: ${px2rem(118)};
    padding: 0 ${px2rem(24)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(114)};
    padding: 0 ${px2rem(16)};
  }
`;

export const ScheduleListItemTitle = styled(H8Bold)`
  width: 100%;
  max-width: ${px2rem(476)};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: ${props => props.theme.font.bold};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const ScheduleListItemLeft = styled.div<{ hasFullWidth?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${props =>
      props.hasFullWidth
        ? css`
            width: 100%;
          `
        : css`
            width: calc(100% - ${px2rem(316)});
          `};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${props =>
      props.hasFullWidth
        ? css`
            width: 100%;
          `
        : css`
            width: calc(100% - ${px2rem(80)});
          `};
  }
`;

export const ScheduleListItemRight = styled.div`
  width: ${px2rem(300)};
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(71)};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${px2rem(8)} 0;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: ${px2rem(86)};
    width: ${px2rem(200)};
    margin-left: ${px2rem(14)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: 0 ${px2rem(16)};
  }
`;

export const MintButton = styled(FlatButton).attrs({ size: "m" })<{
  disabled?: boolean;
}>`
  width: 100%;
`;

export const ApplyWhiteListButton = styled(GhostGeneralButton).attrs({
  size: "m",
})<{
  disabled?: boolean;
}>`
  width: 100%;
`;
