// vendor
import * as React from "react";
import styled, { FlattenInterpolation } from "styled-components";
// component
import { CommonBadge } from "..";
import { moimStatSelector } from "app/selectors/stat";
import { useStoreState } from "app/store";
import { currentGroupSelector } from "app/selectors/app";

interface IProps {
  overrideStyle?: FlattenInterpolation<any>;
}

const NotiBadge = styled(CommonBadge)<IProps>`
  ${props => props.overrideStyle}
`;

function NotiAlertBadge({ overrideStyle }: IProps) {
  const { count } = useStoreState(state => {
    const currentGroup = currentGroupSelector(state);
    const statId = currentGroup?.is_hub
      ? currentGroup.id
      : currentGroup?.parent;
    return {
      count: moimStatSelector(state, statId ?? "")?.root_list_count ?? 0,
    };
  });

  const notiBadgeElement = React.useMemo(() => {
    if (count === 0) {
      return null;
    }

    if (count > 99) {
      return <NotiBadge overrideStyle={overrideStyle}>99+</NotiBadge>;
    }

    return <NotiBadge overrideStyle={overrideStyle}>{count}</NotiBadge>;
  }, [count, overrideStyle]);

  return <>{notiBadgeElement}</>;
}

export default NotiAlertBadge;
