import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import ChipBase from "common/components/chips";
import TagChip from "common/components/chips/preset/tagChip";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { B1Regular } from "common/components/designSystem/typos";

export { TagChip };

export const HeaderWrapperStyle = css`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  padding: 0 ${px2rem(16)};
  transition: background-color 200ms ease-in;

  &:hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }
`;

export const TagsContainer = styled.div`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  padding: ${px2rem(8)} ${px2rem(8)} 0;
  margin-bottom: -${px2rem(4)};
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Title = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding-top: ${px2rem(4)}; /* Adjust horizontal position between icon */
  ${useSingleLineStyle}
`;

export const SelectCountWrapper = styled.div`
  margin-left: ${px2rem(4)};
`;

export const SelectCount = styled(ChipBase).attrs({
  size: "small",
  shape: "round",
  overrideStyle: css`
    border: 1px solid ${props => props.theme.colorV2.colorSet.grey300};
    color: ${props => props.theme.colorV2.colorSet.grey600};
  `,
})``;
