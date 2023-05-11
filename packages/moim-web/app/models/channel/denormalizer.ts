import { denormalize } from "../";
import {
  linkEntity,
  linkListEntity,
  linkSingleItemEntity,
  channelEntity,
  channelSingleItemEntity,
  channelListEntity,
} from "./entity";

export const linkDenormalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Channel.Link.ILinkChannel>(
    input,
    linkEntity,
    entities,
  );

export const linkSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Channel.Link.ILinkChannel>
  >(input, linkSingleItemEntity, entities);

export const linkListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Channel.Link.ILinkChannel>>(
    input,
    linkListEntity,
    entities,
  );

export const channelDenormalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Channel.SimpleChannelType>(
    input,
    channelEntity,
    entities,
  );

export const channelSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Channel.SimpleChannelType>
  >(input, channelSingleItemEntity, entities);

export const channelListDenormalizer = <T extends Moim.IListResponse<Moim.Id>>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Channel.SimpleChannelType>>(
    input,
    channelListEntity,
    entities,
  );
