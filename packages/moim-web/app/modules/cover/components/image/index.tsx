import * as React from "react";

import {
  Wrapper,
  ImageWrapper,
  Image,
  CloseIconButton,
  CloseButtonWrapper,
} from "./styled";

interface IProps {
  title: string;
  cover: Moim.Group.IImageCover;
  onClose(): void;
}
export default function ImageCoverPage({ title, cover, onClose }: IProps) {
  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={cover.data.url} alt={title} />
      </ImageWrapper>
      <CloseButtonWrapper>
        <CloseIconButton onClick={onClose} />
      </CloseButtonWrapper>
    </Wrapper>
  );
}
