/**
 * Explain about 'LIMITED_OR_CREATOR': https://vteam.slack.com/archives/C014HJKHMB2/p1591756321002500
 */

declare namespace Moim {
  namespace Cryptobadge {
    import {
      getBadges_badges_edges_node,
      getBadges_badges_edges,
      getBadgeMintRequest_node,
    } from "@vingle/cryptobadge-sdk";
    export interface ICryptobadgeGroupPreviewConfig {
      showGroupName: true;
    }

    // certification
    interface INormalizedCertification {
      node: Moim.Id;
      __typename: string;
    }
    interface ICertificationStatus {
      pageInfo: {
        hasNextPage: boolean | null;
        endCursor: string | null;
        __typename: "PageInfo";
      };
      totalCount: number;
    }
    type NormalizedCertificationList = IListResponse<INormalizedCertification>;

    // certificate
    type NormalizedCertificateItem = getCertificates_certificates_edges;
    type NormalizedCertificateList = IListResponse<NormalizedCertificateItem>;
    // badge
    type NormalizedBadgeListItem = getBadges_badges_edges_node;
    type NormalizedBadgeList = IListResponse<NormalizedBadgeListItem>;
    // mint requests
    type NormalizedMintRequestListItem = getBadgeMintRequest_node;
    type NormalizedMintRequestList = IListResponse<
      NormalizedMintRequestListItem
    >;

    // moim api
    interface ICryptobadgeGroup {
      id: string;
      name: string;
      description?: string;
      communityId: string;
      userId: string;
      scope: string[];
      condition: {
        filters: [
          {
            id: string[];
          },
        ];
        sort: [
          {
            key: string;
            order: string;
          },
        ];
      };
      createdAt: 0;
      updatedAt: 0;
    }

    interface ITokenPrice {
      communityTokenId: string;
      amount: number | string;
    }

    export interface ICryptoBadgeClaimCondition {
      whiteListUsers?: any[];
      whiteList?: { addresses?: string[]; merkleRoot?: string };
      price: ITokenPrice;
    }

    export interface ICryptobadge {
      id: string;
      backgroundColor?: string;
      certificateAnimationUri?: string;
      certificateImageUri?: string;
      claimable?: boolean;
      criteria?: string;
      description?: string;
      issuer?: string;
      metadataVersion?: number;
      name?: string;
      properties?: any;
      tags?: string[];
      textColor?: string;
      transferable?: true;
      chainId?: number;
      contract?: string;
      metadataText?: string;
      resourceUrl?: string;
      claimCondition?: ICryptoBadgeClaimCondition;
      minters?: string[];
      winConditionTitle?: { locale: string; value: string }[];
      descriptionTitle?: { locale: string; value: string }[];
    }
  }
}
