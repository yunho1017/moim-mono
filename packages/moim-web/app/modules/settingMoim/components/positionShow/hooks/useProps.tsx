import * as React from "react";
import { useIntl } from "react-intl";
import { IProps } from "../";
import useGroupTexts from "common/hooks/useGroupTexts";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const intl = useIntl();
  const [isOpenMenu, setOpenMenu] = React.useState<boolean>(false);
  const menuButtonRef = React.useRef<HTMLDivElement>(null);
  const memberTexts = useGroupTexts("member");

  return {
    ...props,
    intl,
    menuButtonRef,
    isOpenMenu,
    setOpenMenu,
    memberTexts,
  };
}
