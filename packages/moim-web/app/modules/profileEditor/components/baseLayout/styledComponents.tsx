import styled, { css } from "styled-components";
import { H8Bold, B1RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Section = styled.div`
  position: relative;
  width: 100%;
  padding: 0 ${px2rem(16)};
  display: flex;
  flex-direction: column;

  & + & {
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: ${px2rem(1)};
      background-color: ${props => props.theme.colorV2.colorSet.grey50};
    }
  }
`;

export const SectionTitleWrapper = styled.div`
  width: 100%;
  height: ${px2rem(44)};
  padding: ${px2rem(11)} 0;
`;
export const SectionTitle = styled(H8Bold)`
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const SectionContent = styled.div`
  padding-bottom: ${px2rem(24)};

  input,
  textarea {
    ${B1RegularStyle};
    padding: ${px2rem(8)} 0;
  }
`;

export const ProfileImageWrapper = styled.div`
  padding: ${px2rem(16)} 0;
`;

export const ReasonBoxStyle = css`
  min-height: ${px2rem(16)};
`;
