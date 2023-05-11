import * as React from "react";

export default function useUndoRedo<T>(
  initialValue?: T,
): [T | undefined, (value: T) => void, VoidFunction, VoidFunction] {
  const [returnValue, setReturnValue] = React.useState<T | undefined>(
    initialValue,
  );
  const [stack, setStack] = React.useState<(T | undefined)[]>([initialValue]);
  const [currentPos, setCurrentPos] = React.useState(0);

  const undo = React.useCallback(() => {
    const pos = currentPos - 1;
    if (pos >= 0) {
      changeReturnValue(stack[pos], pos);
    }
  }, [currentPos, stack]);

  const redo = React.useCallback(() => {
    const pos = currentPos + 1;
    if (pos !== stack.length) {
      changeReturnValue(stack[pos], pos);
    }
  }, [currentPos, stack]);

  const setValue = React.useCallback(
    (value: T) => {
      const nextPos = currentPos + 1;
      const newStack = [...stack.slice(0, nextPos), value];
      setStack(newStack);
      changeReturnValue(value, nextPos);
    },
    [currentPos, stack],
  );

  const changeReturnValue = (value: T | undefined, pos: number) => {
    setCurrentPos(pos);
    setReturnValue(value);
  };

  return [returnValue, setValue, undo, redo];
}
