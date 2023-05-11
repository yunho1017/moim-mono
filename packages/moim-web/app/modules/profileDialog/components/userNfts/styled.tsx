import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${px2rem(8)} ${px2rem(16)};
  gap: ${px2rem(8)};
  flex-wrap: wrap;
`;

export const Image = styled.img`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  border-radius: ${px2rem(2)};
  object-fit: cover;
`;

export const ImageSvgWrap = styled.div`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  border-radius: ${px2rem(2)};
  object-fit: cover;

  padding-bottom: ${px2rem(5)};
`;
