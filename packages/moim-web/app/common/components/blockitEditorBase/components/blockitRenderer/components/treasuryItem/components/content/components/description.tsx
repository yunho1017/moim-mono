import * as React from "react";
import ShavedText from "common/components/shavedText";
import {
  Description,
  DescriptionTitle,
  DescriptionTitleWrapper,
  DescriptionWrapper,
  RetryIcon,
  RetryIconWrapper,
} from "./styled";

interface IProps {
  title: string;
  description?: string;
  showItemDescription: boolean;
  onRetryClick?: React.MouseEventHandler<HTMLDivElement>;
  isRefreshing?: boolean;
}

const TreasuryItemDescription: React.FC<IProps> = ({
  title,
  description = "",
  showItemDescription,
  onRetryClick,
  isRefreshing,
}: IProps) => (
  <DescriptionWrapper>
    {title && (
      <DescriptionTitleWrapper>
        <DescriptionTitle>{title}</DescriptionTitle>
        <RetryIconWrapper>
          <RetryIcon onClick={onRetryClick} isRefreshing={isRefreshing} />
        </RetryIconWrapper>
      </DescriptionTitleWrapper>
    )}
    {description && showItemDescription && (
      <Description>
        <ShavedText value={description} />
      </Description>
    )}
  </DescriptionWrapper>
);

export default React.memo(TreasuryItemDescription);
