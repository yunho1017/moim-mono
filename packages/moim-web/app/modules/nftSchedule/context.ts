import { createContext } from "react";

interface INFTScheduleShowContext {
  containerRef: React.RefObject<HTMLDivElement> | null;
  onBack: () => void;
}

const initialValue: INFTScheduleShowContext = {
  containerRef: null,
  onBack: () => {},
};

const NFTScheduleShowContext = createContext<INFTScheduleShowContext>(
  initialValue,
);

export { NFTScheduleShowContext };
