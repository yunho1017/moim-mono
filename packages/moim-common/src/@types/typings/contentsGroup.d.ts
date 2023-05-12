declare namespace Moim {
  declare namespace ContentsGroup {
    interface IReduxState {
      groupByThreads: Record<Id, IPaginatedListResponse<Id>>;
    }

    interface IContentsGroupData {
      id: Id;
      groupId: Id;
      userId: Id;
      title: string;
      query: IQuery;
      createdAt: number;
      updatedAt: number;
      listConfig: Blockit.IPostListShowConfig;
      detailUrl: string;
    }

    interface IContentsGroupThread extends Forum.IThread<T> {
      custom_sort1: number;
    }

    interface IQuery {
      filters: IFilterQueries[];
      sort?: ISortQuery;
    }

    interface IFilterQueries {
      type?: THREAD_TYPE[];
      id?: string[];
      groupId?: string[]; // subGroupId
      rootId?: string[]; // type 별 rootId, parentId 는 문서(https://vingle.atlassian.net/wiki/spaces/BT/pages/300089366/Thread) 참고
      parentId?: string[];
      userId?: string[];
      tagSet?: string[];
      createdAt?: IRangeQuery;
      repliesCount?: IRangeQuery;
      voteScore?: IRangeQuery;
      hasPreviewImage?: boolean;
    }

    interface ISortQuery {
      key: string; // target 필드명
      order?: "asc" | "desc";
    }
  }
}
