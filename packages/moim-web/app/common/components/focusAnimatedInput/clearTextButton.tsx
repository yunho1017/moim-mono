import * as React from "react";

const ClearTextButton = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      fill="#AEB8BD"
      fillRule="evenodd"
      d="M7.747 6.354l3.478-3.479a.986.986 0 0 1 1.398-.005.988.988 0 0 1-.005 1.398L9.14 7.747l3.478 3.478a.986.986 0 0 1 .005 1.398.988.988 0 0 1-1.398-.005L7.747 9.14l-3.479 3.478a.986.986 0 0 1-1.398.005.988.988 0 0 1 .005-1.398l3.479-3.478-3.479-3.479A.986.986 0 0 1 2.87 2.87a.988.988 0 0 1 1.398.005l3.479 3.479z"
    />
  </svg>
);
export default ClearTextButton;
