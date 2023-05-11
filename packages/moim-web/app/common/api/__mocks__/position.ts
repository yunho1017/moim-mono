import { MoimBaseAPI } from "common/api/base";
import { CancelToken } from "axios";
import { makeErrorFromCancelToken } from "common/helpers/mockingCancelToken";
import { RAW } from "app/__mocks__";

class PositionAPI extends MoimBaseAPI {
  public async getPositions(
    _request: Moim.Position.IGetPositionsRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IGetPositionsResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [RAW.NORMALIZED_POSITION],
      paging: {},
    };
  }

  public async getPosition(
    _request: Moim.Position.IGetPositionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IGetPositionResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.NORMALIZED_POSITION,
    };
  }

  public async getPositionsBatch(
    _request: Moim.Position.IGetPositionsBatchRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IGetPositionsBatchResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [RAW.NORMALIZED_POSITION, RAW.NORMALIZED_POSITION],
      paging: {},
    };
  }

  public async createPosition(
    _request: Moim.Position.ICreatePositionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.ICreatePositionResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.NORMALIZED_POSITION,
    };
  }

  public async appointPosition(
    _request: Moim.Position.IAppointPositionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IAppointPositionResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.NORMALIZED_POSITION,
    };
  }

  public async approvePosition(
    _request: Moim.Position.IApprovePositionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IApprovePositionResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.NORMALIZED_POSITION,
    };
  }

  public async dismissPosition(
    _request: Moim.Position.IDismissPositionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IDismissPositionResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.NORMALIZED_POSITION,
    };
  }

  public async updatePositionInfo(
    _request: Moim.Position.IUpdatePositionInfoRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IUpdatePositionInfoResponse> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.NORMALIZED_POSITION,
    };
  }

  public async updatePositionPriority(
    _request: Moim.Position.IUpdatePositionPriorityRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IUpdatePositionPriorityResponse> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: RAW.NORMALIZED_POSITION,
    };
  }

  public async deletePosition(
    _request: Moim.Position.IDeletePositionRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IDeletePositionResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: {
        success: true,
      },
    };
  }

  public async getPositionMembers(
    _request: Moim.Position.IGetPositionMembersRequest,
    cancelToken?: CancelToken,
  ): Promise<Moim.Position.IGetPositionMembersResponseBody> {
    if (cancelToken?.reason) {
      throw makeErrorFromCancelToken(cancelToken);
    }

    return {
      data: [RAW.NORMALIZED_MEMBER, RAW.NORMALIZED_MEMBER],
      paging: {},
    };
  }
}

export default PositionAPI;
