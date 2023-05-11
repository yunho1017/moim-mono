import * as React from "react";
import { useDebounce } from "react-use";
import { IHookProps } from "./useProps";

export type IHookHandlers = ReturnType<typeof useHandlers>;

export function useHandlers(hookProps: IHookProps) {
  const { cancelToken, dispatchCreateSubGroup, dispatchGetTags } = hookProps;

  const handleSubmit = React.useCallback(
    async (data: Moim.Group.ICreateSubGroupRequestBody) => {
      try {
        await dispatchCreateSubGroup(data, cancelToken.current.token);
        alert("액션 생성에 성공하였습니다");
      } catch (err) {
        throw err;
      }
    },
    [cancelToken, dispatchCreateSubGroup],
  );
  const [, cancelGetTags] = useDebounce(dispatchGetTags, 300);

  return {
    handleSubmit,
    cancelGetTags,
  };
}
