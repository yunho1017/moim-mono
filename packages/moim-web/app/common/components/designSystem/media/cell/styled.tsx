import styled, { css, FlattenInterpolation } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { H10Bold, B4Regular } from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";

import RetryIcon from "@icon/24-retry-g.svg";
import CloseIcon from "@icon/24-close-bold-g.svg";
import DownloadIcon from "@icon/24-download-g.svg";
import SmallDeleteIcon from "@icon/24-delete-g.svg";
import BigDeleteIcon from "@icon/36-delete.svg";
import DownloadButtonBase from "common/components/downloadButton";

export const Wrapper = styled.div<{
  isDisabled?: boolean;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  max-width: ${px2rem(400)};
  position: relative;
  width: 100%;
  min-height: ${px2rem(52)};
  display: flex;
  align-items: center;

  border-radius: ${px2rem(2)};
  border: ${props =>
    `solid ${px2rem(1)} ${props.theme.colorV2.colorSet.grey50}`};

  ${props =>
    props.isDisabled &&
    css`
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${props.theme.colorV2.colorSet.white1000};
        opacity: 0.4;
        pointer-events: none;
        z-index: ${props.theme.zIndexes.default};
      }
    `};

  ${props => props.overrideStyle};
`;

export const LoadingSpinnerWrapper = styled.div`
  position: absolute;
  overflow: hidden;
  border-radius: ${px2rem(2)} ${px2rem(2)} 0 0;
  height: ${px2rem(2)};
  top: -1px;
  left: 0;
  right: 0;
`;

export const Thumbnail = styled.div`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FileInfo = styled.div`
  flex: 1;
  min-width: 0;
  margin: ${px2rem(8)} 0 ${px2rem(8)} ${px2rem(4)};
`;

export const FileName = styled(H10Bold)`
  display: inline-block;
  width: 100%;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${useSingleLineStyle}
`;

export const FileType = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const ButtonSection = styled.div`
  margin-left: ${px2rem(16)};
  margin-right: ${px2rem(12)};
  z-index: ${props => props.theme.zIndexes.default + 1};

  & > * + * {
    margin-left: ${px2rem(24)};
  }
`;

export const DownloadButton = styled(DownloadButtonBase)<{
  disabled?: boolean;
}>`
  pointer-events: ${props => (Boolean(props.disabled) ? "none" : "auto")};
`;

export const DownloadIconButton = styled(DownloadIcon).attrs({
  role: "button",
  size: "s",
})``;

export const RetryButton = styled(RetryIcon).attrs({
  role: "button",
  size: "s",
})``;
export const DeleteButton = styled(CloseIcon).attrs({
  role: "button",
  size: "s",
})``;

export const SmallDeleteButton = styled(SmallDeleteIcon).attrs({
  role: "button",
  size: "xs",
})``;

export const BigDeleteButton = styled(BigDeleteIcon).attrs({
  role: "button",
  size: "m",
})``;

export const DeleteButtonWrapper = styled.div<{
  isSmallDeleteButton?: boolean;
}>`
  position: absolute;
  z-index: ${props => props.theme.zIndexes.wrapper};
  ${props =>
    props.isSmallDeleteButton
      ? css`
          width: ${px2rem(18)};
          height: ${px2rem(18)};
          top: -${px2rem(6)};
          right: -${px2rem(6)};
          background-color: ${rgba(props.theme.colorV2.colorSet.grey800, 0.9)};
          border-radius: 100%;
        `
      : css`
          width: ${px2rem(36)};
          height: ${px2rem(36)};
          top: 0;
          right: 0;
          background-color: ${rgba(props.theme.colorV2.colorSet.grey800, 0.4)};
          border-bottom-left-radius: ${px2rem(2)};
        `};
`;
