import produce from "immer";

interface IState {
  messages: any[];
}

export function stackMessage(message: any) {
  return {
    type: "STACK_MESSAGE" as const,
    payload: {
      message,
    },
  };
}

export const INITIAL_STATE: IState = {
  messages: [],
};

export function reducer(
  state = INITIAL_STATE,
  action: ReturnType<typeof stackMessage>,
) {
  return produce(state, draft => {
    if (action.type === "STACK_MESSAGE") {
      draft.messages.push(action.payload.message);
    }
  });
}
