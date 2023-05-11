import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "../designSystem/styles";
import { TextButton } from "common/components/designSystem/buttons";
import { B2RegularStyle } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)} ${px2rem(24)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding-bottom: ${px2rem(24)};
  }
  ${useScrollStyle}
`;
export const Head = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
`;

export const InputWrapper = styled.div`
  width: 100%;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)};
  }
`;

export const SaveButton = styled(TextButton).attrs({ size: "m" })``;

export const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${B2RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const headerWrapperStyle = css`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin-top: ${px2rem(8)};
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 0 0 ${px2rem(16)};
  }
`;

export const CloseButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-right: ${px2rem(8)};
  }
`;
