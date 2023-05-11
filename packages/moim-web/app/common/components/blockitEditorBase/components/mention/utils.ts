export function attachDataValues(
  element: HTMLElement,
  data: { [key: string]: any },
  dataAttributes: string[],
) {
  const mention = element;
  Object.keys(data).forEach(key => {
    if (dataAttributes.indexOf(key) > -1) {
      mention.dataset[key] = data[key];
    } else {
      delete mention.dataset[key];
    }
  });
  return mention;
}

export function getMentionCharIndex(
  text: string,
  mentionDenotationChars: string[],
) {
  return mentionDenotationChars.reduce(
    (prev, mentionChar) => {
      if (text) {
        const mentionCharIndex = text.lastIndexOf(mentionChar);

        if (mentionCharIndex > prev.mentionCharIndex) {
          return {
            mentionChar,
            mentionCharIndex,
          };
        }
      }
      return {
        mentionChar: prev.mentionChar,
        mentionCharIndex: prev.mentionCharIndex,
      };
    },
    { mentionChar: null, mentionCharIndex: -1 },
  );
}

export function hasValidChars(text: string, allowedChars: RegExp) {
  return allowedChars.test(text);
}

export function hasValidMentionCharIndex(
  mentionCharIndex: number,
  text: string,
  isolateChar: boolean,
) {
  if (mentionCharIndex > -1) {
    if (
      isolateChar &&
      !(mentionCharIndex === 0 || !!text[mentionCharIndex - 1].match(/\s/g))
    ) {
      return false;
    }
    return true;
  }
  return false;
}
