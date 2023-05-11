// vendor
import * as React from "react";
import styled, { FlattenInterpolation } from "styled-components";
// component
import { CommonBadge } from "..";
import { useStoreState } from "app/store";
import { directMessagesSelector } from "app/selectors/directMessage";
import { unreadCountSelector } from "app/selectors/channel";

interface IProps {
  overrideStyle?: FlattenInterpolation<any>;
}

const NotiBadge = styled(CommonBadge)<IProps>`
  ${props => props.overrideStyle}
`;

function DMAlertBadge({ overrideStyle }: IProps) {
  const { count } = useStoreState(state => {
    const dmList = directMessagesSelector(state);

    return {
      count: dmList.data
        .filter(i => Boolean(i))
        .reduce(
          (sum, curr) => sum + unreadCountSelector(state, curr.id) ?? 0,
          0,
        ),
    };
  });

  const notiBadgeElement = React.useMemo(() => {
    if (!count) {
      return null;
    }

    if (count > 99) {
      return <NotiBadge overrideStyle={overrideStyle}>99+</NotiBadge>;
    }

    return <NotiBadge overrideStyle={overrideStyle}>{count}</NotiBadge>;
  }, [count, overrideStyle]);

  return <>{notiBadgeElement}</>;
}

export default DMAlertBadge;
