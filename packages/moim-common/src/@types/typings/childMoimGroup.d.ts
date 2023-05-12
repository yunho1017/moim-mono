declare namespace Moim {
  declare namespace ChildMoimGroup {
    interface IReduxState {
      groupByMoims: Record<Id, IPaginatedListResponse<Id>>;
    }

    // NOTE: Can expand more
    interface IQueryFilter {
      id?: string[];
      groupId?: string[]; // subGroupId
      rootId?: string[]; // type 별 rootId, parentId 는 문서(https://vingle.atlassian.net/wiki/spaces/BT/pages/300089366/Thread) 참고
      parentId?: string[];
      userId?: string[];
      tagSet?: string[];
      createdAt?: IRangeQuery;
      repliesCount?: IRangeQuery;
      voteScore?: IRangeQuery;
    }

    interface IChildMoimGroupData {
      id: Id;
      groupId: Id;
      userId: Id;
      title: string;
      query: {
        filters: IQueryFilter[];
      };
      createdAt: number;
      description: string;
      listConfig: Blockit.IPostListShowConfig;
      updatedAt?: number;
    }

    type IChildMoimGroupMoimDatum = Group.IGroup;
    type IChildMoimGroupMoimRawDatum = Group.INormalizedGroup;
  }
}
