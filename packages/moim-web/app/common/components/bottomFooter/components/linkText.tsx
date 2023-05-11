import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { pB4RegularStyle } from "common/components/designSystem/typos";

const Wrapper = styled.div`
  padding: 0 ${px2rem(16)};
  word-break: break-word;
  white-space: pre-wrap;
  display: flex;
  align-items: center;
`;

const Sep = styled.span`
  padding: 0 ${px2rem(4)};
  ${pB4RegularStyle};
`;

const StyledText = styled.span`
  ${pB4RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey500};
  &:hover {
    text-decoration: underline;
  }
`;

interface IProps {
  linkObjects: { title: string; link?: string }[];
}

const LinkTexts: React.FC<IProps> = ({ linkObjects }) => {
  const elements = React.useMemo(
    () =>
      linkObjects.map((item, idx) => (
        <>
          <StyledText>
            {item.link ? <a href={item.link}>{item.title}</a> : item.title}
          </StyledText>
          {idx < linkObjects.length - 1 && <Sep>・</Sep>}
        </>
      )),
    [linkObjects],
  );

  if (!linkObjects.length) return null;

  return <Wrapper>{elements}</Wrapper>;
};

export default LinkTexts;
