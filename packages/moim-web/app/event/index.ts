import { AppDispatch } from "app/store";
import { IAppState } from "app/rootReducer";

import subscribeMentionEventStream from "./mention";
import subscribeStatEventStream from "./stat";
import subscribeNewMessageEventStream from "./newMessage";
import subscribeUpdateEntityEventStream from "./entity";

export const subscribe = (getState: () => IAppState, dispatch: AppDispatch) => {
  subscribeMentionEventStream(getState, dispatch);
  subscribeStatEventStream(getState, dispatch);
  subscribeNewMessageEventStream(getState, dispatch);
  subscribeUpdateEntityEventStream(getState, dispatch);
};
