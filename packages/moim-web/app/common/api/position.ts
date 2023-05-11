import { CancelToken } from "axios";
import { MoimBaseAPI } from "common/api/base";

class PositionAPI extends MoimBaseAPI {
  public async getPositions(
    request: Moim.Position.IGetPositionsRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IGetPositionsResponseBody> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.get(`/groups/${groupId}/positions`, request, {
        cancelToken,
      })
    ).data;
  }

  public async getPosition(
    request: Moim.Position.IGetPositionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IGetPositionResponseBody> {
    const { positionId, ...params } = request;

    return (
      await this.get(`/positions/${positionId}`, params, {
        cancelToken,
      })
    ).data;
  }

  public async getPositionsBatch(
    request: Moim.Position.IGetPositionsBatchRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IGetPositionsBatchResponseBody> {
    return (
      await this.post(`/positions/_batch`, request, {
        cancelToken,
      })
    ).data;
  }

  public async createPosition(
    request: Moim.Position.ICreatePositionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.ICreatePositionResponseBody> {
    const groupId = this.getCurrentGroupId();
    return (
      await this.post(`/groups/${groupId}/positions`, request, {
        cancelToken,
      })
    ).data;
  }

  public async appointPosition(
    request: Moim.Position.IAppointPositionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IAppointPositionResponseBody> {
    const { positionId, ...requestBody } = request;

    return (
      await this.post(`/positions/${positionId}/appoint`, requestBody, {
        cancelToken,
      })
    ).data;
  }

  public async approvePosition(
    request: Moim.Position.IApprovePositionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IApprovePositionResponseBody> {
    const { positionId, ...requestBody } = request;

    return (
      await this.post(`/positions/${positionId}/approve`, requestBody, {
        cancelToken,
      })
    ).data;
  }

  public async dismissPosition(
    request: Moim.Position.IDismissPositionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IDismissPositionResponseBody> {
    const { positionId, ...requestBody } = request;

    return (
      await this.post(`/positions/${positionId}/dismiss`, requestBody, {
        cancelToken,
      })
    ).data;
  }

  public async updatePositionInfo(
    request: Moim.Position.IUpdatePositionInfoRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IUpdatePositionInfoResponse> {
    const { positionId, ...requestBody } = request;

    return (
      await this.put(`/positions/${positionId}`, requestBody, {
        cancelToken,
      })
    ).data;
  }

  public async updatePositionPriority(
    request: Moim.Position.IUpdatePositionPriorityRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IUpdatePositionPriorityResponse> {
    const { positionId, ...requestBody } = request;

    return (
      await this.put(`/positions/${positionId}/priority`, requestBody, {
        cancelToken,
      })
    ).data;
  }

  public async deletePosition(
    request: Moim.Position.IDeletePositionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IDeletePositionResponseBody> {
    const { positionId } = request;

    return (
      await this.delete(`/positions/${positionId}`, undefined, {
        cancelToken,
      })
    ).data;
  }

  public async getPositionMembers(
    request: Moim.Position.IGetPositionMembersRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IGetPositionMembersResponseBody> {
    const { positionId, ...params } = request;

    return (
      await this.get(`/positions/${positionId}/members`, params, {
        cancelToken,
      })
    ).data;
  }
}

export default PositionAPI;
