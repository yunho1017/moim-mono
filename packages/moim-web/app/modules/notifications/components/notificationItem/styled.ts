import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useHoverStyle } from "common/components/designSystem/styles";
import {
  B1Regular,
  B3Regular,
  B4Regular,
  B2RegularStyle,
  B3RegularStyle,
  H8BoldStyle,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { CommonUnreadMark } from "common/components/alertBadge";

const wrapperStyle = css`
  display: flex;

  padding: ${px2rem(16)};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${useHoverStyle}
  }
`;
export const AnchorWrapper = styled.a`
  ${wrapperStyle}
`;
export const Wrapper = styled.div`
  ${wrapperStyle}
`;
export const Left = styled.div`
  position: relative;
`;

export const UnreadMark = styled(CommonUnreadMark)`
  position: absolute;
  top: ${px2rem(-3)};
  left: ${px2rem(-3)};
`;
export const Right = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${px2rem(16)};
`;

export const Title = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Description = styled(B3Regular)<{
  notiType: Moim.Notification.NotificationType;
}>`
  padding-bottom: ${px2rem(2)};
  color: ${props => props.theme.colorV2.colorSet.grey600};

  vertical-align: top;
  word-break: break-all;
  ${props =>
    props.notiType === "likePost" &&
    css`
      font-weight: ${props.theme.font.bold};
    `}
`;

export const Status = styled(B4Regular)`
  display: flex;
  max-width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const StatusWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  ${Status} + ${Status}:before {
    content: "･";
    margin: 0 ${px2rem(2)};
  }
`;

export const MentionText = styled.span`
  ${B3RegularStyle};
  color: ${props => props.theme.color.cobalt800};
  font-weight: ${props => props.theme.font.bold};
`;

export const LinkText = styled.span`
  ${B2RegularStyle};
  text-decoration: underline;
  color: ${props => props.theme.color.cobalt800};
`;

export const HighLightedText = styled.span`
  ${H8BoldStyle};
  font-weight: ${props => props.theme.font.bold};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const EmojiWrapper = styled.span`
  display: inline;
  padding-right: ${px2rem(4)};
  user-select: text;
  white-space: pre-wrap;
  font-variant-ligatures: none;
`;
