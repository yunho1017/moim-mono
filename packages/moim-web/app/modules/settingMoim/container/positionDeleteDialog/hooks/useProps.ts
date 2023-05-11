import * as React from "react";
import { useIntl } from "react-intl";
import { IProps } from "../";
import useIsMobile from "common/hooks/useIsMobile";
import { useActions, useStoreState } from "app/store";
import { deletePosition as deletePositionAction } from "app/actions/position";
import useRedirect from "common/hooks/useRedirect";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const isMobile = useIsMobile();
  const redirect = useRedirect();
  const intl = useIntl();
  const [isChecked, setChecked] = React.useState<boolean>(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const wrapperHeight = React.useMemo(
    () => (wrapperRef.current ? wrapperRef.current.clientHeight : undefined),
    [wrapperRef.current],
  );
  const states = useStoreState(state => ({
    deletePositionError: state.position.deletePositionError[props.positionId],
  }));

  const actions = useActions({
    deletePosition: deletePositionAction,
  });

  return {
    ...props,
    ...states,
    ...actions,
    intl,
    isMobile,
    isChecked,
    setChecked,
    wrapperRef,
    wrapperHeight,
    redirect,
  };
}
