import { denormalize } from "../";
import { statEntity } from "./entity";

export const statDenormalizer = (
  input: Moim.Id,
  entities: Moim.Entity.INormalizedData,
) =>
  denormalize<Moim.Id, Moim.Channel.IChannelStat>(input, statEntity, entities);
