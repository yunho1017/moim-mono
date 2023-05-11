import { createContext } from "react";

interface ICryptobadgeShowContext {
  containerRef: React.RefObject<HTMLDivElement> | null;
  onBack: () => void;
}

const initialValue: ICryptobadgeShowContext = {
  containerRef: null,
  onBack: () => {},
};

const CryptobadgeShowContext = createContext<ICryptobadgeShowContext>(
  initialValue,
);

export { CryptobadgeShowContext };
