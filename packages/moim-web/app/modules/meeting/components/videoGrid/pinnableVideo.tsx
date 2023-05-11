import * as React from "react";
import { rgba } from "polished";
import styled, { css } from "styled-components";
import PinIconBase from "@icon/24-pin-g.svg";
import UnPinIconBase from "@icon/18-unpin-g.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

const PinIcon = styled(PinIconBase).attrs(props => ({
  size: "s",
  iconColor: rgba(props.theme.colorV2.colorSet.white1000, 0.8),
}))``;

const UnPinIcon = styled(UnPinIconBase).attrs(props => ({
  size: "s",
  iconColor: rgba(props.theme.colorV2.colorSet.white1000, 0.8),
}))``;

const IconBox = styled.div`
  display: flex;
  border-radius: 50%;
  padding: ${px2rem(4)};
  align-items: center;
  justify-content: center;
`;

const PinBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colorV2.colorSet.grey200};
  display: flex;
  justify-content: flex-end;
  padding: ${px2rem(8)};
  z-index: ${props => props.theme.zIndexes.wrapper};

  visibility: hidden;
`;

const PinFeatureContainer = styled.div<{
  isPinned: boolean;
  enablePin: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.isPinned &&
    css`
      ${PinBox} {
        visibility: visible;
      }
    `}

  ${props =>
    props.enablePin &&
    css`
      :hover {
        ${PinBox} {
          visibility: visible;
        }
      }

      ${IconBox} {
        @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
          :hover {
            background-color: ${props =>
              rgba(props.theme.colorV2.colorSet.white1000, 0.1)};
          }
        }
      }
    `}
`;

interface IProps {
  isPinned: boolean;
  enableFeature: boolean;
  moimUserId?: Moim.Id;
  onClickPinButton(id: Moim.Id, isPinned: boolean): void;
}

const PinnableVideo: React.FC<IProps> = ({
  moimUserId,
  enableFeature,
  isPinned,
  onClickPinButton,
  children,
}) => {
  const handleClick = React.useCallback(() => {
    if (enableFeature && moimUserId) {
      onClickPinButton(moimUserId, isPinned);
    }
  }, [enableFeature, isPinned, moimUserId, onClickPinButton]);

  return (
    <PinFeatureContainer
      className="video"
      isPinned={isPinned}
      enablePin={enableFeature && Boolean(moimUserId)}
    >
      {children}
      <PinBox>
        <IconBox>
          {isPinned ? (
            <UnPinIcon role="button" onClick={handleClick} />
          ) : (
            <PinIcon role="button" onClick={handleClick} />
          )}
        </IconBox>
      </PinBox>
    </PinFeatureContainer>
  );
};

export default PinnableVideo;
