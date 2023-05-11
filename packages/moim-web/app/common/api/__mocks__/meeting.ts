export default class MeetingAPI {
  public async createMeeting(
    _name: string,
    _threadId: Moim.Id,
    _limited: Moim.Id[],
  ): Promise<Moim.ISingleItemResponse<Moim.Meeting.IMeetingData>> {
    return Promise.resolve({
      data: {
        creator: "URHCIIN1E",
        group: "G0F1M8DVMK",
        host: "URHCIIN1E",
        id: "NRR503X4I",
        name: "test-meeting-name",
        config: {
          enableChat: true,
          enableMic: true,
          enableVideo: true,
          pinnedUsers: [],
        },
      },
    });
  }

  public async joinMeeting(_meetingId: Moim.Id) {
    return Promise.resolve({
      data: {
        groupId: "G0F1M8DVMK",
        meetingId: "NRR503X4I",
        userId: "URHCIIN1E",
        accountType: "HOST",
        meeting: {
          id: "NRR503X4I",
          group: "G0F1M8DVMK",
          creator: "URHCIIN1E",
          host: "URHCIIN1E",
          chimeData: {
            MeetingId: "76ebc14a-859a-424d-a5a7-29750bfb4ae9",
            MediaRegion: "ap-northeast-2",
            MediaPlacement: {
              AudioHostUrl:
                "d0425ec3b6f18603989a1a6e16484683.k.m3.an2.app.chime.aws:3478",
              AudioFallbackUrl:
                "wss://haxrp.m3.an2.app.chime.aws:443/calls/76ebc14a-859a-424d-a5a7-29750bfb4ae9",
              ScreenDataUrl:
                "wss://bitpw.m3.an2.app.chime.aws:443/v2/screen/76ebc14a-859a-424d-a5a7-29750bfb4ae9",
              ScreenSharingUrl:
                "wss://bitpw.m3.an2.app.chime.aws:443/v2/screen/76ebc14a-859a-424d-a5a7-29750bfb4ae9",
              ScreenViewingUrl:
                "wss://bitpw.m3.an2.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=76ebc14a-859a-424d-a5a7-29750bfb4ae9",
              SignalingUrl:
                "wss://signal.m3.an2.app.chime.aws/control/76ebc14a-859a-424d-a5a7-29750bfb4ae9",
              TurnControlUrl:
                "https://ccp.cp.ue1.app.chime.aws/v2/turn_sessions",
            },
          },
        },
        chimeData: {
          ExternalUserId: "U:URHCIIN1E#프동현rlfesiej91psoeksp010edfij39",
          AttendeeId: "7d00e72b-64bb-ae61-4930-4956627815a6",
          JoinToken:
            "N2QwMGU3MmItNjRiYi1hZTYxLTQ5MzAtNDk1NjYyNzgxNWE2Ojg1NDljODcwLWFmNWYtNDFiYi05ZmQwLWZlNmQ0NzI3MWM3Ng",
        },
        config: { enableMic: true, enableVideo: true, enableChat: true },
      },
    });
  }

  public async endMeeting(_meetingId: Moim.Id) {
    return {
      success: true,
    };
  }

  public async getMeetingData(_meetingId: Moim.Id) {
    return Promise.resolve();
  }

  public async changeMeetingHost(_meetingId: Moim.Id, _attendeeId: Moim.Id) {
    return {
      success: true,
    };
  }

  public async linkToMeeting(
    _meetingId: Moim.Id,
    _parentId: Moim.Id,
    _targetId: Moim.Id,
  ): Promise<Moim.ISuccessResponse> {
    return {
      success: true,
    };
  }

  public async leaveMeeting(
    _meetingId: Moim.Id,
  ): Promise<Moim.ISuccessResponse> {
    return {
      success: true,
    };
  }
}
