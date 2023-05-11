import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  H8BoldStyle,
  B4RegularStyle,
  H9Bold,
} from "common/components/designSystem/typos";
import RightArrowBase from "@icon/18-rightarrow-b.svg";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const CollectionPreviewWrapper = styled.div`
  padding-top: ${px2rem(11)};
  height: ${px2rem(88)};
  display: flex;
  border-radius: ${px2rem(4)};
  padding: 0 ${px2rem(16)};
  overflow: hidden;
`;

export const CollectionTitle = styled(H9Bold)`
  display: flex;
  height: ${px2rem(44)};
  line-height: ${px2rem(44)};
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  padding: 0 ${px2rem(8)} 0 ${px2rem(16)};
`;

export const CollectionItemPreview = styled.div`
  flex-shrink: 0;
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  border-radius: ${px2rem(4)};
  overflow: hidden;
  margin-right: ${px2rem(12)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  img {
    will-change: transform;
    transition: transform 120ms ease-in-out 0ms;
    transform: scale(1);
  }
`;

export const CollectionWrapper = styled.div`
  height: ${px2rem(140)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  border-radius: ${px2rem(4)};
  &:hover ${CollectionItemPreview} img {
    transform: scale(1.1);
  }
`;

export const CollectionItemTitle = styled.div`
  ${H8BoldStyle}
  ${useSingleLineStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
`;

export const CollectionItemDesc = styled.div`
  max-height: ${px2rem(48)};
  overflow: hidden;
  ${B4RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-top: ${px2rem(2)};
`;

export const CollectionDetail = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const MoreIcon = styled(RightArrowBase).attrs({
  role: "button",
  size: "xs",
  touch: 42,
})``;
