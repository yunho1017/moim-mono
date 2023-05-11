import { pB3RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

interface IStyleProps {
  backgroundColor?: string;
  textColor?: string;
  maxLine?: number;
  opened?: boolean;
}

const DescriptionWrapper = styled.div<IStyleProps>`
  ${pB3RegularStyle};
  display: -webkit-inline;
  margin-bottom: ${({ opened }) => (opened ? px2rem(4) : px2rem(16))};
  white-space: pre-wrap;
  word-break: break-all;
  max-height: ${({ maxLine, opened }) =>
    opened ? "none" : maxLine ? px2rem(22 * maxLine) : "none"};
  width: 100%;
  color: ${props => props.textColor};
  opacity: 66%;
  background-color: ${props => props.backgroundColor};
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${({ maxLine, opened }) => (opened ? "unset" : maxLine)};
  -webkit-box-orient: vertical;

  span.float {
    color: ${props => props.textColor};
    display: flex;
    float: right;
    shape-outside: inset(calc(100% - 2px) 0 0 0);
  }
  .more {
    padding-left: ${px2rem(2)};
    font-weight: bold;
    opacity: 86%;
    ${({ opened }) => opened && "display: none"};
  }
`;

const Description = styled.div<IStyleProps>`
  display: -webkit-box;
  white-space: pre-wrap;
  word-break: keep-all;
  color: ${props => props.textColor};
  line-height: ${px2rem(22)};
  overflow: hidden;
  width: 100%;
  ${({ maxLine }) => maxLine && `height: ${px2rem(22 * maxLine)}`};
  -webkit-line-clamp: ${({ maxLine }) => maxLine};
  line-clamp: ${({ maxLine }) => maxLine};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

interface IProps {
  text: string;
  maxLine: number;
  backgroundColor: string;
  textColor: string;
}

export const TextWithMoreButton: React.FC<IProps> = ({
  maxLine,
  text,
  backgroundColor,
  textColor,
}) => {
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>(
    undefined,
  );
  const [showMoreButton, setShowMoreButton] = useState<boolean | undefined>(
    true,
  );

  useEffect(() => {
    setNumberOfLines(showMoreButton ? maxLine : undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMoreButton]);

  const refThis = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (refThis?.current) {
      if (refThis.current.clientHeight < refThis.current.scrollHeight) {
        setShowMoreButton(true);
      } else {
        setShowMoreButton(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refThis?.current]);

  return (
    <DescriptionWrapper
      maxLine={numberOfLines}
      className={showMoreButton ? "" : "opened"}
      textColor={textColor}
      backgroundColor={backgroundColor}
      opened={!showMoreButton}
    >
      <Description
        ref={refThis}
        maxLine={numberOfLines}
        textColor={textColor}
        backgroundColor={backgroundColor}
      >
        <ReactMarkdown>
          {`${text.replace(/\n\n/gi, "\n\n&nbsp;\n\n")}` ?? ""}
        </ReactMarkdown>
      </Description>
      {showMoreButton && (
        <span className="float">
          <button
            className="more"
            role="button"
            onClick={() => setShowMoreButton(value => !value)}
          >
            more
          </button>
        </span>
      )}
    </DescriptionWrapper>
  );
};
