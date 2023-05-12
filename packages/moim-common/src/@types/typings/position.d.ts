declare namespace Moim {
  declare namespace Position {
    interface INormalizePosition {
      id: string;
      name: string;
      description?: string;
      creator: Id;
      color: string;
      authority: string;
      priority: number;
      limit: number;
      member_count: number;
      created_at: number;
      priority: number;
      config?: IPositionConfig;
      applicants: Id[];
    }

    interface IPositionConfig {
      isApplyable: boolean;
      isApprovable: boolean;
    }

    type IPosition = INormalizePosition;

    type INormalizedPositionEntities = Moim.INormalizedEntities<
      INormalizePosition
    >;

    interface IPositionFormData {
      name: string;
      color: string;
      description?: string;
    }

    // GET: /api/positions
    interface IGetPositionsRequestBody {
      limit?: number; // default: 30
      after?: string;
    }

    type IGetPositionsRequest = IGetPositionsRequestBody;
    type IGetPositionsResponseBody = Moim.IPaginatedListResponse<
      INormalizePosition
    >;

    // GET: /api/positions/{positionId}
    interface IGetPositionRequestPath {
      positionId: Moim.Id;
    }

    type IGetPositionRequest = IGetPositionRequestPath;
    type IGetPositionResponseBody = Moim.ISingleItemResponse<
      INormalizePosition
    >;

    // POST: /api/positions/batch
    interface IGetPositionsBatchRequestBody {
      positions: Moim.Id[];
    }

    type IGetPositionsBatchRequest = IGetPositionsBatchRequestBody;
    type IGetPositionsBatchResponseBody = Moim.IPaginatedListResponse<
      INormalizePosition
    >;

    // POST: /api/positions
    interface ICreatePositionRequestBody {
      position: {
        name: string;
        color: string;
        priority: number;
        description?: string;
      };
    }

    type ICreatePositionRequest = ICreatePositionRequestBody;
    type ICreatePositionResponseBody = Moim.ISingleItemResponse<
      INormalizePosition
    >;

    // POST: /api/positions/{positionId}/appoint
    interface IAppointPositionRequestPath {
      positionId: Moim.Id;
    }

    interface IAppointPositionRequestBody {
      appoint: {
        users: Moim.Id[];
      };
    }

    type IAppointPositionRequest = IAppointPositionRequestPath &
      IAppointPositionRequestBody;
    type IAppointPositionResponseBody = Moim.ISingleItemResponse<
      INormalizePosition
    >;

    // POST: /api/positions/{positionId}/approve
    interface IApprovePositionRequestPath {
      positionId: Moim.Id;
    }

    interface IApprovePositionRequestBody {
      approve: {
        users: Moim.Id[];
      };
    }

    type IApprovePositionRequest = IApprovePositionRequestPath &
      IApprovePositionRequestBody;
    type IApprovePositionResponseBody = Moim.ISingleItemResponse<
      INormalizePosition
    >;

    // POST: /api/positions/{positionId}/dismiss
    interface IDismissPositionRequestPath {
      positionId: Moim.Id;
    }

    interface IDismissPositionRequestBody {
      dismiss: {
        users: Moim.Id[];
      };
    }

    type IDismissPositionRequest = IDismissPositionRequestPath &
      IDismissPositionRequestBody;
    type IDismissPositionResponseBody = Moim.ISingleItemResponse<
      INormalizePosition
    >;

    // PUT: /api/positions/{positionId}/information
    interface IUpdatePositionInfoRequestPath {
      positionId: string;
    }

    interface IUpdatePositionInfoRequestBody {
      position: {
        description: string | null;
        name?: string;
        color?: string;
      };
    }

    type IUpdatePositionInfoRequest = IUpdatePositionInfoRequestPath &
      IUpdatePositionInfoRequestBody;
    type IUpdatePositionInfoResponse = Moim.ISingleItemResponse<
      INormalizePosition
    >;

    // PUT: /api/positions/{positionId}/priority
    interface IUpdatePositionPriorityPath {
      positionId: string;
    }

    interface IUpdatePositionPriorityRequestBody {
      change: {
        priority: number;
      };
    }

    type IUpdatePositionPriorityRequest = IUpdatePositionPriorityPath &
      IUpdatePositionPriorityRequestBody;
    type IUpdatePositionPriorityResponse = Moim.ISingleItemResponse<
      INormalizePosition
    >;

    // DELETE: /api/positions/{positionId}
    interface IDeletePositionRequestPath {
      positionId: Moim.Id;
    }

    type IDeletePositionRequest = IDeletePositionRequestPath;
    type IDeletePositionResponseBody = Moim.ISingleItemResponse<
      Moim.ISuccessResponse
    >;

    // GET: /api/positions/{positionId}/members
    interface IGetPositionMembersRequestPath {
      positionId: Moim.Id;
    }

    interface IGetPositionMembersRequestBody extends IPaging {
      limit?: number; // default: 30
    }

    type IGetPositionMembersRequest = IGetPositionMembersRequestPath &
      IGetPositionMembersRequestBody;
    type IGetPositionMembersResponseBody = Moim.IPaginatedListResponse<
      Moim.User.IOriginalUserDatum
    >;
  }
}
