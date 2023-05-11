import { denormalize } from "../";
import {
  PostTemplateEntity,
  postTemplateEntitySingleItemEntity,
  postTemplateEntityListEntity,
} from "./entity";

export const postTemplateDenormalizer = (
  id: string,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Forum.IPostTemplate>(
    id,
    PostTemplateEntity,
    entities,
  );

export const postTemplateSingleItemDenormalizer = (
  input: Moim.ISingleItemResponse<Moim.Id>,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<
    Moim.ISingleItemResponse<Moim.Id>,
    Moim.ISingleItemResponse<Moim.Forum.IPostTemplate>
  >(input, postTemplateEntitySingleItemEntity, entities);

export const postTemplateListDenormalizer = <
  T extends Moim.IListResponse<Moim.Id>
>(
  input: T,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<T, Moim.BetweenListResponse<T, Moim.Forum.IPostTemplate>>(
    input,
    postTemplateEntityListEntity,
    entities,
  );
