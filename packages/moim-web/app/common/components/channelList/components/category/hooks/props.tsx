// type
import { IProps } from "../";

export interface IHookProps extends ReturnType<typeof useProps> {
  isCollapsed: boolean;
}

export function useProps(props: IProps) {
  return { ...props, isCollapsed: props.isCollapsed ?? false };
}
