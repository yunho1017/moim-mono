import { B3RegularStyle } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import React from "react";
import styled from "styled-components";

const TagList = styled.div`
  padding: ${px2rem(8)} 0;

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    margin: ${px2rem(16)} 0;
  }
`;

const TagItem = styled.div<{ textColor: string }>`
  ${B3RegularStyle};
  display: inline-block;
  margin-right: ${px2rem(8)};
  margin-bottom: ${px2rem(8)};
  height: ${px2rem(32)};
  padding: ${px2rem(4)} ${px2rem(14)};
  min-width: 0;
  color: solid 1px ${props => props.textColor};
  opacity: 86%;
  border: solid 1px ${props => props.textColor}1f;
  border-radius: ${px2rem(16)};
`;

export const Tags: React.FC<{
  tags: string[];
  textColor: string;
}> = ({ tags, textColor }) => (
  <TagList>
    {tags &&
      tags.map(tag => (
        <TagItem key={tag} textColor={textColor}>
          {tag}
        </TagItem>
      ))}
  </TagList>
);
