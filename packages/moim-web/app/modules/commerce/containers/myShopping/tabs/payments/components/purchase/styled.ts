import styled from "styled-components";
import RightIconBase from "@icon/18-rightarrow-g.svg";
import { B4Regular, H8Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { SkeletonBox } from "common/components/skeleton";

export const Wrapper = styled.div`
  width: 100%;
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  border-radius: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  padding: ${px2rem(8)} 0;
`;

export const ListTitle = styled(H8Bold).attrs({ role: "button" })`
  padding: ${px2rem(6)} ${px2rem(16)};
  display: flex;
  justify-content: space-between;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const RightArrow = styled(RightIconBase).attrs<{ disable: boolean }>(
  props => ({
    size: "xs",
    touch: 18,
    iconColor: props.theme.colorV2.colorSet.grey300,
  }),
)``;

export const CustomField = styled(B4Regular)`
  width: calc(100% - ${px2rem(16)});
  color: ${props => props.theme.colorV2.colorSet.grey600};
  margin: 0 ${px2rem(8)} ${px2rem(7)};
  padding: ${px2rem(8)} ${px2rem(16)};
`;

export const SellerSkeleton = styled(SkeletonBox).attrs({
  width: px2rem(137),
  height: px2rem(22),
})``;
