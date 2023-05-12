declare namespace Moim {
  namespace Tag {
    interface ITag extends Channel.INormalizedCommonChannel {
      url: string;
      type: "tag" | "subgroups";
      is_menu: boolean;
      is_all: boolean;
      tags: Moim.Id[];
    }

    interface IDenormalizedTag extends ITag {
      creator: User.IUser;
      group: Group.IGroup;
      category: Category.ICategory;
    }

    type INormalizedTag = INormalizedEntities<ITag>;

    interface IBatchTagsRequestBody {
      tags: Moim.Id[];
    }

    type IBatchTagsRequest = IBatchTagsRequestBody;

    type IBatchTagsResponseBody = IPaginatedListResponse<ITag>;
  }
}
