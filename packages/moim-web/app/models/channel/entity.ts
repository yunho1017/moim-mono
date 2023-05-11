import { schema } from "normalizr";
import { userEntity } from "../user";
import { groupEntity } from "../group";
import { PostTemplateEntity } from "../postTemplate";
import { statEntity } from "../stat";

export const linkDefinition = {
  creator: userEntity,
  group: groupEntity,
};

export const linkEntity = new schema.Entity<Moim.Channel.Link.INormalizedLink>(
  "links",
  linkDefinition,
);

export const linkSingleItemEntity = new schema.Object<
  Moim.Channel.Link.INormalizedLink
>({
  data: linkEntity,
});

export const linkListEntity = new schema.Object<
  Moim.Channel.Link.INormalizedLink
>({
  data: new schema.Array(linkEntity),
});

export const channelEntity = new schema.Entity<Moim.Channel.SimpleChannelType>(
  "channels",
  undefined,
  {
    processStrategy: (value: Moim.Channel.SimpleChannelType) => {
      if (value.type !== "forum") {
        return value;
      }

      return {
        ...value,
        thread_templates:
          value.thread_template_ids ?? ([] as Moim.Forum.IPostTemplate[]),
      } as Moim.Channel.IForumSimpleChannel;
    },
  },
);
export const channelDefinition = {
  items: new schema.Array(channelEntity),
  stat: statEntity,
  thread_templates: new schema.Array(PostTemplateEntity),
};

channelEntity.define(channelDefinition);

export const channelSingleItemEntity = new schema.Object<
  Moim.Channel.SimpleChannelType
>({
  data: channelEntity,
});

export const channelListEntity = new schema.Object<
  Moim.Channel.SimpleChannelType
>({
  data: new schema.Array(channelEntity),
});
