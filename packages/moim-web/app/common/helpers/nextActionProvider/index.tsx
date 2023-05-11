import * as React from "react";

export interface INextActionContext {
  registerNextAction(eventType: string, payload: any): void;
  unregisterNextAction(eventType: string): void;

  addEventListener(
    eventType: string,
    callback: (...props: any) => void,
  ): Moim.Id;
  addEventListenerOnce(
    eventType: string,
    callback: (...props: any) => void,
  ): Moim.Id;
  removeEventListener(id: Moim.Id);
  removeEventListenerOnce(id: Moim.Id);
  trigger(eventType: string): void;
}

const MOCK_FUNC_1 = () => "";
const MOCK_FUNC_2 = () => {};

const InitialContext: INextActionContext = {
  registerNextAction: MOCK_FUNC_1,
  unregisterNextAction: MOCK_FUNC_2,
  addEventListener: MOCK_FUNC_1,
  addEventListenerOnce: MOCK_FUNC_1,
  removeEventListener: MOCK_FUNC_2,
  removeEventListenerOnce: MOCK_FUNC_2,
  trigger: MOCK_FUNC_2,
};

export const NextActionContext = React.createContext<INextActionContext>(
  InitialContext,
);

export default function NextActionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [nextActionHeap, setActionHeap] = React.useState<Record<string, any>>(
    {},
  );
  const [eventListener, setEventListener] = React.useState<
    Record<string, Record<number, (...props: any) => void>>
  >({});
  const [onceEventListener, setOnceEventListener] = React.useState<
    Record<string, Record<number, (...props: any) => void>>
  >({});

  const registerNextAction = React.useCallback(
    (eventType: string, payload: any) => {
      setActionHeap(state => ({
        ...state,
        [eventType]: payload,
      }));
    },
    [],
  );
  const unregisterNextAction = React.useCallback((eventType: string) => {
    setActionHeap(state => ({
      ...state,
      [eventType]: undefined,
    }));
  }, []);

  const addEventListener = React.useCallback(
    (eventType: string, callback: (...props: any) => void) => {
      let newId: Moim.Id = "";
      setEventListener(state => {
        newId = `${eventType}-${Object.keys(state[eventType] ?? {}).length +
          1}`;
        return {
          ...state,
          [eventType]: {
            ...state[eventType],
            [newId]: callback,
          },
        };
      });

      return newId;
    },
    [],
  );
  const addEventListenerOnce = React.useCallback(
    (eventType: string, callback: (...props: any) => void) => {
      let newId: Moim.Id = "";
      setOnceEventListener(state => {
        newId = `${eventType}-${Object.keys(state[eventType] ?? {}).length +
          1}`;
        return {
          ...state,
          [eventType]: {
            ...state[eventType],
            [newId]: callback,
          },
        };
      });

      return newId;
    },
    [],
  );

  const removeEventListener = React.useCallback((id: Moim.Id) => {
    setEventListener(state => {
      try {
        const type = id.split("-")[0];

        delete state[type][id];
        return state;
        // eslint-disable-next-line no-empty
      } catch {}
      return state;
    });
  }, []);
  const removeEventListenerOnce = React.useCallback((id: Moim.Id) => {
    setEventListener(state => {
      try {
        const type = id.split("-")[0];

        delete state[type][id];
        return state;
        // eslint-disable-next-line no-empty
      } catch {}
      return state;
    });
  }, []);

  const trigger = React.useCallback(
    (eventType: string) => {
      const registeredKey = Object.entries(nextActionHeap)
        .map(([type, payload]) => (Boolean(payload) ? type : undefined))
        .filter(i => Boolean(i));
      if (registeredKey.includes(eventType)) {
        if (eventListener[eventType]) {
          Object.entries(eventListener[eventType]).forEach(([, cb]) => {
            cb(nextActionHeap[eventType]);
          });
        }

        if (onceEventListener[eventType]) {
          Object.entries(onceEventListener[eventType]).forEach(([id, cb]) => {
            cb(nextActionHeap[eventType]);
            removeEventListenerOnce(id);
          });
        }

        unregisterNextAction(eventType);
      }
    },
    [
      eventListener,
      nextActionHeap,
      onceEventListener,
      removeEventListenerOnce,
      unregisterNextAction,
    ],
  );

  return (
    <NextActionContext.Provider
      value={{
        registerNextAction,
        unregisterNextAction,
        addEventListener,
        addEventListenerOnce,
        removeEventListener,
        removeEventListenerOnce,
        trigger,
      }}
    >
      {children}
    </NextActionContext.Provider>
  );
}
