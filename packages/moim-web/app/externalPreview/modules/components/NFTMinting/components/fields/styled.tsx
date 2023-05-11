import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { BoxInputRight } from "common/components/designSystem/boxInput/styled";
import { H9Bold } from "common/components/designSystem/typos";
import { TextArea } from "common/components/responsiveTextArea";
import { DefaultLoaderWrapper } from "common/components/loading";

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(16)} 0;
`;

export const SkeletonStyle = css`
  padding-bottom: 100%;
`;

export const DescriptionBoxStyle = css`
  height: ${px2rem(102)};
  position: relative;
  ${TextArea} {
    height: ${px2rem(66)} !important;
  }
  ${BoxInputRight} {
    position: absolute;
    bottom: ${px2rem(14)};
    right: ${px2rem(16)};
  }
`;

export const SelectionStyle = css`
  padding: 0 !important;
`;

export const Section = styled.div`
  padding: 0 ${px2rem(16)};
`;

export const SectionTitle = styled(H9Bold)`
  height: ${px2rem(38)};
  line-height: ${px2rem(38)};
`;

export const SectionContent = styled.div`
  padding: ${px2rem(4)} 0;
`;

export const NFTFileUploader = styled.div`
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  background-color: rgba(1, 5, 5, 0.06);
  border: dashed ${px2rem(2)} #aeb8bd;
  border-radius: ${px2rem(8)};
  span {
    display: block;
    margin: calc(50% - ${px2rem(24)}) auto 0;
  }
`;

export const NFTFileWrapper = styled.div<{ hasMinHeight?: boolean }>`
  width: 100%;
  height: ${props => (props.hasMinHeight ? px2rem(320) : "fit-content")};
  img {
    display: block;
    width: 100%;
  }
  ${DefaultLoaderWrapper} {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
`;
