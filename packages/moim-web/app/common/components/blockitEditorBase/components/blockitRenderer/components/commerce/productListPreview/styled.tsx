import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { SectionMarginTopBottom } from "common/components/blockitEditorBase/styled";

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const Inner = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
  ${SectionMarginTopBottom}
`;
