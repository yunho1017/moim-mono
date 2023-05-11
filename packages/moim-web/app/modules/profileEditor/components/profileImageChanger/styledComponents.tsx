import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import UploadPhotoIcon from "@icon/24-uploadphoto.svg";

export const Wrapper = styled.div`
  position: relative;
  width: ${px2rem(80)};
  height: ${px2rem(80)};
`;

export const IconWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const UploadPhotoButton = styled(UploadPhotoIcon).attrs({
  size: "s",
})``;

export const LoadWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
