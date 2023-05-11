import styled, { css } from "styled-components";
import {
  H10Bold,
  B3Regular,
  B4Regular,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import DeleteIconResource from "@icon/36-delete.svg";

const ContainerStyle = css<{ readonly?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  padding: ${px2rem(4)} 0 ${px2rem(4)} ${px2rem(12)};
  ${props =>
    !props.readonly
      ? css`
          pointer-events: none;
        `
      : undefined}

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: ${px2rem(3)};
    height: 100%;
    background-color: ${props => props.theme.colorV2.colorSet.grey50};
  }
`;

export const EmbedContainer = styled.div`
  max-width: 100%;
  ${ContainerStyle};
`;

export const LinkPreviewContainer = styled.a`
  max-width: ${px2rem(400)};
  ${ContainerStyle};
`;

export const Header = styled(B4Regular)`
  height: ${px2rem(24)};
  display: flex;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const Favicon = styled.img`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  margin-right: ${px2rem(4)};
`;

export const Information = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Image = styled.div`
  width: ${px2rem(80)};
  height: ${px2rem(80)};
  background-position: center;
  background-size: cover;
  border-radius: ${px2rem(6)};
  overflow: hidden;
`;

export const Contents = styled.div`
  display: flex;
  margin-top: ${px2rem(4)};

  ${Information} + ${Image} {
    margin-left: ${px2rem(16)};
  }
`;

export const Title = styled(H10Bold)`
  color: ${props => props.theme.color.cobalt800};
  margin: 0;
`;

export const Description = styled(B3Regular)`
  margin-top: ${px2rem(4)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const EmbedWrapper = styled.div<{ width: number; height: number }>`
  max-width: 100%;
  width: ${props => px2rem(props.width)};
  height: ${props => px2rem(props.height)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    height: auto;

    > iframe {
      width: 100% !important;
      height: 100% !important;
    }
  }
`;

export const DeleteButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  pointer-events: all;
`;

export const DeleteIcon = styled(DeleteIconResource).attrs({
  size: "m",
  touch: 36,
  role: "button",
})``;
