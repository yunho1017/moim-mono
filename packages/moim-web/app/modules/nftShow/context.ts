import { createContext } from "react";

interface INFTShowContext {
  containerRef: React.RefObject<HTMLDivElement> | null;
  onBack: () => void;
}

const initialValue: INFTShowContext = {
  containerRef: null,
  onBack: () => {},
};

const NFTShowContext = createContext<INFTShowContext>(initialValue);

export { NFTShowContext };
