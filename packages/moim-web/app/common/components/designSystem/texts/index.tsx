import * as React from "react";
import styled from "styled-components";
import { memoize } from "lodash";
import shortId from "shortid";
import { px2rem } from "common/helpers/rem";
import {
  REGEXP_EMOJI,
  REGEXP_NATIVE_EMOJI,
} from "common/helpers/moimDown/tokenizer";

interface IProps extends React.HTMLProps<HTMLSpanElement> {
  value: string;
}

const EmojiWrapper = styled.span`
  padding-right: ${px2rem(2)};
`;

// NOTE: 여기 부분 성능 개선 필요
const parse = memoize(async (value: string) => {
  const ALL_REGEXP = new RegExp(
    [REGEXP_EMOJI, REGEXP_NATIVE_EMOJI].join("|"),
    "g",
  );
  const elementHolder: React.ReactNode[] = [];
  let match: RegExpExecArray | null = null;
  let lastCursor = 0;

  while ((match = ALL_REGEXP.exec(value)) !== null) {
    const matchText = match[0];
    const matchPos = match.index;
    const prevText = value.substring(lastCursor, matchPos);

    elementHolder.push(prevText);
    elementHolder.push(
      <EmojiWrapper key={`emoji-safe-${matchText}-${shortId()}`}>
        {matchText}
      </EmojiWrapper>,
    );

    lastCursor = matchPos + matchText.length;
  }

  if (value === null || value === undefined) {
    elementHolder.push("");
  } else {
    elementHolder.push(value.substr(lastCursor));
  }

  return elementHolder;
});

export const NativeEmojiSafeText: React.FC<IProps> = React.memo(
  ({ value, ...rest }) => {
    const [elements, setElements] = React.useState<React.ReactNode>([value]);
    const getElements = React.useCallback(() => {
      parse(value).then(result => {
        setElements(result);
      });
    }, [value]);

    React.useLayoutEffect(() => {
      getElements();
    }, [getElements]);

    return <span {...rest}>{elements}</span>;
  },
);
