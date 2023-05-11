import * as React from "react";
import styled from "styled-components";

import { B1Regular } from "common/components/designSystem/typos";
import { Description } from "../template";
import { LoadingIcon } from "common/components/loading";
import CameraIcon from "@icon/48-uploadphoto.svg";

import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: ${px2rem(16)};
  padding: ${px2rem(16)};
`;

export const MediaWrapper = styled.div.attrs({ role: "button" })`
  border-radius: ${px2rem(8)};
  overflow: hidden;
  width: fit-content;
  margin: 0 auto;
  position: relative;
`;

export const Optional = styled(B1Regular)`
  text-align: center;
  margin-top: ${px2rem(30)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const OverrideDescription = styled(Description)`
  margin-bottom: ${px2rem(10)};
`;

const ImageCenterContents = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
`;

const LoaderWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => props.theme.colorV2.colorSet.grey100};
`;

export const UpLoadImageIcon = () => (
  <ImageCenterContents>
    <CameraIcon size="l" />
  </ImageCenterContents>
);

export const Loader = () => (
  <LoaderWrapper>
    <LoadingIcon />
  </LoaderWrapper>
);
