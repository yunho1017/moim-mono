import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { H2BoldStyle } from "common/components/designSystem/typos";
import AutoHeightInput from "common/components/autoHeightInput";
import { useScrollStyle } from "common/components/designSystem/styles";
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Head = styled.div`
  width: 100%;
  height: fit-content;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: sticky;
    top: 0;
    z-index: ${props => props.theme.zIndexes.default};
  }
`;

export const Body = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(40)} ${px2rem(32)} 0;
    ${useScrollStyle}
    overflow-y: auto;
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(40)} ${px2rem(16)} 0;
  }
`;

export const EditorContainer = styled.div`
  width: 100%;
  padding-bottom: ${px2rem(200)};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    max-width: ${px2rem(720)};
  }
`;

export const TitleContainer = styled.div`
  margin-bottom: ${px2rem(32)};
  width: 100%;
`;

export const TitleInput = styled(AutoHeightInput)`
  padding: ${px2rem(8)} 0;
  height: ${px2rem(42)};
  color: ${props => props.theme.colorV2.colorSet.grey800};

  textarea {
    ::placeholder {
      color: ${props => props.theme.colorV2.colorSet.grey300};
    }
  }

  ${H2BoldStyle}
`;
