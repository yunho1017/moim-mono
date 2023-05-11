declare namespace Moim {
  declare namespace Meeting {
    interface IPreLinkedMeetingInfo {
      id: Moim.Id;
      name: string;
    }
    interface IReduxState {
      currentMeetingData: IAttendeeMeetingData | null;
      isLoading: boolean; // contain: create, join
      hasFailed: boolean; // contain: create, join, end
      error: IErrorResponse | null;
      preLinkMeeting: IPreLinkedMeetingInfo | null;
      hostCommandConfig: Partial<Moim.Meeting.IMeetingConfig>;
      hostActioned: {
        roster: Record<Id, { mic: boolean; video: boolean; chat: boolean }>;
        muteAllMic: boolean;
      };
    }

    interface IAttendeeMeetingChimeData {
      ExternalUserId: Id;
      AttendeeId: Id;
      JoinToken: string;
    }

    interface IMeetingChimeMediaPlacement {
      AudioHostUrl: string;
      AudioFallbackUrl: string;
      ScreenDataUrl: string;
      ScreenSharingUrl: string;
      ScreenViewingUrl: string;
      SignalingUrl: string;
      TurnControlUrl: string;
    }

    interface IMeetingChimeData {
      MeetingId: Id;
      MediaRegion: string;
      MediaPlacement: IMeetingChimeMediaPlacement;
    }

    interface IMeetingData {
      id: Id;
      group: Id;
      creator: Id;
      host: Id;
      config: IMeetingConfig;
      chimeData?: IMeetingChimeData;
      name: string;
    }

    interface IMeetingConfig {
      enableChat: boolean;
      enableMic: boolean;
      enableVideo: boolean;
      pinnedUsers?: string[];
    }

    interface IAttendeeMeetingData {
      groupId: Id;
      meetingId: Id;
      userId: Id;
      accountType: string; // HOST, GUEST
      config: IMeetingConfig; // attendee꺼 정보
      chimeData: IAttendeeMeetingChimeData;
      meeting: IMeetingData; // JOIN 할때만 IMeetingData에 chimeData가 존재.
    }

    interface IAttendeeInterfaceConfig {
      enableVideo?: boolean;
      enableMic?: boolean;
      enableChat?: boolean;
    }

    interface IChangeUserData {
      userId: Id;
      enableVideo?: boolean;
      enableMic?: boolean;
      enableChat?: boolean;
      setVideo?: boolean;
      setMic?: boolean;
    }
    interface IChangeMeetingData {
      name?: string;
      enableVideo?: boolean;
      enableMic?: boolean;
      enableChat?: boolean;
      setVideo?: boolean;
      setMic?: boolean;
    }

    interface IChangeHostData {
      userId: Id;
    }

    interface IPinVideo {
      userId: Id;
    }

    type ICommandData =
      | {
          type: "changeUser";
          data: IChangeUserData;
        }
      | { type: "changeMeeting"; data: IChangeMeetingData }
      | { type: "changeHost"; data: IChangeHostData }
      | { type: "pinVideo"; data: IPinVideo };
  }
}
