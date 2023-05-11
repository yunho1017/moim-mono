import styled, { css } from "styled-components";
import { B2Regular, B3Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

export const AvatarWrapper = styled.div`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  margin-right: ${px2rem(8)};
`;

export const ProfileName = styled(B2Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const ProfileSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${px2rem(8)} 0;
`;

export const MessageBody = styled.div`
  width: 100%;
`;

export const Message = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const shavedTextWrapperStyle = css`
  padding: 0;
`;
