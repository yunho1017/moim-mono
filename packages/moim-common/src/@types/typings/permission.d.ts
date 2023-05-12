/**
 * Explain about 'LIMITED_OR_CREATOR': https://vteam.slack.com/archives/C014HJKHMB2/p1591756321002500
 */

declare namespace Moim {
  namespace Permission {
    type ForumPermission =
      | "READ_POST"
      | "READ_POST_LIST"
      | "READ_COMMENT"
      | "WRITE_POST"
      | "WRITE_COMMENT"
      | "POST_VOTE"
      | "COMMENT_VOTE"
      | "MANAGE_POST"
      | "DELETE_POST"
      | "DELETE_COMMENT"
      | "COPY_POST"
      | "MANAGE_COMMENT";
    type ConversationPermission =
      | "MANAGE_MESSAGE"
      | "READ_MESSAGE"
      | "SEND_MESSAGE"
      | "DELETE_MESSAGE";
    type ViewPermission = "READ";
    type GeneralPermission =
      | "ACCESS"
      | "SUPER"
      | "CREATE_MEETING"
      | "CREATE_SUBGROUP"
      | "LIMITED_OR_CREATOR";

    type PermissionType =
      | GeneralPermission
      | ForumPermission
      | ConversationPermission
      | ViewPermission;
    type PermissionRecord = Record<
      Moim.Id,
      Partial<Record<PermissionType, Moim.Permission.IPermission>>
    >;
    interface IPermissionData {
      permission: PermissionRecord;
      permissionLoading: Record<Moim.Id, boolean>;
    }

    type APPLIED_TYPE = "ANYONE" | "MEMBERS" | "LIMITED";

    interface IPermission {
      resource: Moim.Id;
      applied_type: APPLIED_TYPE;
      right: PermissionType;
      appointed_at: string;
      limited?: Moim.Id[];
    }

    // GET: /api/groups/{id}/permission
    interface IMoimPermissionRequestQuery {
      resource?: string;
    }

    type IMoimPermissionRequest = IMoimPermissionRequestQuery;

    type IMoimPermissionResponseBody = ISingleItemResponse<IPermission[]>;
  }
}
