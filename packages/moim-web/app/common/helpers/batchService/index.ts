import { CancelToken } from "axios";
import memoize from "lodash/memoize";
import chunk from "lodash/chunk";
import { MoimAPI } from "common/api";
import { AppDispatch } from "app/store";
import { userListNormalizer } from "app/models/user";
import { fileListNormalizer } from "app/models/file";
import { positionListNormalizer } from "app/models/position";
import deepMerge from "common/helpers/merge/deepMerge";
import {
  channelListNormalizer,
  tagListNormalizer,
  threadListNormalizer,
  postTemplateListNormalizer,
  productListNormalizer,
  nftContractListNormalizer,
  nftScheduleListNormalizer,
  coinListNormalizer,
  directMessageListNormalizer,
} from "app/models";

import { groupListNormalizer } from "app/models/group";
import { campaignExecutionListNormalizer } from "app/models/campaign/normalizer";
import {
  sellerListNormalizer,
  productSetListNormalizer,
  productVariantListNormalizer,
  deliveryGroupListNormalizer,
  couponListNormalizer,
} from "app/models/commerce/normalizer";
import {
  DQuestHistoryListNormalizer,
  DQuestQuestListNormalizer,
} from "app/models/dquest";

const BATCH_USER_ITEM_CHUNK_SIZE = 100;
const BATCH_ITEM_CHUNK_SIZE = 50;

const APIInstance = memoize((dispatch?: AppDispatch) => {
  const api = new MoimAPI(dispatch);

  return api;
});

async function batchUserDataHandler(
  users: Moim.Id[],
  cancelToken?: CancelToken,
) {
  let after: Moim.PagingValue | undefined;
  let userData: Moim.User.IOriginalUserDatum[] = [];

  do {
    const { data, paging } = await APIInstance().user.batchUsers(
      { users },
      cancelToken,
      {
        notUsedBuffer: users.length === BATCH_USER_ITEM_CHUNK_SIZE,
      },
    );
    userData = userData.concat(data);
    after = paging.after;
  } while (Boolean(after));
  return userData;
}

export async function batchUserData(
  users: Moim.Id[],
  cancelToken?: CancelToken,
) {
  const chunkItems = chunk(users, BATCH_USER_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.User.IOriginalUserDatum[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchUserDataHandler(items, cancelToken));
  });

  const userData = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return userListNormalizer({ data: userData }).entities;
}

async function batchFileDataHandler(files: Moim.Id[]) {
  let after: Moim.PagingValue | undefined;
  let fileData: Moim.Upload.IFileInfo[] = [];
  do {
    const { data, paging } = await APIInstance().file.getFileBatch({
      files,
    });
    fileData = fileData.concat(data);
    after = paging.after;
  } while (Boolean(after));

  return fileData;
}

export async function batchFileData(files: Moim.Id[]) {
  const chunkItems = chunk(files, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Upload.IFileInfo[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchFileDataHandler(items));
  });

  const fileData = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return fileListNormalizer({ data: fileData }).entities;
}

async function batchPositionDataHandler(positionIds: Moim.Id[]) {
  let after: Moim.PagingValue | undefined;
  let positionData: Moim.Position.IPosition[] = [];
  do {
    const { data, paging } = await APIInstance().position.getPositionsBatch({
      positions: positionIds,
    });
    positionData = positionData.concat(data);
    after = paging.after;
  } while (Boolean(after));

  return positionData;
}

export async function batchPositionData(positionIds: Moim.Id[]) {
  const chunkItems = chunk(positionIds, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Position.IPosition[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchPositionDataHandler(items));
  });

  const positionData = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return positionListNormalizer({ data: positionData }).entities;
}

async function batchTagDataHandler(tags: Moim.Id[], cancelToken?: CancelToken) {
  let after: Moim.PagingValue | undefined;
  let tagData: Moim.Tag.ITag[] = [];

  do {
    const { data, paging } = await APIInstance().tag.batchTags(
      { tags },
      cancelToken,
    );
    tagData = tagData.concat(data);
    after = paging.after;
  } while (Boolean(after));
  return tagData;
}

export async function batchTagData(tags: Moim.Id[], cancelToken?: CancelToken) {
  const chunkItems = chunk(tags, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Tag.ITag[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchTagDataHandler(items, cancelToken));
  });

  const tagData = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return tagListNormalizer({ data: tagData }).entities;
}

async function batchGroupDataHandler(
  groups: Moim.Id[],
  cancelToken?: CancelToken,
) {
  let after: Moim.PagingValue | undefined;
  let groupData: Moim.Group.INormalizedGroup[] = [];

  do {
    const { data, paging } = await APIInstance().group.batchGroup(
      { groups },
      cancelToken,
    );
    groupData = groupData.concat(data);
    after = paging.after;
  } while (Boolean(after));
  return groupData;
}

export async function batchGroupData(
  groups: Moim.Id[],
  cancelToken?: CancelToken,
) {
  const chunkItems = chunk(groups, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Group.INormalizedGroup[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchGroupDataHandler(items, cancelToken));
  });

  const groupData = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return groupListNormalizer({ data: groupData }).entities;
}

async function batchThreadDataHandler(
  threads: Moim.Id[],
  cancelToken?: CancelToken,
) {
  let after: Moim.PagingValue | undefined;
  let forumData: Moim.Forum.IThread[] = [];

  do {
    const { data, paging } = await APIInstance().forum.batchThread(
      { threads },
      cancelToken,
    );
    forumData = forumData.concat(data);
    after = paging.after;
  } while (Boolean(after));
  return forumData;
}

export async function batchThreadData(
  threads: Moim.Id[],
  cancelToken?: CancelToken,
) {
  const chunkItems = chunk(threads, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Forum.IThread[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchThreadDataHandler(items, cancelToken));
  });

  const groupData = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return threadListNormalizer({ data: groupData }).entities;
}

async function batchChannelDataHandler(
  channels: Moim.Id[],
  cancelToken?: CancelToken,
) {
  let after: Moim.PagingValue | undefined;
  let channelData: Moim.Channel.SimpleChannelType[] = [];

  do {
    const { data, paging } = await APIInstance().channel.batchChannel(
      { channels },
      cancelToken,
    );
    channelData = channelData.concat(data);
    after = paging.after;
  } while (Boolean(after));
  return channelData;
}

export async function batchChannelData(
  channels: Moim.Id[],
  cancelToken?: CancelToken,
) {
  const chunkItems = chunk(channels, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Channel.SimpleChannelType[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchChannelDataHandler(items, cancelToken));
  });

  const channelData = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return channelListNormalizer({ data: channelData }).entities;
}

async function batchPostTemplateDataHandler(
  templates: Moim.Id[],
  cancelToken?: CancelToken,
) {
  let after: Moim.PagingValue | undefined;
  let postTemplates: Moim.Forum.INormalizedPostTemplate[] = [];
  do {
    const { data, paging } = await APIInstance().forum.batchThreadTemplates(
      { threadTemplates: templates },
      cancelToken,
    );
    postTemplates = postTemplates.concat(data);
    after = paging?.after ?? "";
  } while (Boolean(after));

  return postTemplates;
}

export async function batchPostTemplateData(
  data: Moim.Id[],
  cancelToken?: CancelToken,
) {
  const chunkItems = chunk(data, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Forum.INormalizedPostTemplate[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchPostTemplateDataHandler(items, cancelToken));
  });

  const postTemplates = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return postTemplateListNormalizer({ data: postTemplates }).entities;
}

async function batchCommerceCouponHandler(ids: Moim.Id[]) {
  let after: Moim.PagingValue | undefined;
  let stack: Moim.Commerce.ICoupons[] = [];

  do {
    const { data, paging } = await APIInstance().commerce.batchCoupon(ids);
    stack = stack.concat(data);
    after = paging?.after ?? "";
  } while (Boolean(after));
  return stack;
}

export async function batchCommerceCoupon(ids: Moim.Id[]) {
  const chunkItems = chunk(ids, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Commerce.ICoupons[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchCommerceCouponHandler(items));
  });

  const data = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return couponListNormalizer({ data, paging: {} }).entities;
}

export async function batchCommerceProductHandler(ids: Moim.Id[]) {
  let after: Moim.PagingValue | undefined;
  let stack: Moim.Commerce.IProduct[] = [];

  do {
    const { data, paging } = await APIInstance().commerce.batchProduct(ids);
    stack = stack.concat(data);
    after = paging?.after ?? "";
  } while (Boolean(after));
  return stack;
}

export async function batchCommerceProduct(ids: Moim.Id[]) {
  const chunkItems = chunk(ids, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Commerce.IProduct[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchCommerceProductHandler(items));
  });

  const data = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return productListNormalizer({ data, paging: {} }).entities;
}

async function batchCommerceProductSetHandler(ids: Moim.Id[]) {
  let after: Moim.PagingValue | undefined;
  let stack: Moim.Commerce.IProductSet[] = [];

  do {
    const { data, paging } = await APIInstance().commerce.batchProductSet(ids);
    stack = stack.concat(data);
    after = paging?.after ?? "";
  } while (Boolean(after));
  return stack;
}

export async function batchCommerceProductSet(ids: Moim.Id[]) {
  const chunkItems = chunk(ids, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Commerce.IProductSet[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchCommerceProductSetHandler(items));
  });

  const data = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return productSetListNormalizer({ data, paging: {} }).entities;
}

async function batchCommerceSellerHandler(ids: Moim.Id[]) {
  let after: Moim.PagingValue | undefined;
  let stack: Moim.Commerce.ISeller[] = [];

  do {
    const { data, paging } = await APIInstance().commerce.batchSeller(ids);
    stack = stack.concat(data);
    after = paging?.after ?? "";
  } while (Boolean(after));
  return stack;
}

export async function batchCommerceSeller(ids: Moim.Id[]) {
  const chunkItems = chunk(ids, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Commerce.ISeller[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchCommerceSellerHandler(items));
  });

  const data = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return sellerListNormalizer({ data, paging: {} }).entities;
}

async function batchCommerceVariantHandler(ids: Moim.Id[]) {
  let after: Moim.PagingValue | undefined;
  let stack: Moim.Commerce.IProductVariant[] = [];

  do {
    const { data, paging } = await APIInstance().commerce.batchVariants(ids);
    stack = stack.concat(data);
    after = paging?.after ?? "";
  } while (Boolean(after));
  return stack;
}

export async function batchCommerceVariant(ids: Moim.Id[]) {
  const chunkItems = chunk(ids, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Commerce.IProductVariant[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchCommerceVariantHandler(items));
  });

  const data = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return productVariantListNormalizer({ data, paging: {} }).entities;
}

async function batchCampaignExecutionHandler(ids: Moim.Id[]) {
  let after: Moim.PagingValue | undefined;
  let stack: Moim.Campaign.ICampaignExecution[] = [];

  do {
    const {
      data,
      paging,
    } = await APIInstance().campaign.batchCampaignExecution(ids);
    stack = stack.concat(data);
    after = paging?.after ?? "";
  } while (Boolean(after));
  return stack;
}

export async function batchCampaignExecution(ids: Moim.Id[]) {
  const chunkItems = chunk(ids, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Campaign.ICampaignExecution[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchCampaignExecutionHandler(items));
  });

  const data = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return campaignExecutionListNormalizer({ data, paging: {} }).entities;
}

async function batchDeliveryGroupHandler(ids: Moim.Id[]) {
  let after: Moim.PagingValue | undefined;
  let stack: Moim.Commerce.IDeliveryGroup[] = [];

  do {
    const { data, paging } = await APIInstance().commerce.batchDeliveryGroups(
      ids,
    );
    stack = stack.concat(data);
    after = paging?.after ?? "";
  } while (Boolean(after));
  return stack;
}

export async function batchDeliveryGroup(ids: Moim.Id[]) {
  const chunkItems = chunk(ids, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Commerce.IDeliveryGroup[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchDeliveryGroupHandler(items));
  });

  const data = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return deliveryGroupListNormalizer({ data, paging: {} }).entities;
}

async function batchNftContractHandler(ids: Moim.Id[]) {
  let stack: Moim.NFT.IContract[] = [];

  const { data } = await APIInstance().nft.getContractsDetail(ids);
  stack = stack.concat(data);
  return stack;
}

export async function batchNftContract(ids: Moim.Id[]) {
  const chunkItems = chunk(ids, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.NFT.IContract[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchNftContractHandler(items));
  });

  const data = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return nftContractListNormalizer({ data }).entities;
}

async function batchNftScheduleHandler(ids: Moim.Id[]) {
  let stack: Moim.NFT.ISchedule[] = [];

  const { data } = await APIInstance().nft.getSchedulesDetail(ids);
  stack = stack.concat(data);
  return stack;
}

export async function batchNftSchedule(ids: Moim.Id[]) {
  const chunkItems = chunk(ids, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.NFT.ISchedule[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchNftScheduleHandler(items));
  });

  const data = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return nftScheduleListNormalizer({ data }).entities;
}

async function batchDQuestHistoryHandler(ids: Moim.Id[]) {
  let after: Moim.PagingValue | undefined;
  let stack: Moim.DQuest.IHistory[] = [];

  do {
    const { data, paging } = await APIInstance().dquest.batchHistories(ids);
    stack = stack.concat(data);
    after = paging?.after ?? "";
  } while (Boolean(after));
  return stack;
}

export async function batchDQuestHistory(ids: Moim.Id[]) {
  const chunkItems = chunk(ids, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.DQuest.IHistory[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchDQuestHistoryHandler(items));
  });

  const data = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return DQuestHistoryListNormalizer({ data, paging: {} }).entities;
}

async function batchDQuestQuestHandler(ids: Moim.Id[]) {
  let after: Moim.PagingValue | undefined;
  let stack: Moim.DQuest.IQuest[] = [];

  do {
    const { data, paging } = await APIInstance().dquest.batchQuests(ids);
    stack = stack.concat(data);
    after = paging?.after ?? "";
  } while (Boolean(after));
  return stack;
}

export async function batchDQuestQuest(ids: Moim.Id[]) {
  const chunkItems = chunk(ids, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.DQuest.IQuest[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchDQuestQuestHandler(items));
  });

  const data = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return DQuestQuestListNormalizer({ data, paging: {} }).entities;
}

async function batchCoinHandler(ids: Moim.Id[]) {
  let after: Moim.PagingValue | undefined;
  let stack: Moim.Community.Coin.ICoin[] = [];

  do {
    const { data, paging } = await APIInstance().coin.batchCoin(ids);
    stack = stack.concat(data);
    after = paging?.after ?? "";
  } while (Boolean(after));
  return stack;
}

export async function batchCoin(ids: Moim.Id[]) {
  const chunkItems = chunk(ids, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.Community.Coin.ICoin[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchCoinHandler(items));
  });

  const data = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return coinListNormalizer({ data, paging: {} }).entities;
}

export async function batchDirectMessagesHandler(ids: Moim.Id[]) {
  let after: Moim.PagingValue | undefined;
  let stack: Moim.DirectMessage.INormalizedDirectMessage[] = [];

  do {
    const {
      data,
      paging,
    } = await APIInstance().directMessage.batchDirectMessages({
      directMessages: ids,
    });
    stack = stack.concat(data);
    after = paging?.after ?? "";
  } while (Boolean(after));
  return stack;
}

export async function batchDirectMessages(ids: Moim.Id[]) {
  const chunkItems = chunk(ids, BATCH_ITEM_CHUNK_SIZE);
  const promises: Promise<Moim.DirectMessage.INormalizedDirectMessage[]>[] = [];

  chunkItems.forEach(items => {
    promises.push(batchDirectMessagesHandler(items));
  });

  const data = (await Promise.all(promises)).reduce(
    (prevArray, currValue) => prevArray.concat(currValue),
    [],
  );

  return directMessageListNormalizer({ data, paging: {} }).entities;
}

export async function getNormalizedBatchDataFromEntities(
  entities: Partial<Record<keyof Moim.Entity.INormalizedData, Moim.Id[]>>,
): Promise<Partial<Moim.Entity.INormalizedData>> {
  let batchData: any[] = [];
  try {
    batchData = await Promise.all([
      entities.users?.length ? batchUserData(entities.users) : undefined,
      entities.files?.length ? batchFileData(entities.files) : undefined,
      entities.positions?.length
        ? batchPositionData(entities.positions)
        : undefined,
      entities.tags?.length ? batchTagData(entities.tags) : undefined,
      entities.groups?.length ? batchGroupData(entities.groups) : undefined,
      entities.threads?.length ? batchThreadData(entities.threads) : undefined,
      entities.channels?.length
        ? batchChannelData(entities.channels)
        : undefined,
      entities.postTemplates?.length
        ? batchPostTemplateData(entities.postTemplates)
        : undefined,
      entities.commerce_product?.length
        ? await batchCommerceProduct(entities.commerce_product)
        : undefined,
      entities.commerce_productSet?.length
        ? batchCommerceProductSet(entities.commerce_productSet)
        : undefined,
      entities.commerce_seller?.length
        ? batchCommerceSeller(entities.commerce_seller)
        : undefined,
      entities.commerce_variants?.length
        ? batchCommerceVariant(entities.commerce_variants)
        : undefined,
      entities.campaign_campaign_execution?.length
        ? batchCampaignExecution(entities.campaign_campaign_execution)
        : undefined,
      entities.commerce_delivery_group?.length
        ? batchDeliveryGroup(entities.commerce_delivery_group)
        : undefined,
      entities.commerce_coupons?.length
        ? batchCommerceCoupon(entities.commerce_coupons)
        : undefined,
      entities.nftContracts?.length
        ? batchNftContract(entities.nftContracts)
        : undefined,
      entities.nftSchedules?.length
        ? batchNftSchedule(entities.nftSchedules)
        : undefined,
      entities.dquest_histories?.length
        ? batchDQuestHistory(entities.dquest_histories)
        : undefined,
      entities.dquest_quests?.length
        ? batchDQuestQuest(entities.dquest_quests)
        : undefined,
      entities.community_coins?.length
        ? batchCoin(entities.community_coins)
        : undefined,
    ]);
    // eslint-disable-next-line no-empty
  } catch {}
  return deepMerge({}, ...batchData);
}
