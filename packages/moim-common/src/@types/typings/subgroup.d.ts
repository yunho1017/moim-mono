declare namespace Moim {
  namespace SubGroup {
    interface ISubGroupData {
      tags: IPaginatedListResponse<Moim.Id>;
      currentTags: Moim.Id | null;
      subgroups: IPaginatedListResponse<Moim.Id>;
      joinedSubMoims: IPaginatedListResponse<Moim.Id>;
      recommendMoims: IPaginatedListResponse<Moim.Id>;

      isSubGroupsLoading: boolean;
      joinedSubGroupsLoading: boolean;
      isRecommendMoimsLoading: boolean;
    }
  }
}
