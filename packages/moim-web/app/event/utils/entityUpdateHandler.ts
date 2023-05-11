import merge from "lodash/merge";
import { EntityData } from "@balmbees/moim-proto/build/js/client/update_pb";
import { AppDispatch } from "app/store";
import { AddEntities } from "app/actions/entity";
import safeParseJSON from "common/helpers/safeParseJSON";
import {
  channelNormalizer,
  messageNormalizer,
  threadNormalizer,
  userNormalizer,
} from "app/models";
import { IAppState } from "app/rootReducer";
import { isEmpty } from "lodash";

export default function updateEntities(
  dispatch: AppDispatch,
  entities: EntityData[],
  state: IAppState,
) {
  const updatedEntities = entities.reduce<Moim.Entity.INormalizedData>(
    (result, current) => {
      const type = current.getEntitytype();
      const id = current.getEntityid();
      const jsonData = current.getEntityjson();
      const entity = safeParseJSON(jsonData, null);

      if (entity) {
        switch (type) {
          case EntityData.Type.MESSAGE: {
            const { entities: messageEntities } = messageNormalizer(
              entity as Moim.Conversations.INormalizedMessage,
            );
            return merge(result, messageEntities);
          }

          case EntityData.Type.THREAD_REPLY:
          case EntityData.Type.THREAD: {
            const baseEntity = state.entities.threads[id];
            const { entities: threadEntities } = threadNormalizer({
              ...baseEntity,
              ...(entity as Moim.Forum.IThread),
            });
            return merge(result, threadEntities);
          }

          case EntityData.Type.USER: {
            const { entities: userEntities } = userNormalizer(
              entity as Moim.User.IOriginalUserDatum,
            );

            return merge(result, userEntities);
          }

          case EntityData.Type.CHANNEL: {
            const { entities: channelEntities } = channelNormalizer(
              entity as Moim.Channel.SimpleChannelType,
            );
            return merge(result, channelEntities);
          }
        }
      }

      return result;
    },
    {} as Moim.Entity.INormalizedData,
  );

  if (!isEmpty(updatedEntities)) {
    dispatch(AddEntities(updatedEntities));
  }
}
