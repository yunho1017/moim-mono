import { normalize } from "normalizr";
import {
  PostTemplateEntity,
  postTemplateEntitySingleItemEntity,
  postTemplateEntityListEntity,
} from "./entity";

export const postTemplateNormalizer = (
  data: Moim.Forum.INormalizedPostTemplate,
) =>
  normalize<
    Moim.Forum.INormalizedPostTemplate,
    Moim.Entity.INormalizedData,
    Moim.Id
  >(data, PostTemplateEntity);

export const postTemplateSingleItemNormalizer = (
  data: Moim.ISingleItemResponse<Moim.Forum.INormalizedPostTemplate>,
) =>
  normalize<
    Moim.Forum.INormalizedPostTemplate,
    Moim.Entity.INormalizedData,
    Moim.ISingleItemResponse<Moim.Id>
  >(data, postTemplateEntitySingleItemEntity);

export const postTemplateListNormalizer = <
  T extends Moim.IListResponse<Moim.Forum.INormalizedPostTemplate>
>(
  data: T,
) =>
  normalize<
    Moim.Forum.INormalizedPostTemplate,
    Moim.Entity.INormalizedData,
    Moim.BetweenListResponse<T, Moim.Id>
  >(data, postTemplateEntityListEntity);
