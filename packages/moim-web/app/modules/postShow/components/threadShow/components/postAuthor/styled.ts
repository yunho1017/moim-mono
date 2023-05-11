import styled, { css } from "styled-components";
import { B4Regular, B1Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Username = styled(B1Regular)`
  display: inline-flex;
  align-items: center;
  white-space: pre;
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey800};

  > div {
    white-space: pre-wrap;
  }
`;
export const CreatedAt = styled(B4Regular)`
  display: block;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const UserInfoWrapper = styled.div`
  flex: 1;
  width: 100%;
  min-width: 0;
  margin-left: ${px2rem(8)};
`;

export const UserWrapper = styled.div`
  width: 100%;
  min-width: 0;
  flex: 1;
  display: inline-flex;
  align-items: center;
`;

export const Wrapper = styled.div<{
  position: Moim.Forum.ForumShowAuthorConfigPositionType;
}>`
  display: flex;
  align-items: center;

  ${props =>
    props.position === "top"
      ? css`
          margin-top: ${px2rem(16)};
          & > ${UserWrapper} {
            padding-bottom: ${px2rem(12)};
            height: ${px2rem(60)};
          }
        `
      : css`
          margin-top: ${px2rem(40)};
          width: 100%;
          border-top: ${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50};
          & > ${UserWrapper} {
            height: ${px2rem(72)};
          }

          ${CreatedAt} {
            margin-top: ${px2rem(2)};
          }
        `}
`;
