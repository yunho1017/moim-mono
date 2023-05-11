import * as React from "react";
import styled from "styled-components";

import { px2rem } from "common/helpers/rem";
import {
  B4Regular,
  H4Bold,
  B1Regular,
} from "common/components/designSystem/typos";
import { FlatButton } from "common/components/designSystem/buttons";

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Description = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const Header = styled.div`
  padding: ${px2rem(15)} 0;
  margin-bottom: ${px2rem(8)};
`;

export const Title = styled(H4Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const SubTitle = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-top: ${px2rem(2)};
`;

export const ButtonWrapper = styled.div.attrs({ tabIndex: -1 })``;

export const Button = styled(FlatButton).attrs({ tabIndex: -1 })`
  width: 100%;
  margin: ${px2rem(14)} 0;
`;

export const ButtonDescription = styled(B4Regular)`
  margin-bottom: ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export function SmallModalLayoutButton({
  disabled,
  waiting,
  description,
  onClick,
  children,
}: React.PropsWithChildren<{
  onClick?: () => void;
  description?: React.ReactNode;
  disabled?: boolean;
  waiting?: boolean;
}>) {
  return (
    <ButtonWrapper>
      {description && <ButtonDescription>{description}</ButtonDescription>}
      <Button disabled={disabled} waiting={waiting} size="l" onClick={onClick}>
        {children}
      </Button>
    </ButtonWrapper>
  );
}
