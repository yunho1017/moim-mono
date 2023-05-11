import * as React from "react";
import {
  ScheduleInner,
  ScheduleHeaderWrapper,
  ScheduleHeaderTitle,
} from "./styled";
import HeaderButtons from "./buttons";
import { Spacer } from "common/components/designSystem/spacer";
import useIsMobile from "common/hooks/useIsMobile";

interface IProps {
  title: string;
  hasBanner: boolean;
}

const NftScheduleShowTitle: React.FC<IProps> = ({
  title,
  hasBanner,
}: IProps) => {
  const isMobile = useIsMobile();

  return (
    <ScheduleInner>
      <Spacer value={isMobile ? (hasBanner ? 24 : 0) : 48} />
      <ScheduleHeaderWrapper>
        <ScheduleHeaderTitle>{title}</ScheduleHeaderTitle>
        {!isMobile && <HeaderButtons />}
      </ScheduleHeaderWrapper>
    </ScheduleInner>
  );
};

export default React.memo(NftScheduleShowTitle);
