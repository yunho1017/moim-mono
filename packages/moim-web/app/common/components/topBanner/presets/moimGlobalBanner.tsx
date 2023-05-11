import * as React from "react";
import styled from "styled-components";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { TopBannerContext } from "common/components/topBanner/context";
import { Link } from "react-router-dom";

const Message = styled.div`
  width: 100%;
  text-align: center;
`;

interface IProps {}

const MoimGlobalBanner: React.FC<IProps> = ({}) => {
  const [_, setContext] = React.useContext(TopBannerContext);
  const currentGroup = useCurrentGroup();

  React.useLayoutEffect(() => {
    if (currentGroup?.global_banner) {
      const { message, href } = currentGroup.global_banner;
      let messageElem: React.ReactNode = message;
      if (href) {
        try {
          const targetURL = new URL(href);
          if (targetURL.hostname === location.hostname) {
            messageElem = (
              <Link
                to={{ pathname: targetURL.pathname, search: location.search }}
              >
                {message}
              </Link>
            );
          } else {
            messageElem = <a href={href}>{message}</a>;
          }
        } catch {}
      }

      setTimeout(() => {
        setContext(state => ({
          ...state,
          isOpen: true,
          type: "normal",
          disableCloseButton: true,
          message: <Message>{messageElem}</Message>,
        }));
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default MoimGlobalBanner;
