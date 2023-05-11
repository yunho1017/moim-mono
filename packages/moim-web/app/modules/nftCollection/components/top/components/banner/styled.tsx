import styled from "styled-components";
// constant
import { MEDIA_QUERY } from "common/constants/responsive";
// helpers
import { px2rem } from "common/helpers/rem";

export const CollectionShowBannerWrapper = styled.div`
  position: relative;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: ${px2rem(308)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(182)};
  }
`;

export const CollectionShowBannerImgWrapper = styled.div`
  width: 100%;

  overflow: hidden;
  img {
    width: 100%;
    height: ${px2rem(280)};
    object-fit: cover;
    object-position: center;
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    height: ${px2rem(280)};
    border-radius: ${px2rem(8)};
    img {
      height: ${px2rem(280)};
    }
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(130)};
    img {
      height: ${px2rem(280)};
    }
  }
`;

export const CollectionShowRepresentWrapper = styled.div`
  position: absolute;
  bottom: 0;
  overflow: hidden;
  img {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${props => props.theme.colorV2.colorSet.white1000};
    z-index: 0;
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(128)};
    height: ${px2rem(128)};
    padding: ${px2rem(4)};
    border-radius: ${px2rem(6)};
    left: ${px2rem(12)};
    img {
      border-radius: ${px2rem(4)};
    }
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(88)};
    height: ${px2rem(88)};
    padding: ${px2rem(4)};
    border-radius: ${px2rem(8)};
    left: ${px2rem(12)};
    img {
      border-radius: ${px2rem(6)};
    }
  }
`;

export const BannerEmptyBox = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(129, 129, 129, 0.02),
    rgba(136, 136, 136, 0.06)
  );
`;
