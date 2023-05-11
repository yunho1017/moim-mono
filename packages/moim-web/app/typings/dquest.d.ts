declare namespace Moim {
  declare namespace DQuest {
    type QUEST_STATUS = "SCHEDULED" | "ACTIVE" | "CLOSED";
    type QUEST_DISPLAY_STATUS = "READY" | "ACTIVE" | "CLOSED";
    type ACTION_TYPE = "NONE" | "LANDING" | "EVENT";
    type HISTORY_STATUS =
      | "IN_PROGRESS_NOT_JOINED"
      | "IN_PROGRESS"
      | "ACHIEVED_NOT_REWARDED"
      | "ACHIEVED";
    type OUTCOME_SCHEDULE_TYPE = "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY";
    type OUTCOME_PROPERTY_TYPE =
      | "text"
      | "integer"
      | "boolean"
      | "date"
      | "double"
      | string;
    type HUMANIZED_MISSION_TYPE = "SIMPLE" | "SAMPLING" | "CONSECUTIVE";

    type EVENT_FREQUENCY_CONSECUTIVE_TYPE = "HOURLY" | "DAILY";
    type EVENT_FREQUENCY_SAMPLING_TYPE =
      | "EACH"
      | "HOURLY"
      | "DAILY"
      | "WEEKLY"
      | "MONTHLY";
    type MISSION_OPERATE_TYPE = "AND" | "OR" | "EVENT";
    type VERIFICATION_OPERATE_TYPE = "AND" | "OR" | "FILTER";

    interface IEventFrequency {
      type: EVENT_FREQUENCY_CONSECUTIVE_TYPE;
      times: number;
    }

    interface IMissionEventFrequency {
      value: number;
      sampling: EVENT_FREQUENCY_SAMPLING_TYPE;
      consecutive?: IEventFrequency;
      periodStart?: number;
      periodEnd?: number;
    }

    interface IVerificationAndOp {
      type: VERIFICATION_OPERATE_TYPE;
      children: any[];
    }
    interface IVerificationOrOp {
      type: VERIFICATION_OPERATE_TYPE;
      children: any[];
    }
    interface IVerificationFilterOp {
      type: VERIFICATION_OPERATE_TYPE;
    }

    type IEventVerificationOp =
      | IVerificationAndOp
      | IVerificationOrOp
      | IVerificationFilterOp;

    interface IMissionActionPayload {
      name: string;
      value: string;
    }

    interface IMissionActionForm {
      name: string;
      type?: string;
      description?: string;
    }

    interface IMissionAction {
      title: string;
      iconUrl?: string;
      disabled?: boolean;
      payload?: IMissionActionPayload[];
      form?: IMissionActionForm;
    }

    interface IMissionAndOp {
      type: "AND";
      children: IMission[];
    }
    interface IMissionOrOp {
      type: "OR";
      children: IMission[];
    }

    interface IMissionEventOp {
      id: Id;
      type: "EVENT";
      schemeId: Id;
      imageUrl?: string;
      title?: string;
      description?: string;
      verification?: EventVerificationOp[];
      frequency?: IMissionEventFrequency[];
      action?: IMissionAction;
    }

    type IMission = IMissionAndOp | IMissionOrOp | IMissionEventOp;

    interface IHumanizedMission {
      missionId: string;
      type: HUMANIZED_MISSION_TYPE;
      requiredCount: number;
      sampling?: EVENT_FREQUENCY_SAMPLING_TYPE;
      samplingMaximum?: number;
      consecutiveTimes?: number;
    }

    interface IOutcomePropertyTemplate {
      name: string;
      type: OUTCOME_PROPERTY_TYPE;
      value: string;
    }

    interface IOutcomeSchedule {
      type: OUTCOME_SCHEDULE_TYPE;
      date?: number;
      day?: number;
      hour?: number;
      minute?: number;
    }

    interface IOutcome {
      schemeId: Id;
      title: string;
      description?: string;
      imageUrl?: string;
      propertyTemplates: IOutcomePropertyTemplate[];
      schedule: IOutcomeSchedule[];
      contentVisible?: boolean;
    }

    interface IOutcomeContent {
      iconUrl?: string;
      text: string;
    }

    interface IAction {
      type: ACTION_TYPE;
      url?: string;
      title?: string;
      missionId?: Id;
    }

    interface IPreview {
      coverImageUrls?: string[];
      coverImageUrls_web?: string[];
      backgroundImageUrls?: string[];
      backgroundImageUrls_web?: string[];
      showCoverImage?: boolean;
      showDetailButton?: boolean;
      showActionButton?: boolean;
      showOutcome?: boolean;
      showProgress?: boolean;

      detailButtonTextColor?: Blockit.ColorValue;
      detailButtonBackgroundColor?: Blockit.ColorValue;
    }

    interface IShow {
      imageUrls: string[];
      imageUrls_web?: string[];
      description?: boolean;
    }

    interface INotification {
      type?: "snackbar" | "toast";
      title: string;
      message: string;
      linkText?: string;
      link?: string;
    }

    interface IMissionProgress {
      missionId: Moim.Id;
      missionTitle: string;
      progress: number;
      progressTotal: number;
    }

    interface IHistory {
      userId: Id;
      questId: Id;
      reJoinable: boolean;
      missionProgress?: IMissionProgress[];
      status: HISTORY_STATUS;
      progressVisible: boolean;
      progressTotal: number;
      progress: number;
      reJoinable: boolean;
      actionable: boolean;
    }

    interface IQuest {
      id: Id;
      title: string;
      description?: string;
      status: QUEST_STATUS;
      displayStatus: QUEST_DISPLAY_STATUS;
      humanizedMissions: IHumanizedMission[];
      viewerCount: number;
      attendedCount?: number;

      mission: IMission;

      outcomes: IOutcome[];
      outcomeContents: IOutcomeContent[];

      joinTitle?: string;
      achieveTitle?: string;
      rewardedTitle?: string;
      joinType?: "EXPLICIT" | "IMPLICIT";
      achieveType?: "EXPLICIT" | "IMPLICIT";

      startAt?: number;
      endAt?: number;
      countToFinish: number;
      lastCompletedAt?: number;
      lastCompletedBy?: User.IUser;
      completedCount: number;

      backgroundColor?: string;
      action: IAction;
      preview: IPreview;
      show: IShow;

      hide: boolean;
      completeTextTemplate?: string;

      progressVisible: boolean;
      progressTotal: number;
      createdBy: User.IUser;
      createdAt: number;
      updatedAt: number;
      history?: IHistory;
      progressNotification: INotification;
      completeNotification: INotification;
    }

    interface INormalizedQuest
      extends Omit<IQuest, "lastCompletedBy" | "createdBy" | "history"> {
      lastCompletedBy?: Id;
      createdBy?: Id;
      history?: Id;
    }

    interface IQuestActionResponse {
      notification?: INotification;
      location?: string;
    }

    interface IDQuestCompleteDialogMessage {
      id: Moim.Id;
      title?: string;
      message?: string;
      buttonText?: string;
      buttonLink?: string;
    }

    interface IFetchHistoriesRequestPayload {
      userId: Moim.Id;
      questId?: Moim.Id[];
      status?: Moim.DQuest.HISTORY_STATUS;
      after?: Moim.PagingValue;
      sort?: string;
      order?: "ASC" | "DESC";
      page?: number;
      limit?: number;

      // NOTE: this below fields are not usable to client side search
      progressTotal?: number;
      progress?: number;
      actionableAt?: number;
      createdAt?: number;
      updatedAt?: number;
      updatedAtUserId?: string;
      completedAt?: number;
    }

    type DIRECTION = "vertical" | "horizontal";

    interface IFilter {
      displayStatuses?: QUEST_DISPLAY_STATUS[];
      createdAtLte?: number;
      createdAtGte?: number;
      startAtLte?: number;
      startAtGte?: number;
      endAtLte?: number;
      endAtGte?: number;
      questIds?: string[];
    }

    interface ISortQuery {
      key: string; // target 필드명
      order: "asc" | "desc";
    }

    interface IQuestGroup {
      id: string;
      communityId: string;
      title: string;
      description?: string;

      createdAt: number;
      updatedAt: number;

      query: {
        filters: IFilter[];
        sort: ISortQuery;
      };

      listElement: {
        scrollable: boolean;
        scrollable_web: boolean;
        itemStackDirection: DIRECTION;
        itemStackDirection_web: DIRECTION;
        scrollDirection: DIRECTION;
        scrollDirection_web: DIRECTION;
        rowCount: number;
        columnCount: number;
        rowCount_web: number;
        columnCount_web: number;
        maxDisplayedItemsCount: number;
        maxDisplayedItemsCount_web: number;
        itemGutterSize: number;
        itemGutterSize_web: number;
      };
      listConfig: {
        showSectionTitle: boolean;
        showSectionDescription: boolean;
        showOutcome: boolean;
        showSchedule: boolean;
        showProgress: boolean;
      };
    }

    interface IQuestJoinResponse {
      statusCode: number;
      details: [
        {
          code: "INVALID_HOLDER" | "INVALID_LIMITATION";
          message: string;
          holder: Record<string, any>; // NOTE: no need to be known.
          limitation?: Record<string, any>; // NOTE: no need to be known.
        },
      ];
    }
  }
}
