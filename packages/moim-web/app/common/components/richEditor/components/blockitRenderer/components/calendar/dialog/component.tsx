import * as React from "react";
import moment from "moment";
import { FormattedMessage, useIntl } from "react-intl";
import { ThemeContext } from "styled-components";
import { ModalContainer, Divider, ScrollSection } from "./styled";
import { H3, H5, Body2, Caption } from "../../texts";
import { ButtonElement } from "../../buttons";

interface IProps {
  event: Moim.Blockit.ICalendarBlockEvent | undefined;
}

export default function Component({ event }: IProps) {
  const intl = useIntl();
  const theme = React.useContext(ThemeContext);
  const startEvent = React.useMemo(() => moment(event?.start), [event?.start]);
  const endEvent = React.useMemo(() => moment(event?.end), [event?.end]);
  const acceptedAttendeeCount = React.useMemo(
    () => event?.attendees.accepted.length ?? 0,
    [event],
  );
  const declinedAttendeeCount = React.useMemo(
    () => event?.attendees.declined.length ?? 0,
    [event],
  );
  const needsActionAttendeeCount = React.useMemo(
    () => event?.attendees.needsAction.length ?? 0,
    [event],
  );

  const redirect = React.useCallback((link: string) => {
    const win = window.open(link);
    win?.focus();
  }, []);

  const redirectEventLink = React.useCallback(() => {
    if (event?.eventLink) {
      redirect(event.eventLink);
    }
  }, [event, redirect]);

  const redirectZoomLink = React.useCallback(() => {
    if (event?.zoomLink) {
      redirect(event.zoomLink);
    }
  }, [event, redirect]);

  const redirectMeetLink = React.useCallback(() => {
    if (event?.meetLink) {
      redirect(event.meetLink);
    }
  }, [event, redirect]);

  const whenElement = React.useMemo(() => {
    const startDateText = startEvent.format(
      intl.formatMessage({ id: "datetime_format_full_time_date" }),
    );
    const endDateText = endEvent.format(
      intl.formatMessage({ id: "datetime_format_full_time_date" }),
    );

    const el =
      event?.isAllDay && startEvent.isSame(endEvent, "day")
        ? startDateText
        : `${startDateText} ~ ${endDateText}`;

    return (
      <>
        <Divider />
        <H5>
          <FormattedMessage id="calendar_block/detail_dialog/when_title" />
        </H5>
        <Body2 color={theme.colorV2.colorSet.grey600}>{el}</Body2>
      </>
    );
  }, [endEvent, event, intl, startEvent, theme.colorV2.colorSet.grey600]);

  const locationElement = React.useMemo(() => {
    const el: React.ReactNode[] = [];

    if (!event) {
      return el;
    }

    if (Boolean(event.location || event.zoomLink || event.meetLink)) {
      el.push(<Divider />);
    }

    if (event.location) {
      el.push(
        <>
          <H5>
            <FormattedMessage id="calendar_block/detail_dialog/where_title" />
          </H5>
          <Body2 color={theme.colorV2.colorSet.grey600}>{event.location}</Body2>
        </>,
      );
    }

    if (event.meetLink) {
      el.push(
        <ButtonElement
          element={{
            type: "ghost",
            style: "general",
            content: intl.formatMessage({
              id: `calendar_block/detail_dialog/join_google_meet`,
            }),
            size: "small",
          }}
          onClick={redirectMeetLink}
        />,
      );
    }

    if (event.zoomLink) {
      el.push(
        <ButtonElement
          element={{
            type: "ghost",
            style: "general",
            content: intl.formatMessage({
              id: `calendar_block/detail_dialog/join_zoom`,
            }),
            size: "small",
          }}
          onClick={redirectZoomLink}
        />,
      );
    }

    return el;
  }, [
    event,
    intl,
    redirectMeetLink,
    redirectZoomLink,
    theme.colorV2.colorSet.grey600,
  ]);

  if (!event) {
    return null;
  }

  return (
    <ModalContainer>
      <ScrollSection>
        <H3 onClick={redirectEventLink}>{event.title}</H3>
        {whenElement}
        {locationElement}
        <Divider />
        <H5>
          <FormattedMessage id="calendar_block/detail_dialog/guests_title" />
        </H5>
        <Body2 color={theme.colorV2.colorSet.grey600}>
          <FormattedMessage
            id="calendar_block/detail_dialog/guests"
            values={{
              count:
                acceptedAttendeeCount +
                declinedAttendeeCount +
                needsActionAttendeeCount,
            }}
          />
        </Body2>
        <Caption color={theme.colorV2.colorSet.grey300}>{`${intl.formatMessage(
          {
            id: "calendar_block/detail_dialog/yes",
          },
          { count: acceptedAttendeeCount },
        )} | ${intl.formatMessage(
          {
            id: "calendar_block/detail_dialog/awaiting",
          },
          { count: needsActionAttendeeCount },
        )} | ${intl.formatMessage(
          {
            id: "calendar_block/detail_dialog/no",
          },
          { count: declinedAttendeeCount },
        )}`}</Caption>
        {event.description && (
          <>
            <Divider />
            <H5>
              <FormattedMessage id="calendar_block/detail_dialog/what_title" />
            </H5>
            <Body2
              color={theme.colorV2.colorSet.grey600}
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </>
        )}
      </ScrollSection>
    </ModalContainer>
  );
}
