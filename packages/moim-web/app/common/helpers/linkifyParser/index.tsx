const REGEX_MENTION = /@([\S\-]+)/g;
const REGEX_CHANNEL = /#([\S\-]+)/g;

const ALL_REGEXP = new RegExp(
  `(${[REGEX_MENTION, REGEX_CHANNEL]
    .map(regexp => regexp.source)
    .join(")|(")})`,
);

export interface ILinkifyData {
  text: string;
  type: "channel_mention" | "user_mention" | "text";
  href?: string;
}

const wrapTextElement = (text: string): ILinkifyData => ({
  text,
  type: "text",
});

const userMentionElement = (username: string): ILinkifyData => ({
  text: `@${username}`,
  type: "user_mention",
  href: `/${username}`, // TODO: Update this link
});

const channelMentionElement = (channelName: string): ILinkifyData => ({
  text: `#${channelName}`,
  type: "channel_mention",
  href: `/${channelName}`, // TODO: Update this link
});

export default function linkifyParser(content: string): ILinkifyData[] {
  const components: ILinkifyData[] = [];
  let match = content.match(ALL_REGEXP);
  let result = content;
  while (match) {
    const [all, userMention, username, channelMention, channelName] = match;
    const i = match.index!;
    const beforeContent = result.substr(0, i);
    if (beforeContent) {
      components.push(wrapTextElement(beforeContent));
    }
    if (userMention) {
      components.push(userMentionElement(username));
    } else if (channelMention) {
      components.push(channelMentionElement(channelName));
    }
    result = result.substring(i + all.length);
    match = result.match(ALL_REGEXP);
  }
  if (result) {
    components.push(wrapTextElement(result));
  }

  return components;
}
