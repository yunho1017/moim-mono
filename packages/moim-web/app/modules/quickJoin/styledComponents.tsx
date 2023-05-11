import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const IFrame = styled.iframe.attrs({ frameBorder: "0" })`
  visibility: hidden;
  width: 0;
  height: 0;
`;
