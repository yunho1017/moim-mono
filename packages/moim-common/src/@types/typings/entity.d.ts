declare namespace Moim {
  declare namespace Entity {
    interface INormalizedData {
      threads: Moim.Forum.INormalizedData;
      links: Moim.Channel.Link.INormalizedData;
      conversations: Moim.Conversations.INormalizedConversationData;
      messages: Moim.Conversations.INormalizedData;
      users: Moim.User.INormalizedData;
      groups: Moim.Group.INormalizedData;
      moims: Moim.Group.INormalizedData;
      files: Moim.Upload.INormalizedFileInfoData;
      forums: Moim.Forum.INormalizedForumData;
      blockits: any;
      referenceBlockBlocks: Moim.Blockit.INormalizedReferenceBlockBlocks;
      positions: Moim.Position.INormalizedPositionEntities;
      categories: Moim.Category.INormalizedCategoryData;
      tags: Moim.Tag.INormalizedTag;
      directMessages: Moim.DirectMessage.INormalizedData;
      channels: Moim.Channel.INormalizedData;
      stats: Moim.Channel.IStatNormalizedData;
      tagset: Moim.TagSet.INormalizedTagSet | Moim.TagSet.INormalizedTagItem;
      notifications: Moim.Notification.INormalizedData;
      recommendGroupSection: Moim.Group.INormalizedRecommendGroupSectionData;
      bookmarks: Moim.Bookmark.INormalizedData;
      postTemplates: Forum.IIPostTemplateNormalizedData;
      commerce_seller: Record<Id, Commerce.ISeller>;
      commerce_product: Record<Id, Commerce.IProduct>;
      commerce_productSet: Record<Id, Commerce.IProductSet>;
      commerce_category: Record<Id, Commerce.ICategory>;
      commerce_carts: Record<Id, Commerce.ICartResponse>;
      commerce_purchaseItems: Record<Id, Commerce.IDenormalizedPurchaseItem>;
      commerce_payments: Record<Id, Commerce.IPayment>;
      commerce_purchases: Record<Id, Commerce.IPurchase>;
      commerce_variants: Record<Id, Commerce.IProductVariant>;
      commerce_shipping_address: Record<Id, Commerce.ICommerceShippingAddress>;
      commerce_delivery_group: Record<Id, Commerce.IDeliveryGroup>;
      commerce_coupons: Record<Id, Commerce.ICoupons>;
      campaign_campaign_execution: Record<Id, Campaign.ICampaignExecution>;
      campaign_execution_vote: Record<Id, Campaign.IExecutionVote>;
      campaign_campaign: Record<Id, Campaign.ICampaign>;
      nftItems: Record<Id, Moim.NFT.INftDetail>;
      nftContracts: Record<Id, Moim.NFT.IContract>;
      nftSchedules: Record<Id, Moim.NFT.ISchedule>;
      treasuryItems: Record<Id, Moim.Treasury.ITreasury>;
      community_communities: Record<Id, Moim.Community.ICommunity>;
      community_coins: Record<Id, Moim.Community.Coin.ICoin>;
      dquest_histories: Record<Id, Moim.DQuest.IHistory>;
      dquest_quests: Record<Id, Moim.DQuest.INormalizedQuest>;
      certifications: Record<string, any>;
      cryptobadges_list: Record<Id, Moim.Cryptobadge.NormalizedBadgeListItem>;
      certificates_list: Record<Id, Moim.Cryptobadge.NormalizedCertificateItem>;
    }

    type NormalizedKey = keyof INormalizedData;
  }
}
