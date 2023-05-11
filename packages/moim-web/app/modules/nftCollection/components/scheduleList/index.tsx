import * as React from "react";
import { useStoreState } from "app/store";
import { FormattedMessage } from "react-intl";
// hook
import useIsMobile from "common/hooks/useIsMobile";
// components
import ScheduleItem from "./components/item";
import { Spacer } from "common/components/designSystem/spacer";
import { ScheduleItemSkeleton } from "./components/skeleton";
// style
import { ScheduleListWrapper } from "./styled";
import { MoreButton, MoreButtonIcon, SeeAllButton } from "../../styled";

const CURRENT_TAB_ID = "schedules";

interface IProps {
  scheduleIds?: Moim.Id[];
  setSelectedTabId(value: string | undefined): void;
}

const ScheduleList: React.FC<IProps> = ({
  scheduleIds,
  setSelectedTabId,
}: IProps) => {
  const isMobile = useIsMobile();
  const schedules = useStoreState(state =>
    scheduleIds?.map(iid => state.entities.nftSchedules[iid]),
  );

  const scheduleElement = React.useMemo(() => {
    const isUndefinedArray = schedules?.some(
      schedule => schedule?.id === undefined,
    );
    if (schedules === undefined || isUndefinedArray) {
      return new Array(1).fill(0).map(_ => <ScheduleItemSkeleton />);
    }

    return schedules?.map(schedule =>
      schedule ? (
        <ScheduleItem key={`schedule_${schedule.id}`} schedule={schedule} />
      ) : null,
    );
  }, [schedules]);

  const handleClick = React.useCallback(() => {
    setSelectedTabId(CURRENT_TAB_ID);
  }, [setSelectedTabId]);

  if (!scheduleIds?.length || !schedules?.length) return null;

  return (
    <>
      <ScheduleListWrapper>
        {scheduleElement}
        {isMobile ? (
          <>
            <MoreButton onClick={handleClick}>
              <span>
                <FormattedMessage id={"button_see_all"} />
              </span>
              <MoreButtonIcon />
            </MoreButton>
            <Spacer value={20} />
          </>
        ) : (
          <SeeAllButton onClick={handleClick}>
            <FormattedMessage id="button_see_all" />
          </SeeAllButton>
        )}
      </ScheduleListWrapper>
    </>
  );
};

export default React.memo(ScheduleList);
