import { AxiosRequestConfig } from "axios";
import { MoimBaseAPI } from "common/api/base";

export default class MeetingAPI extends MoimBaseAPI {
  public async createMeeting(
    name: string,
    target: "ANYONE" | "MEMBERS" | "LIMITED",
    limited: Moim.Id[],
  ): Promise<Moim.ISingleItemResponse<Moim.Meeting.IMeetingData>> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(`/groups/${groupId}/meetings`, {
        meeting: {
          name,
          target,
          limited,
        },
      })
    ).data;
  }

  public async joinMeeting(
    meetingId: Moim.Id,
    config?: AxiosRequestConfig,
  ): Promise<Moim.ISingleItemResponse<Moim.Meeting.IAttendeeMeetingData>> {
    return (await this.post(`/meetings/${meetingId}/join`, undefined, config))
      .data;
  }

  public async endMeeting(meetingId: Moim.Id): Promise<Moim.ISuccessResponse> {
    return (await this.post(`/meetings/${meetingId}/end`)).data;
  }

  public async getMeetingData(
    meetingId: Moim.Id,
  ): Promise<Moim.ISingleItemResponse<Moim.Meeting.IMeetingData>> {
    return (await this.get(`/meetings/${meetingId}`)).data;
  }

  public async changeMeetingData(
    meetingId: Moim.Id,
    payload: {
      name?: string;
      config?: Partial<Moim.Meeting.IMeetingConfig>;
    },
  ) {
    const groupId = this.getCurrentGroupId();
    return (
      await this.put(`/groups/${groupId}/meetings/${meetingId}`, {
        meeting: payload,
      })
    ).data;
  }

  public async changeUserStatus(
    meetingId: Moim.Id,
    userId: Moim.Id,
    config: Moim.Meeting.IAttendeeInterfaceConfig,
  ) {
    return (
      await this.put(`/meetings/${meetingId}/attendees/${userId}`, {
        attendee: {
          config,
        },
      })
    ).data;
  }

  public async changeMeetingHost(
    meetingId: Moim.Id,
    attendeeId: Moim.Id,
  ): Promise<Moim.ISuccessResponse> {
    return (
      await this.post(
        `/meetings/${meetingId}/attendees/${attendeeId}/make_host`,
      )
    ).data;
  }

  public async linkToMeeting(
    meetingId: Moim.Id,
    parentId: Moim.Id,
    targetId: Moim.Id,
  ): Promise<Moim.ISuccessResponse> {
    return (
      await this.post(`/meetings/${meetingId}/link`, {
        target: { parent: parentId, id: targetId },
      })
    ).data;
  }

  public async leaveMeeting(
    meetingId: Moim.Id,
    config?: AxiosRequestConfig,
  ): Promise<Moim.ISuccessResponse> {
    return (await this.post(`/meetings/${meetingId}/leave`, undefined, config))
      .data;
  }
}
