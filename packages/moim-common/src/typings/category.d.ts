declare namespace Moim {
  declare namespace Category {
    interface ICategory {
      id: string;
      name: string;
      priority: number;
      created_at: number;
      updated_at: number;
    }

    type INormalizedCategory = ICategory;

    type INormalizedCategoryData = INormalizedEntities<INormalizedCategory>;

    // GET: /api/categories
    interface IGetCategoriesRequestBody {
      limit?: number; // default: 30
      after?: string;
    }

    type IGetCategoriesRequest = IGetCategoriesRequestBody;

    type IGetPositionsResponseBody = Moim.IPaginatedListResponse<ICategory>;
  }
}
