import styled from "styled-components";
import LoadingIconBase from "common/components/loading/icon";
import { px2rem } from "common/helpers/rem";
import { SectionMarginTopBottom } from "common/components/blockitEditorBase/styled";

export const Wrapper = styled.div`
  width: 100%;
  ${SectionMarginTopBottom}
`;

export const LoadWrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListWrapper = styled.div`
  width: 100%;
  height: fit-content;
`;

export const Inner = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
`;

export const QuestPreviewContainer = styled.div`
  width: 100%;
  margin-bottom: ${px2rem(8)};
`;

export const Loading = styled(LoadingIconBase)``;
