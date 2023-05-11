import styled, { FlattenInterpolation } from "styled-components";
import { Link } from "react-router-dom";
import MoreIconBase from "@icon/24-arrow-g.svg";
import AddIconBase from "@icon/24-add-b.svg";
import SmallAddIconBase from "@icon/18-add-g.svg";
import { px2rem } from "common/helpers/rem";
import { marginToPadding } from "../../helper/blockitStyleHelpers";
import { H4Bold, B4Regular } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { GhostGeneralButton } from "common/components/designSystem/buttons";

export const PlacementRootContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlacementWrapper = styled.div<{
  contentWidth?: "fit-container" | number;
}>`
  width: ${props => {
    if (!props.contentWidth || props.contentWidth === "fit-container") {
      return "100%";
    }
    return `${props.contentWidth}%`;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
  }
`;

export const Wrapper = styled.div<{
  sectionWidth?: "fit-container" | number;
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  width: ${props => {
    if (!props.sectionWidth || props.sectionWidth === "fit-container") {
      return "100%";
    }
    return `${props.sectionWidth}%`;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(40)} ${px2rem(4)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    padding: ${px2rem(16)} 0;
  }

  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export const Inner = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
`;

export const GridLayout = styled.div<{
  gapSize?: number;
  columnCount?: number;
  rowCount?: number;
}>`
  margin: ${px2rem(24)} 0;
  width: 100%;
  display: grid;
  gap: ${props => px2rem(props.gapSize ?? 12)};

  grid-template-columns: ${props =>
    `repeat(${props.columnCount ?? 1}, minmax(0, 1fr))`};
  grid-template-rows: ${props =>
    `repeat(${props.rowCount ?? 1}, minmax(0, 1fr))`};
  place-content: center;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: ${px2rem(8)} 0;
`;

export const Title = styled(H4Bold)`
  width: 100%;
  min-width: 0;
  flex: 1;

  color: ${props => props.theme.colorV2.colorSet.grey800};
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
  height: ${px2rem(120)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MoreIconContainer = styled(Link)`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-left: ${px2rem(16)};
  }
`;
export const MoreIcon = styled(MoreIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

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
  margin-right: ${px2rem(16)};
`;
