import styled from "styled-components";
import SmallDeleteIcon from "@icon/24-delete-g.svg";
// helper
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { noScrollBarStyle } from "../designSystem/styles";
import { rgba } from "polished";

export const TOOLBAR_HEIGHT = 40;
export const MAX_HEIGHT = 230;

export const InputActionContainer = styled.div`
  flex: 1;
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: flex-end;
`;

export const InputWrapper = styled.div<{ minInputLine?: number }>`
  flex: 1;
  min-width: 0;
  max-height: ${px2rem(MAX_HEIGHT)};
  min-height: ${props => px2rem(35 * (props.minInputLine ?? 1))};
  margin: 0 ${px2rem(16)};

  font-size: ${px2rem(15)};
  line-height: ${px2rem(22)};

  color: ${props => props.theme.colorV2.colorSet.grey800};
  overflow: auto;

  .ql-editor {
    min-height: ${props =>
      props.minInputLine ? px2rem(37 * props.minInputLine) : "initial"};
  }
`;

export const AttachmentCellWrapper = styled.div<{ type: "file" | "image" }>`
  @media ${MEDIA_QUERY.EXCEPT_DESKTOP} {
    width: fit-content;
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    min-width: ${props => (props.type === "file" ? "100%" : "inherit")};
  }
`;

export const InnerAttachmentPreview = styled.div`
  padding-top: ${px2rem(8)};
  width: 100%;
  display: flex;
  gap: ${px2rem(10)};

  overflow-x: auto;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    max-height: ${px2rem(180)};
    ${noScrollBarStyle};
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    max-height: ${px2rem(98)};
  }
`;

export const AttachmentPreview = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;

  margin: 0 0 ${px2rem(6)};
  padding: 0 ${px2rem(16)} 0;

  overflow: hidden;
`;

export const MeetingCellContainer = styled.div`
  position: relative;
`;

export const ButtonWrapper = styled.div`
  position: absolute;
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  top: -${px2rem(6)};
  right: -${px2rem(6)};
  background-color: ${props => rgba(props.theme.colorV2.colorSet.grey800, 0.9)};
  border-radius: 100%;
`;

export const DeleteButton = styled(SmallDeleteIcon).attrs({
  role: "button",
  size: "xs",
})``;
