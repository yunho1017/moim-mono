import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import RightIconBase from "@icon/18-rightarrow-g.svg";
import RetryIconBase from "@icon/18-retry-b.svg";
import { SectionTitle as SectionTitleBase } from "../profileComponent/styledComponent";

export const Container = styled.div`
  width: 100%;
  padding: ${px2rem(8)} ${px2rem(16)};
`;
export const SectionTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RightArrow = styled(RightIconBase).attrs(props => ({
  size: "xs",
  touch: 42,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const SectionTitle = styled(SectionTitleBase)`
  display: flex;
  align-items: center;
  gap: ${px2rem(4)};
`;

export const RetryIcon = styled(RetryIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
