import { AppDispatch } from "app/store";
import { saveMessagesToStore } from "app/actions/gRPC";

const FLUSH_INTERVAL = 1000;
const FLUSH_COUNT = 20;
const CHUNK_SIZE = 50;

// NOTE: Need to upgrade for multiplexing
const MESSAGE_BUFFER: Moim.Conversations.INormalizedMessage[] = [];
let timerId: NodeJS.Timeout | null = null;
let nowFlushing = false;
let channelId: Moim.Id | undefined;

export default function newMessageHandler(
  dispatch: AppDispatch,
  id: Moim.Id,
  message: Moim.Conversations.INormalizedMessage,
) {
  if (MESSAGE_BUFFER.length >= FLUSH_COUNT || channelId !== id) {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
    flush(dispatch);
    channelId = id;
  }
  MESSAGE_BUFFER.push(message);

  if (!timerId) {
    timerId = setInterval(() => {
      if (Boolean(MESSAGE_BUFFER.length) && !nowFlushing) {
        flush(dispatch);
      }
    }, FLUSH_INTERVAL);
  }
}

const flush = (dispatch: AppDispatch) => {
  if (channelId) {
    nowFlushing = true;
    const flushedMessages = MESSAGE_BUFFER.splice(0, CHUNK_SIZE);
    if (Boolean(flushedMessages.length)) {
      dispatch(saveMessagesToStore(channelId, flushedMessages));
    }
    nowFlushing = false;
  }
};
