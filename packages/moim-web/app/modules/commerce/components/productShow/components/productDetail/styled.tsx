import styled from "styled-components";
import DownArrowIconBase from "@icon/18-downarrow-g.svg";
import UpArrowIconBase from "@icon/18-uparrow-g.svg";
import { GhostGeneralButton } from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import { H10BoldStyle } from "common/components/designSystem/typos";

export const Wrapper = styled.div<{ needFolded: boolean }>`
  position: relative;
  width: 100%;
  margin-bottom: ${px2rem(30)};
  overflow: ${props => (props.needFolded ? "hidden" : "visible")};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
    height: ${props => (props.needFolded ? px2rem(600) : "fit-content")};
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(16)};
    height: ${props => (props.needFolded ? px2rem(1200) : "fit-content")};
  }
`;

export const DownArrowIcon = styled(DownArrowIconBase).attrs({
  size: "xs",
  touch: 18,
})``;
export const UpArrowIcon = styled(UpArrowIconBase).attrs({
  size: "xs",
  touch: 18,
})``;

export const IconWrapper = styled.div`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  margin-left: ${px2rem(8)};
`;

export const MoreButton = styled(GhostGeneralButton).attrs({ size: "m" })`
  width: ${`calc(100% - ${px2rem(32)})`};
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${H10BoldStyle}

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: 0 ${px2rem(16)};
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin: 0 ${px2rem(16)} ${px2rem(33)};
  }
`;

export const Veil = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  align-items: flex-end;
  z-index: ${props => props.theme.zIndexes.default};

  background-image: ${props =>
    `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, ${props.theme.colorV2.colorSet.white1000} 45%, ${props.theme.colorV2.colorSet.white1000} 100%)`};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(120)};
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: ${px2rem(200)};
  }
`;
