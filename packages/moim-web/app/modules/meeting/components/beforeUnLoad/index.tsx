import * as React from "react";

interface IProps {
  enable: boolean;
}

const BeforeUnLoad: React.FC<IProps> = ({ enable }) => {
  const handleBeforeUnload = React.useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
    return (e.returnValue = "");
  }, []);

  React.useEffect(() => {
    if (enable) {
      window.addEventListener("beforeunload", handleBeforeUnload, {
        capture: true,
      });
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload, {
        capture: true,
      });
    };
  }, [enable]);
  return null;
};

export default BeforeUnLoad;
