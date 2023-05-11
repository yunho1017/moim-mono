import * as React from "react";
import { useLocation } from "react-router";
import useIsMobile from "common/hooks/useIsMobile";

import {
  Wrapper,
  NavigationMenu,
  Contents,
  SubMenuContainer,
  SubMenuContent,
  SubMenu,
} from "./styled";
import { SubMenuItem } from "common/components/listMenu";

interface IProps {
  menu: string[];
}

export default function Template({
  menu,
  children,
}: React.PropsWithChildren<IProps>) {
  const refScrollElement = React.useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isMobile = useIsMobile();
  const subMenuElement = React.useMemo(
    () =>
      menu.map((item, index) => (
        <SubMenuContainer key={item} href={`${location.pathname}#${item}`}>
          <MenuItem
            title={item}
            selected={
              location.hash
                ? decodeURIComponent(location.hash) === `#${item}`
                : index === 0
            }
          />
        </SubMenuContainer>
      )),
    [location, menu],
  );

  React.useEffect(() => {
    refScrollElement.current?.scrollTo(0, 0);
  }, [refScrollElement.current, location]);

  return (
    <Wrapper>
      {!isMobile && (
        <NavigationMenu>
          <SubMenu>{subMenuElement}</SubMenu>
        </NavigationMenu>
      )}
      <Contents ref={refScrollElement}>{children}</Contents>
    </Wrapper>
  );
}

function MenuItem({ title, selected }: { title: string; selected: boolean }) {
  return (
    <SubMenuItem active={selected}>
      <SubMenuContent>{title}</SubMenuContent>
    </SubMenuItem>
  );
}
