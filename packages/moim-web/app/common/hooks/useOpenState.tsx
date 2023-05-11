import * as React from "react";

function useOpenState(defaultState: boolean = false) {
  const [isOpen, setIsOpen] = React.useState<boolean>(defaultState);

  const close = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const open = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return React.useMemo(
    () => ({
      isOpen,
      open,
      close,
      setIsOpen,
    }),
    [isOpen, open, close, setIsOpen],
  );
}

export default useOpenState;
