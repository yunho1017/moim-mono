import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { SectionMarginTopBottom } from "common/components/blockitEditorBase/styled";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 ${px2rem(16)};
  ${SectionMarginTopBottom}
`;
