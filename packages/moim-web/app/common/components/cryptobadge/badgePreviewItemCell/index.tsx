import * as React from "react";
import { MoimURL } from "common/helpers/url";
import useRedirect from "common/hooks/useRedirect";
import { useTheme } from "styled-components";
import { CryptobadgeItemCellBodySkeleton } from "./skeleton";
import {
  BadgePreviewFrame,
  ClaimedIcon,
  CompleteIcon,
  StatusImageWrapper,
} from "./styled";

interface IProps {
  item: Moim.Cryptobadge.ICryptobadge;
  mintRequestStatus?: string;
}

export const BadgePreviewItemCell: React.FC<IProps> = ({
  item,
  mintRequestStatus,
}) => {
  const themeContext = useTheme();
  const isLoading = false;

  const isClaimed = mintRequestStatus === "NEW";
  const isCompleted = mintRequestStatus === "DONE";

  const redirect = useRedirect();

  const handleClick = React.useCallback(
    (badgeId: string) => {
      const badgeShowUrl = new MoimURL.CryptobadgeShow({
        badgeId,
      }).toString();

      redirect(badgeShowUrl);
    },
    [redirect],
  );

  return (
    <>
      {isLoading ? (
        <CryptobadgeItemCellBodySkeleton />
      ) : (
        <BadgePreviewFrame
          backgroundColor={
            item.backgroundColor ?? themeContext.colorV2.colorSet.grey300
          }
          textColor={item.textColor ?? themeContext.colorV2.colorSet.white1000}
          onClick={() => {
            handleClick(item.id);
          }}
        >
          <figure>
            <div className="imageWrapper">
              <StatusImageWrapper className="statusImage">
                <img
                  src={`https://media.canlab.co/?media=${window.encodeURIComponent(
                    item.certificateImageUri!,
                  )}&ratio=1:1&scale=lg`}
                  alt={item.name || "badge image"}
                  className={`badgeImage ${isClaimed ? "withStatus" : ""}}`}
                />
                {isClaimed ? (
                  <ClaimedIcon className="statusImageIcon" />
                ) : isCompleted ? (
                  <CompleteIcon className="statusImageIcon" />
                ) : null}
              </StatusImageWrapper>
            </div>
            <p className="badgeName">{item.name}</p>
          </figure>
          <aside>
            <p className="badgeMoreInfo">
              {item.issuer && `issued by ${item.issuer}`}
            </p>
            <p className="badgeName">{item.name}</p>
          </aside>
        </BadgePreviewFrame>
      )}
    </>
  );
};
