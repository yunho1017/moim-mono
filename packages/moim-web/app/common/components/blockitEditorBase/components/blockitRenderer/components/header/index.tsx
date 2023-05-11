import React from "react";
import styled, { ThemeContext } from "styled-components";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import Texts from "common/components/blockitEditorBase/components/blockitRenderer/components/texts";
import BreadCrumb from "./components/breadCrumb";
import { ViewMore } from "./components/viewMore";

const PADDING_NONE = {
  right: 0,
  left: 0,
  top: 0,
  bottom: 0,
};

export const Header = styled.div`
  width: 100%;
  margin: 0 0 ${px2rem(20)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: 0 0 ${px2rem(16)};
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  min-width: 0;
  flex: 1;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  & > * {
    ${useSingleLineStyle}
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(4)} 0;
  }
`;

export const Description = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(4)} 0;
  }
`;

interface IProps {
  showTitle?: boolean;
  showDescription?: boolean;
  showMoreButton?: boolean;
  title?: string;
  description?: string;
  onClickViewMore?: () => void;
  breadCrumbLink?: string;
  breadCrumbText?: string;
  titleElement?: Omit<Moim.Blockit.ITextBlock, "type">;
  descriptionElement?: Omit<Moim.Blockit.ITextBlock, "type">;
}

const BlockitHeader: React.FC<IProps> = ({
  showTitle = true,
  title,
  showDescription = true,
  description,
  showMoreButton = true,
  onClickViewMore,
  breadCrumbLink,
  breadCrumbText,
  titleElement,
  descriptionElement,
}) => {
  const theme = React.useContext(ThemeContext);
  const hasNoContent = !title && !description;
  const isInactiveConfig = !showTitle && !showDescription;

  if (hasNoContent || isInactiveConfig) {
    return null;
  }

  return (
    <Header>
      {showTitle && breadCrumbText && breadCrumbLink && (
        <BreadCrumb linkTo={breadCrumbLink} text={breadCrumbText} />
      )}
      <Container>
        {title && showTitle && (
          <Title
            role={onClickViewMore ? "button" : undefined}
            onClick={onClickViewMore ? onClickViewMore : undefined}
          >
            <Texts
              {...titleElement}
              fontStyle={titleElement?.subType ?? "h2"}
              content={title}
              color={titleElement?.color ?? theme.colorV2.colorSet.grey800}
              padding={titleElement?.padding ?? PADDING_NONE}
            />
          </Title>
        )}
        {showTitle && showMoreButton && onClickViewMore && (
          <ViewMore
            padding={titleElement?.padding ?? PADDING_NONE}
            onClick={onClickViewMore}
          />
        )}
      </Container>
      {description && showDescription && (
        <Description>
          <Texts
            {...descriptionElement}
            fontStyle={descriptionElement?.subType ?? "body3"}
            color={descriptionElement?.color ?? theme.colorV2.colorSet.grey300}
            padding={descriptionElement?.padding ?? PADDING_NONE}
            content={description}
          />
        </Description>
      )}
    </Header>
  );
};

export default React.memo(BlockitHeader);
