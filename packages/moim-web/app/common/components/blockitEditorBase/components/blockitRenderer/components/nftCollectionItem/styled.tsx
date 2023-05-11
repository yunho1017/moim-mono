import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { H4Bold } from "common/components/designSystem/typos";
import { CollectionItemBannerImgWrapper } from "./components/banner";
import { SectionMarginTopBottom } from "common/components/blockitEditorBase/styled";
import { BGLevel1 } from "common/components/designSystem/BGLevel";

export const Wrapper = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
  ${SectionMarginTopBottom}
`;

export const Inner = styled.div`
  width: 100%;
`;

export const NftCollectionItemWrapper = styled(BGLevel1)`
  width: 100%;
  height: fit-content;
  border-radius: ${px2rem(8)};
  box-sizing: border-box;
  padding-bottom: ${px2rem(16)};
  overflow: hidden;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    &:hover ${CollectionItemBannerImgWrapper} img {
      transform: scale(1.1);
    }
  }
`;

export const NftCollectionItemContainer = styled.div`
  padding: 0 ${px2rem(16)};
`;

export const CollectionName = styled(H4Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  height: ${px2rem(46)};
  line-height: ${px2rem(46)};
  ${useSingleLineStyle}
`;
