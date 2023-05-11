import { createContext } from "react";

interface ICertificateShowContext {
  containerRef: React.RefObject<HTMLDivElement> | null;
  onBack: () => void;
}

const initialValue: ICertificateShowContext = {
  containerRef: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onBack: () => {},
};

const CertificateShowContext = createContext<ICertificateShowContext>(
  initialValue,
);

export { CertificateShowContext };
