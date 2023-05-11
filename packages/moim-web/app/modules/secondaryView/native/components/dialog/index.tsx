import React from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: ${props => props.theme.zIndexes.fullscreen};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;
const NativeSecondaryViewDialog: React.FC<{ isOpen: boolean }> = ({
  children,
  isOpen,
}) => {
  return createPortal(
    isOpen ? <Wrapper>{children}</Wrapper> : <div />,
    document.getElementById("native-secondary-view") ?? document.body,
  );
};

export default NativeSecondaryViewDialog;
