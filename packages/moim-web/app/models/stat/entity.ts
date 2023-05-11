import { schema } from "normalizr";

export const statDefinition = {};

export const statEntity = new schema.Entity<Moim.Channel.IChannelStat>(
  "stats",
  statDefinition,
  {
    idAttribute: (value, parent) => (parent ? parent.id : value.id),
  },
);

export const statSingleItemEntity = new schema.Object<
  Moim.Channel.IChannelStat
>({
  data: statEntity,
});

export const statListEntity = new schema.Object<Moim.Channel.IChannelStat>({
  data: new schema.Array(statEntity),
});
