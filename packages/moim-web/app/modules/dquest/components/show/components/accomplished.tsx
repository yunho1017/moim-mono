import * as React from "react";
import { useCurrentUserLocale } from "common/hooks/useGroupTexts";
import {
  CompleteIconContainer,
  CompleteEngIcon,
  CompleteKrIcon,
} from "../styled";

interface IProps {
  isAccomplished: boolean;
}

const AccomplishedBadge: React.FC<IProps> = ({ isAccomplished }) => {
  const currentLocale = useCurrentUserLocale();

  if (isAccomplished) {
    return (
      <CompleteIconContainer>
        {currentLocale === "ko" ? <CompleteKrIcon /> : <CompleteEngIcon />}
      </CompleteIconContainer>
    );
  }

  return null;
};

export default AccomplishedBadge;
