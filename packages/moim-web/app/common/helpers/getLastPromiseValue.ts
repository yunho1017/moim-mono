async function getLastPromiseValue<T>(list: (() => Promise<T>)[]) {
  let value: T | undefined;

  try {
    for (const promiseFunc of list) {
      value = await promiseFunc();
    }
  } catch (e) {
    throw e;
  }

  return value;
}

export default getLastPromiseValue;
