import * as React from "react";
// helper
import { MoimURL } from "common/helpers/url";
import { useStoreState } from "app/store";
// hook
import useRedirect from "common/hooks/useRedirect";
import useIsMobile from "common/hooks/useIsMobile";
import useOpenState from "common/hooks/useOpenState";
// components
import { Spacer } from "common/components/designSystem/spacer";
import MintSettingDialog from "app/modules/nft/components/mintSettingDialog";
import Period from "./period";
import Button from "./button";
// style
import {
  ScheduleListItem,
  ScheduleListItemContainer,
  ScheduleListItemLeft,
  ScheduleListItemRight,
  ScheduleListItemTitle,
  ScheduleListBanner,
  RepresentImgWrapper,
} from "./styled";

interface IProps {
  schedule: Moim.NFT.ISchedule;
}

const ScheduleItem: React.FC<IProps> = ({ schedule }: IProps) => {
  const isMobile = useIsMobile();
  const redirect = useRedirect();
  const { isOpen, open, close } = useOpenState(false);
  const contract = useStoreState(
    state => state.entities.nftContracts[schedule.contractId],
  );

  const hasRightContainer = Boolean(
    schedule?.representResources?.length ||
      contract?.itemType === "GENERATIVE" ||
      schedule?.type !== "AIRDROP",
  );

  const handleClickViewMore = React.useCallback(() => {
    redirect(
      new MoimURL.NftScheduleShow({
        contractId: schedule.contractId,
        scheduleId: schedule.id,
      }).toString(),
    );
  }, [redirect, schedule]);

  const handleOpen: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = React.useCallback(
    e => {
      e.stopPropagation();
      open();
    },
    [open],
  );

  const handleClose = React.useCallback(() => {
    close();
  }, [close]);

  if (!schedule) return null;

  if (isMobile) {
    return (
      <>
        <ScheduleListItem onClick={handleClickViewMore} role="button">
          {schedule.banner && (
            <ScheduleListBanner>
              <img src={schedule.banner?.url} />
            </ScheduleListBanner>
          )}
          <ScheduleListItemContainer>
            <ScheduleListItemLeft hasFullWidth={!hasRightContainer}>
              {schedule.name && (
                <>
                  <ScheduleListItemTitle>{schedule.name}</ScheduleListItemTitle>
                  <Spacer value={10} />
                </>
              )}
              <Period
                mintingStartAt={schedule.mintingStartAt}
                mintingEndAt={schedule.mintingEndAt}
              />
            </ScheduleListItemLeft>
            {schedule.representResources?.length && (
              <ScheduleListItemRight>
                <RepresentImgWrapper>
                  <img src={schedule.representResources[0].previewUrl} />
                </RepresentImgWrapper>
              </ScheduleListItemRight>
            )}
          </ScheduleListItemContainer>
          {contract?.itemType === "GENERATIVE" &&
            schedule?.type !== "AIRDROP" && (
              <Button
                mintable={schedule?.mintable ?? false}
                onClick={handleOpen}
              />
            )}
        </ScheduleListItem>
        <MintSettingDialog
          mintSettingDialogOpen={isOpen}
          max={schedule?.maxAmountPerAddress ?? 0}
          contractId={schedule?.contractId}
          scheduleId={schedule?.id}
          price={schedule?.price}
          currency={contract?.currency}
          onClose={handleClose}
        />
      </>
    );
  }

  return (
    <>
      <ScheduleListItem onClick={handleClickViewMore} role="button">
        {schedule.banner && (
          <ScheduleListBanner>
            <img src={schedule.banner?.url} />
          </ScheduleListBanner>
        )}
        <ScheduleListItemContainer>
          <ScheduleListItemLeft hasFullWidth={!hasRightContainer}>
            {schedule.name && (
              <>
                <ScheduleListItemTitle>{schedule.name}</ScheduleListItemTitle>
                <Spacer value={10} />
              </>
            )}
            <Period
              mintingStartAt={schedule.mintingStartAt}
              mintingEndAt={schedule.mintingEndAt}
            />
          </ScheduleListItemLeft>
          {hasRightContainer && (
            <ScheduleListItemRight>
              {schedule.representResources?.length && (
                <RepresentImgWrapper>
                  <img src={schedule.representResources[0].previewUrl} />
                </RepresentImgWrapper>
              )}
              {contract?.itemType === "GENERATIVE" &&
                schedule?.type !== "AIRDROP" && (
                  <Button
                    mintable={schedule?.mintable ?? false}
                    onClick={handleOpen}
                  />
                )}
            </ScheduleListItemRight>
          )}
        </ScheduleListItemContainer>
      </ScheduleListItem>
      <MintSettingDialog
        mintSettingDialogOpen={isOpen}
        max={schedule?.maxAmountPerAddress ?? 0}
        contractId={schedule?.contractId}
        scheduleId={schedule?.id}
        price={schedule?.price}
        currency={contract?.currency}
        onClose={handleClose}
      />
    </>
  );
};

export default React.memo(ScheduleItem);
