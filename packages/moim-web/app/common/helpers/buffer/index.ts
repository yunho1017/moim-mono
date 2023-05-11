interface IBufferArgs<T, V> {
  subscribedFn: (bufferArgs: T[]) => Promise<V>;
  ms?: number;
}

export default function buffer<T, V>({
  subscribedFn,
  ms = 500,
}: IBufferArgs<T, V>) {
  let buffers: T[] = [];
  let subscribePromise: Promise<V> | undefined;
  const callSubscribe = async () => {
    if (!subscribePromise) {
      subscribePromise = new Promise(resolve => {
        setTimeout(async () => {
          subscribePromise = undefined;
          const bufferArgs = buffers;
          buffers = [];
          resolve(await subscribedFn(bufferArgs));
        }, ms);
      });
    }
    return subscribePromise;
  };
  return async (arg: T) => {
    buffers.push(arg);
    return callSubscribe();
  };
}
