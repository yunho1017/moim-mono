import * as React from "react";
import { useIntl } from "react-intl";
import { IProps } from "../";
import useCancelToken from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";
import {
  appointPosition as appointPositionAction,
  dismissPosition as dismissPositionAction,
  getPositionMembers,
} from "app/actions/position";
import { getUsers } from "app/actions/user";
import { POSITION_DIALOG_PURPOSE } from "../types";

import {
  getPositionMemberSelector,
  getPositionMembersLoadingSelector,
} from "app/selectors/position";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { positionId, purpose } = props;
  const cancelToken = useCancelToken();
  const intl = useIntl();
  const states = useStoreState(storeState => ({
    positionMembers: getPositionMemberSelector(storeState, positionId),
    isLoadingMembers: getPositionMembersLoadingSelector(storeState, positionId),
  }));
  const actions = useActions({
    dispatchGetMoimMembers: getUsers,
    dispatchGetPositionMembers: getPositionMembers,
    appointPosition: appointPositionAction,
    dismissPosition: dismissPositionAction,
  });

  const title = React.useMemo(() => {
    if (purpose === POSITION_DIALOG_PURPOSE.APPOINT) {
      return intl.formatMessage({
        id: "position_settings/appointment_position/page_title",
      });
    } else if (purpose === POSITION_DIALOG_PURPOSE.DISMISS) {
      return intl.formatMessage({
        id: "position_settings/dismissal_position/page_title",
      });
    } else {
      return "";
    }
  }, [purpose, intl]);

  const placeholder = React.useMemo(() => {
    if (purpose === POSITION_DIALOG_PURPOSE.APPOINT) {
      return intl.formatMessage({
        id: "position_settings/appointment_position/search_member",
      });
    } else if (purpose === POSITION_DIALOG_PURPOSE.DISMISS) {
      return intl.formatMessage({
        id: "position_settings/dismissal_position/search_member",
      });
    } else {
      return "";
    }
  }, [purpose, intl]);

  const nextButtonText = React.useMemo(() => {
    if (purpose === POSITION_DIALOG_PURPOSE.APPOINT) {
      return intl.formatMessage({
        id: "position_settings/appointment_position/appoint_button",
      });
    } else if (purpose === POSITION_DIALOG_PURPOSE.DISMISS) {
      return intl.formatMessage({
        id: "position_settings/dismissal_position/dismiss_button",
      });
    } else {
      return "";
    }
  }, [purpose, intl]);

  const emptyText = React.useMemo(() => {
    if (purpose === POSITION_DIALOG_PURPOSE.APPOINT) {
      return intl.formatMessage({
        id: "position_settings/appointment_position/member_empty",
      });
    } else if (purpose === POSITION_DIALOG_PURPOSE.DISMISS) {
      return intl.formatMessage({
        id: "position_settings/dismissal_position/member_empty",
      });
    } else {
      return "";
    }
  }, [purpose, intl]);

  return {
    ...props,
    ...states,
    ...actions,
    cancelToken,
    intl,
    title,
    placeholder,
    nextButtonText,
    emptyText,
  };
}
