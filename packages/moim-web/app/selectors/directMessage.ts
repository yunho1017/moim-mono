import { createSelector } from "reselect";
import { entitiesSelector } from ".";
import {
  directMessageListDenormalizer,
  directMessageDenormalizer,
} from "app/models";
import { IAppState } from "app/rootReducer";

export const directMessagesSelector = createSelector(
  entitiesSelector,
  state => state.directMessage.directMessages,
  (entities, directMessages) =>
    directMessageListDenormalizer(directMessages, entities),
);

export const directMessageSelector = (state: IAppState, id: string) =>
  directMessageDenormalizer(id, state.entities);

export const createDirectMessageLoadingSelector = (state: IAppState) =>
  Boolean(state.directMessage.createDirectMessageLoading);

export const getDirectMessagesLoadingSelector = (state: IAppState) =>
  Boolean(state.directMessage.getDirectMessagesLoading);
