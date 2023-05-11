import styled from "styled-components";
import AddIconBase from "@icon/24-add-b.svg";
import SmallAddIconBase from "@icon/18-add-g.svg";
import { px2rem } from "common/helpers/rem";
import {
  B4Regular,
  H4BoldStyle,
  H8BoldStyle,
} from "common/components/designSystem/typos";
import { useScrollStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";
import { GhostGeneralButton } from "common/components/designSystem/buttons";

export const PlacementWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${useScrollStyle}
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: ${px2rem(1000)};
  padding: ${px2rem(8)} ${px2rem(4)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0;
  }
`;

export const Inner = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
`;

export const GridLayout = styled.div<{
  gapSize?: number;
  columnCount?: number;
}>`
  margin: ${px2rem(24)} 0;
  width: 100%;
  display: grid;
  gap: ${props => px2rem(props.gapSize ?? 12)};

  grid-template-columns: ${props =>
    `repeat(${props.columnCount ?? 1}, minmax(0, 1fr))`};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(16)} 0 ${px2rem(24)};
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${px2rem(8)} 0;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-top: ${px2rem(20)};
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin-top: ${px2rem(40)};
  }
`;

export const Title = styled.div`
  width: 100%;
  min-width: 0;
  flex: 1;

  color: ${props => props.theme.colorV2.colorSet.grey800};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${H8BoldStyle}
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H4BoldStyle}
  }
`;

export const TitleSideContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
`;

export const PositionContainer = styled.div`
  width: 100%;
`;
export const PositionAndTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${px2rem(2)} 0;
`;
export const PositionRoleTitle = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-right: ${px2rem(8)};
`;
export const PositionWrap = styled.div`
  & + & {
    margin-left: ${px2rem(4)};
  }
`;

export const EmptyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(50)} 0;
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin: ${px2rem(150)} 0;
  }
`;

export const AddIcon = styled(AddIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const SmallAddIconWrap = styled.div`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  margin-right: ${px2rem(8)};
`;

export const SmallAddIcon = styled(SmallAddIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const CreateButton = styled(GhostGeneralButton)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
