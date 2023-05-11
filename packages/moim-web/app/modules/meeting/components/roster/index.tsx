// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as React from "react";
import { FormattedMessage } from "react-intl";
import {
  IconButton,
  RosterGroup,
  useRosterState,
  useMeetingManager,
} from "amazon-chime-sdk-component-library-react";
import { useActions, useStoreState } from "app/store";
import useCurrentUser from "common/hooks/useCurrentUser";
import {
  ActionCreators as MeetingActionCreators,
  changeMeetingStatus as changeMeetingStatusAction,
} from "app/actions/meeting";
import { DATA_MESSAGE_CMD, DATA_MESSAGE_LIFETIME_MS } from "../..";
import RosterAttendee from "../rosterAttendee";
import { Wrapper, Header, Title, Close, Footer, MuteButton } from "./styled";

interface IProps {
  onCloseRoster(): void;
}

const MeetingRoster: React.FC<IProps> = ({ onCloseRoster }) => {
  const [filter] = React.useState("");
  const { roster } = useRosterState();
  const currentUser = useCurrentUser();
  const meetingManager = useMeetingManager();
  const { meetingId, hostId, hostActioned } = useStoreState(state => ({
    meetingId: state.meeting.currentMeetingData?.meetingId,
    hostId: state.meeting.currentMeetingData?.meeting.host,
    hostActioned: state.meeting.hostActioned,
  }));
  const { changeMeetingStatus, changeHostAction } = useActions({
    changeMeetingStatus: changeMeetingStatusAction,
    changeHostAction: MeetingActionCreators.hostActioned,
  });

  const amIHost = React.useMemo(() => {
    if (!hostId || !currentUser) {
      return false;
    }
    return hostId === currentUser.id;
  }, [currentUser, hostId]);

  const attendees = React.useMemo(() => {
    const attendeesArray = Object.values(roster);
    if (filter) {
      return attendeesArray.filter((attendee: any) =>
        attendee?.name.toLowerCase().includes(filter.trim().toLowerCase()),
      );
    }
    return attendeesArray;
  }, [filter, roster]);

  const sendCommand = React.useCallback(
    (data: Moim.Meeting.ICommandData) => {
      if (meetingManager.audioVideo) {
        meetingManager.audioVideo!.realtimeSendDataMessage(
          DATA_MESSAGE_CMD,
          JSON.stringify(data),
          DATA_MESSAGE_LIFETIME_MS,
        );
      }
    },
    [meetingManager.audioVideo],
  );

  const handleClickMuteAllButton = React.useCallback(() => {
    if (meetingId) {
      const flag = hostActioned.muteAllMic === false ? false : true;
      sendCommand({
        type: "changeMeeting",
        data: {
          enableMic: flag,
          setMic: flag,
        },
      });
      changeMeetingStatus(meetingId, {
        config: {
          enableMic: flag,
        },
      });
      changeHostAction({
        attendeeId: "",
        attendeeIds: attendees.map(({ chimeAttendeeId }) => chimeAttendeeId),
        muteAllMic: !hostActioned.muteAllMic,
      });
    }
  }, [
    attendees,
    changeHostAction,
    changeMeetingStatus,
    hostActioned.muteAllMic,
    meetingId,
    sendCommand,
  ]);

  const attendeeItems = React.useMemo(
    () =>
      attendees.map((attendee: any) => {
        const { chimeAttendeeId, externalUserId } = attendee || {};

        return (
          <RosterAttendee
            className="roster-attendee"
            key={chimeAttendeeId}
            amIHost={amIHost}
            attendeeId={chimeAttendeeId}
            externalUserId={externalUserId}
          />
        );
      }),
    [attendees, amIHost],
  );

  return (
    <Wrapper>
      <Header className="roster-header">
        <Title>
          <FormattedMessage
            id="video_chat/screen/participants_list_title"
            values={{ count: attendees.length }}
          />
        </Title>
        <IconButton
          className="close-button"
          label="close"
          onClick={onCloseRoster}
          icon={<Close />}
        />
      </Header>
      <RosterGroup className="roster-attendee-group">
        {attendeeItems}
      </RosterGroup>
      {amIHost && (
        <Footer className="roster-footer">
          <MuteButton
            isActive={hostActioned.muteAllMic}
            onClick={handleClickMuteAllButton}
          >
            <FormattedMessage
              id={
                hostActioned.muteAllMic
                  ? "video_chat_screen_participants_list_button_enable_mic_all"
                  : "video_chat_screen_participants_list_button_disable_mic_all"
              }
            />
          </MuteButton>
        </Footer>
      )}
    </Wrapper>
  );
};

export default MeetingRoster;
