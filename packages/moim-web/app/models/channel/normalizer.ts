import { normalize } from "normalizr";
import {
  linkEntity,
  linkSingleItemEntity,
  linkListEntity,
  channelEntity,
  channelSingleItemEntity,
  channelListEntity,
} from "./entity";

export const linkNormalizer = (link: Moim.Channel.Link.INormalizedLink) =>
  normalize<Moim.Forum.INormalizedForum, Moim.Entity.INormalizedData, Moim.Id>(
    link,
    linkEntity,
  );

export const linkSingleItemNormalizer = (
  linkData: Moim.ISingleItemResponse<Moim.Channel.Link.INormalizedLink>,
) =>
  normalize<
    Moim.Channel.Link.INormalizedLink,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(linkData, linkSingleItemEntity);

export const linkListNormalizer = <
  T extends Moim.IListResponse<Moim.Channel.Link.INormalizedLink>
>(
  forumList: T,
) =>
  normalize<
    Moim.Channel.Link.INormalizedLink,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(forumList, linkListEntity);

export const channelNormalizer = (channel: Moim.Channel.SimpleChannelType) =>
  normalize<
    Moim.Channel.SimpleChannelType,
    Moim.Entity.INormalizedData,
    Moim.Id
  >(channel, channelEntity);

export const channelSingleItemNormalizer = (
  linkData: Moim.ISingleItemResponse<Moim.Channel.SimpleChannelType>,
) =>
  normalize<
    Moim.Channel.SimpleChannelType,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(linkData, channelSingleItemEntity);

export const channelListNormalizer = <
  T extends Moim.IListResponse<Moim.Channel.SimpleChannelType>
>(
  forumList: T,
) =>
  normalize<
    Moim.Channel.SimpleChannelType,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(forumList, channelListEntity);
