import * as React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { FormattedMessage } from "react-intl";
import { px2rem } from "common/helpers/rem";
import { H4BoldStyle, H8BoldStyle } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

const Wrapper = styled.div<{ visible: boolean; offset?: number }>`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${props =>
    rgba(props.theme.colorV2.colorSet.white1000, 0.95)};

  visibility: ${props => (props.visible ? "visible" : "hidden")};
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 100ms ease-in-out 0ms;
  z-index: ${props => props.theme.zIndexes.fullscreen};

  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    top: ${props => px2rem(props.offset ?? 45)};
  }

  @media ${MEDIA_QUERY.EXCEPT_DESKTOP} {
    top: ${px2rem(44)};
  }
`;

const Title = styled.div`
  ${H4BoldStyle};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: normal;
  margin-bottom: ${px2rem(16)};
`;

const Message = styled.div`
  ${H8BoldStyle};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: normal;
`;

interface IProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  visible: boolean;

  offset?: number;
}

const DragHere: React.FC<IProps> = ({
  visible,
  ref: _ref,
  offset,
  ...rest
}) => (
  <Wrapper visible={visible} offset={offset} {...rest}>
    <Title>
      <FormattedMessage id="post_editor/file_drag_and_drop_title" />
    </Title>
    <Message>
      <FormattedMessage id="post_editor/file_drag_and_drop_sub" />
    </Message>
  </Wrapper>
);

export default DragHere;
