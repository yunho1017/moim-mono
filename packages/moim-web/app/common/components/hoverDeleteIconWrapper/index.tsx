import * as React from "react";
import styled, { css, FlattenInterpolation } from "styled-components";

import useHover from "common/hooks/useHover";
import { px2rem } from "common/helpers/rem";
import TrashIconBase from "@icon/18-trash-g.svg";

const TrashIcon = styled(TrashIconBase).attrs(props => ({
  size: "xs",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

const wrapperStyle = css`
  position: relative;
`;

const HoverElement = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: ${px2rem(82)};
`;
const DeleteButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${props => `linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    ${props.theme.colorV2.colorSet.white1000} 45%,
    ${props.theme.colorV2.colorSet.white1000} 100%
  )`};
  padding-right: ${px2rem(21)};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

interface IProps {
  onClickDelete(): void;
  children({
    wrapperStyle,
    deleteElement,
  }: {
    wrapperStyle: FlattenInterpolation<any>;
    deleteElement: React.ReactNode;
  }): React.ReactNode;
}

function HoverDeleteIconWrapper({ onClickDelete, children }: IProps) {
  const [ref, isHovered] = useHover<HTMLDivElement>();

  const deleteElement = React.useMemo(() => {
    return (
      <HoverElement ref={ref}>
        {isHovered && (
          <DeleteButtonWrapper onClick={onClickDelete}>
            <TrashIcon />
          </DeleteButtonWrapper>
        )}
      </HoverElement>
    );
  }, [onClickDelete, isHovered]);

  return children({ wrapperStyle, deleteElement }) as React.ReactElement;
}

export default HoverDeleteIconWrapper;
