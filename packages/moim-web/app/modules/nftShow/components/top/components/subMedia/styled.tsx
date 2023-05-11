import styled from "styled-components";
import LeftIconBase from "@icon/18-larrow.svg";
import RightIconBase from "@icon/18-rarrow.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const SubMediaWrapper = styled.div`
  width: 100%;
  height: auto;
  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: auto;
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    .swiper {
      overflow: visible;
    }
    .swiper-slide {
      width: 43.5%;
    }
  }
`;

export const SubMediaTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ArrowBox = styled.div.attrs({ role: "button" })<{
  disabled?: boolean;
}>`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  border: solid ${px2rem(1)} ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  :hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
  }

  &.swiper-next-button {
    margin-left: ${px2rem(14)};
  }

  &.swiper-button-disabled {
    opacity: 0.4;
  }
`;

export const LeftIconResource = styled(LeftIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const RightIconResource = styled(RightIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
