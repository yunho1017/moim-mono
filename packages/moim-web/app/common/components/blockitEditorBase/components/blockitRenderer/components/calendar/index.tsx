import * as React from "react";
import debounce from "lodash/debounce";
import Axios from "axios";
import moment from "moment";
import { FlattenInterpolation } from "styled-components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import { ThunkPromiseResult, useActions } from "app/store";
import EventDetailDialog from "./dialog";
import { LoaderWrapper, Loader, Wrapper } from "./styled";

type IProps = Omit<Moim.Blockit.ICalendarBlock, "type"> & {
  wrapperStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
};

export function getCalendarEvents(
  botId: string | undefined,
  eventSource: string,
  start: string,
  end: string,
): ThunkPromiseResult<Moim.Blockit.ICalendarBlockEvent[] | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      if (botId) {
        const result = await apiSelector(
          getState(),
          dispatch,
        ).application.getProxyData({
          botId,
          url: eventSource,
          params: {
            startDate: start,
            endDate: end,
          },
        });
        return result;
      } else {
        const result = await Axios.post(eventSource, {
          startDate: start,
          endDate: end,
        });
        return result.data;
      }
    } catch (error) {
      return [];
    }
  };
}

const CalendarBlock: React.FC<IProps> = ({
  botId,
  events,
  eventSource,
  width,
  height,
  wrapperStyle,
  margin,
}) => {
  const refCalendar = React.useRef<FullCalendar>(null);
  const { dispatchGetCalendarEvents } = useActions({
    dispatchGetCalendarEvents: getCalendarEvents,
  });
  const [calendarEvents, setCalendarEvents] = React.useState<
    Moim.Blockit.ICalendarBlockEvent[]
  >(events ?? []);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [selectedEventId, setSelectedEventId] = React.useState<Moim.Id | null>(
    null,
  );
  const selectedEvent = React.useMemo(
    () => calendarEvents.find(event => event.id === selectedEventId),
    [calendarEvents, selectedEventId],
  );

  const handleEventClick = React.useCallback((args: any) => {
    setSelectedEventId(args.event.id);
  }, []);

  const closeEventDetailDialog = React.useCallback(() => {
    setSelectedEventId(null);
  }, []);

  const updateCalendarEvents = React.useCallback(
    (newEvents: Moim.Blockit.ICalendarBlockEvent[]) => {
      setCalendarEvents(newEvents);
    },
    [],
  );

  const fetchCurrentMonthEvents = React.useCallback(
    debounce(() => {
      const api = refCalendar.current?.getApi();

      const currentCalendarDate = api?.currentDataManager
        ?.getCurrentData()
        .currentDate.toString();

      if (eventSource && currentCalendarDate) {
        setIsLoading(true);
        const start = moment(currentCalendarDate)
          .startOf("month")
          .toISOString();
        const end = moment(currentCalendarDate)
          .endOf("month")
          .toISOString();

        dispatchGetCalendarEvents(botId, eventSource, start, end)
          .then(result => {
            if (result) {
              setCalendarEvents(state => [
                ...new Map(
                  state.concat(result).map(item => [item.id, item]),
                ).values(),
              ]);
            }
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }, 300),
    [botId, dispatchGetCalendarEvents, eventSource, isLoading],
  );

  const handleClickPrev = React.useCallback(() => {
    refCalendar.current?.getApi().prev();
    fetchCurrentMonthEvents();
  }, [fetchCurrentMonthEvents]);

  const handleClickNext = React.useCallback(() => {
    refCalendar.current?.getApi().next();
    fetchCurrentMonthEvents();
  }, [fetchCurrentMonthEvents]);

  React.useEffect(() => {
    if (!eventSource) return;

    const start = moment()
      .subtract(1, "months")
      .startOf("month")
      .toISOString();
    const end = moment()
      .add(1, "months")
      .endOf("month")
      .toISOString();

    setIsLoading(true);
    dispatchGetCalendarEvents(botId, eventSource, start, end)
      .then(result => {
        if (result) {
          updateCalendarEvents(result);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [botId, eventSource]);

  return (
    <Wrapper width={width} overrideStyle={wrapperStyle} margin={margin}>
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      <FullCalendar
        ref={refCalendar}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventClick={handleEventClick}
        customButtons={{
          prev: {
            text: "prev",
            click: handleClickPrev,
          },
          next: {
            text: "next",
            click: handleClickNext,
          },
        }}
        dayMaxEventRows={true}
        height={height}
        contentHeight="auto"
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
      />
      <EventDetailDialog
        event={selectedEvent}
        onClose={closeEventDetailDialog}
      />
    </Wrapper>
  );
};

export default CalendarBlock;
