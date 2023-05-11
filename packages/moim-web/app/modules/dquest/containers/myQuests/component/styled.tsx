import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import LoadingIconBase from "common/components/loading/icon";
import { B2RegularStyle } from "common/components/designSystem/typos";
import SearchIconBase from "@icon/18-search-placeholder-g.svg";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: ${px2rem(16)};
  > div {
    width: 100%;
    height: 100%;
  }
`;

export const LoadWrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled(LoadingIconBase)``;

export const QuestContainer = styled.div`
  & + & {
    margin-top: ${px2rem(8)};
  }
`;

export const SearchIcon = styled(SearchIconBase).attrs({ size: "s" })``;
export const IconWrapper = styled.div`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  margin-bottom: ${px2rem(6)};
`;

export const EmptyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${px2rem(268)};
  padding: ${px2rem(14)} ${px2rem(16)};

  .image {
    width: ${px2rem(55)};
    height: ${px2rem(55)};
    margin-bottom: ${px2rem(4)};
  }

  .message {
    ${B2RegularStyle}
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }
`;
