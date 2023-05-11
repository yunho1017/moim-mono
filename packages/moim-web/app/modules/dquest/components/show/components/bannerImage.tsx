import * as React from "react";
import styled from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  display: flex;
  width: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    border-radius: ${px2rem(7)};
    height: 100%;
    margin-bottom: ${px2rem(16)};
    max-height: ${px2rem(422)};
    overflow: hidden;
    img {
      max-height: ${px2rem(422)};
    }
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: 100vw;
    margin-bottom: ${px2rem(8)};
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

interface IProps {
  imageSrc: string;
}

const BannerImage: React.FC<IProps> = ({ imageSrc }) => (
  <Wrapper>
    <Image width="100%" height="100%" loading="lazy" src={imageSrc} />
  </Wrapper>
);

export default React.memo(BannerImage);
