import { schema } from "normalizr";
import { userEntity } from "../user";

export const PostTemplateEntity = new schema.Entity<
  Moim.Forum.INormalizedPostTemplate
>("postTemplates", undefined, {
  processStrategy(value: Moim.Forum.INormalizedPostTemplate) {
    return {
      ...value,
      lastEditor: value.lastEditorId,
      channels: value.channelIds,
    };
  },
});

export const postTemplateDefinition = {
  lastEditor: userEntity,
  channels: new schema.Array(
    new schema.Entity<Moim.Channel.SimpleChannelType>(
      "channels",
      { thread_templates: new schema.Array(PostTemplateEntity) },
      {
        processStrategy: (value: Moim.Channel.SimpleChannelType) => {
          if (value.type !== "forum") {
            return value;
          }

          return {
            ...value,
            thread_templates: value.thread_template_ids,
          } as Moim.Channel.IForumSimpleChannel;
        },
      },
    ),
  ),
};

PostTemplateEntity.define(postTemplateDefinition);

export const postTemplateEntitySingleItemEntity = new schema.Object<
  Moim.Forum.INormalizedPostTemplate
>({
  data: PostTemplateEntity,
});

export const postTemplateEntityListEntity = new schema.Object<
  Moim.Forum.INormalizedPostTemplate
>({
  data: new schema.Array(PostTemplateEntity),
});
