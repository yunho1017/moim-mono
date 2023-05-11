import styled, { css, FlattenInterpolation } from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import {
  B3RegularStyle,
  B4RegularStyle,
  H8BoldStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { TextGeneralButton } from "common/components/designSystem/buttons";
import { CheckboxWrapper } from "common/components/designSystem/inputs";
import { Label } from "common/components/blockitEditorBase/components/blockitRenderer/components/inputs/checkbox/styled";

import FilterIconBase from "@icon/18-filterline-g.svg";
import ExpandIconBase from "@icon/24-spread-arrow-g.svg";

export const FilterDialogTagItemContainer = styled.div``;

export const FilterCheckboxWrapperStyle = css`
  & > div {
    height: 100%;
  }
  ${Label} {
    width: 100%;
    ${B3RegularStyle}
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(42)};
    ${Label} {
      order: 1;
      font-size: ${px2rem(15)};
      line-height: ${px2rem(22)};
      font-weight: ${props => props.theme.font.regular};
    }
    ${CheckboxWrapper} {
      order: 2;
    }
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    &:hover {
      background-color: ${props => props.theme.colorV2.colorSet.grey10};
    }
  }
`;

export const FilterSelectAllCheckboxWrapperStyle = css`
  & > div {
    justify-content: flex-end;
    gap: 0  ${px2rem(8)};
  }
  ${Label} {
    width: ${px2rem(72)};
    text-align: right;
    order: 1;
    ${B4RegularStyle}
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }
  ${CheckboxWrapper} {
    order: 2;
  }
`;

export const TagSetFilterButtonStyle = css`
  margin-top: ${px2rem(2)};
`;

export const FilterIcon = styled(FilterIconBase).attrs(props => ({
  size: "xs",
  touch: 18,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const DialogTagSetTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0 ${px2rem(8)};
  color: ${props => props.theme.colorV2.colorSet.grey800};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    & > span {
      ${H8BoldStyle};
    }
  }
`;

export const DialogTagSetCount = styled.div`
  width: ${px2rem(20)};
  height: ${px2rem(18)};
  border-radius: ${px2rem(10)};
  background: ${props => props.theme.colorV2.accent};
  color: ${props => props.theme.colorV2.colorSet.fog1000};
  display: flex;
  justify-content: center;
  align-items: center;
  ${B4RegularStyle}
`;

export const FilterButtonWrapper = styled.div`
  position: relative;
`;

export const FilterButton = styled.button<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${px2rem(30)};
  height: ${px2rem(30)};
  border-radius: 100%;
  border: solid ${px2rem(1)} ${props => props.theme.colorV2.colorSet.grey100};

  ${props => props.overrideStyle};
`;

export const TagSetWrapper = styled.div`
  display: flex;
  gap: 0 ${px2rem(8)};
  align-items: center;

  & > div {
    height: fit-content;
  }
`;

export const DialogTagSet = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${px2rem(52)};
  line-height: ${px2rem(52)};
  padding: 0 ${px2rem(16)};
  font-weight: ${props => props.theme.font.bold};
  cursor: pointer;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(12)} 0 ${px2rem(16)};
  }
`;

export const DialogTagItemsWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  padding: ${px2rem(8)} 0;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    grid-template-columns: repeat(1, auto);
    grid-template-rows: repeat(1, auto);
  }

  &::after {
    content: "";
    position: absolute;
    width: calc(100% + ${px2rem(48)});
    height: 100%;
    left: ${px2rem(-24)};
    top: 0;
    background: ${props => props.theme.colorV2.colorSet.grey10};
    pointer-events: none;
  }
`;

export const ArrowIcon = styled(ExpandIconBase).attrs(props => ({
  size: "s",
  touch: "24",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const CollapseIconButton = styled.button<{
  open: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${px2rem(24)};
  height: ${px2rem(24)};

  & > * {
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    ${props =>
      props.open
        ? css`
            transform: rotate(180deg);
          `
        : css`
            transform: rotate(0deg);
          `}
  }
`;

export const GroupFilterButton = styled(TextGeneralButton).attrs({ size: "s" })`
  display: flex;
  width: fit-content;
  padding: 0 ${px2rem(20)};
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0;
    &:first-child {
      justify-content: flex-start;
    }
    &:last-child {
      justify-content: flex-end;
    }
  }
`;
