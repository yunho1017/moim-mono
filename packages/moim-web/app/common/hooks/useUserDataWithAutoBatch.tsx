import * as React from "react";
import { buffedBatchUsersWithDirect as buffedBatchUsersWithDirectAction } from "app/actions/user";
import { useStoreState, useActions } from "app/store";
import { userSelector } from "app/selectors/user";

export default function useUserDataWithAutoBatch(
  userId?: Moim.Id,
  canId?: Moim.Id,
  canUsername?: string,
) {
  const [batchCalled, setBatchCalled] = React.useState<boolean>(false);
  const [reqUserId, setReqUserId] = React.useState<Moim.Id>(
    userId ?? canId ?? canUsername ?? "",
  );
  const { user } = useStoreState(state => ({
    user: userSelector(state, reqUserId),
  }));

  const { buffedBatchUsersWithDirect } = useActions({
    buffedBatchUsersWithDirect: buffedBatchUsersWithDirectAction,
  });

  const batch = React.useCallback(() => {
    buffedBatchUsersWithDirect(userId, canId, canUsername).then(result => {
      if (result) {
        if (canId) {
          setReqUserId(result[canId]);
          return;
        }
        if (userId) {
          setReqUserId(result[userId]);
          return;
        }
        if (canUsername) {
          setReqUserId(result[canUsername]);
          return;
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buffedBatchUsersWithDirect]);

  React.useEffect(() => {
    if (!batchCalled && user?.group_id === "empty") {
      setBatchCalled(true);
      batch();
    }
  }, [batchCalled, batch, user]);

  return user;
}
