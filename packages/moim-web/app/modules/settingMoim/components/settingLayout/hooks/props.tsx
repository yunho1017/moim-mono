import { IProps } from "../";
import useMedia from "common/hooks/useMedia";
import { MEDIA_QUERY } from "common/constants/responsive";

export type IHookProps = ReturnType<typeof useProps>;

export function useProps(props: IProps) {
  const { left } = props;
  const isExceptMobile = useMedia([MEDIA_QUERY.EXCEPT_MOBILE], [true], false);

  const isRenderLeft = isExceptMobile && Boolean(left);

  return {
    isRenderLeft,
    ...props,
  };
}
