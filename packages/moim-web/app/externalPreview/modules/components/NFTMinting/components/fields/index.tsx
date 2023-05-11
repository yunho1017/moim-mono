import * as React from "react";
import styled from "styled-components";
import { FormattedMessage, useIntl } from "react-intl";
import {
  createFileUpload,
  getSchedulesList,
  getUploadFileUrl,
  mint,
} from "app/externalPreview/api/nft";
import { uploadFile, setExternalCookieToken } from "app/externalPreview/helper";
// components
import { FlatButton } from "common/components/designSystem/buttons";
import {
  MultilineBoxInput,
  SingleLineBoxInput,
} from "common/components/designSystem/boxInput";
import { Spacer } from "common/components/designSystem/spacer";
import StaticSelection from "common/components/designSystem/selection/preset/static";
import { SkeletonBox } from "common/components/skeleton";
import { DefaultLoader } from "common/components/loading";
import RedirectLoadingDialog from "app/externalPreview/common/components/redirectLoadingDialog";
// styled
import {
  FieldsWrapper,
  Section,
  SectionTitle,
  SectionContent,
  DescriptionBoxStyle,
  NFTFileUploader,
  NFTFileWrapper,
  SelectionStyle,
  SkeletonStyle,
} from "./styled";

import CameraIcon from "@icon/48-uploadphoto.svg";

interface IProps {
  communityId: string;
  userId: string;
  collections?: Moim.NFT.IContract[];
  userToken: string;
}

export const MintButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
  background-color: var(--external-main-color);
  color: #fff;
`;

const MintingFields: React.FC<IProps> = ({
  communityId,
  userId,
  collections,
  userToken,
}) => {
  const intl = useIntl();

  const fileRef = React.useRef<HTMLInputElement>(null);
  const [name, setName] = React.useState("");
  const [description, setDiscription] = React.useState("");

  const [fileUrl, setFileUrl] = React.useState<string | undefined>(undefined);
  const [schedules, setSchedules] = React.useState<
    Moim.NFT.ISchedule[] | undefined
  >(undefined);
  const [contractId, setContractId] = React.useState<string | null>(null);
  const [scheduleId, setScheduleId] = React.useState<string | null>(null);
  const [loading, setLoadingStatus] = React.useState<boolean | undefined>(
    undefined,
  );

  const [openLoadingDialog, setLoadingDialogStatus] = React.useState<boolean>(
    false,
  );

  const handleFile = React.useCallback(async (file: File) => {
    try {
      const res = await createFileUpload(file.name);
      if (res) {
        await uploadFile(file, { data: { upload: { ...res.upload } } });
        const data = await getUploadFileUrl(res.id);
        setFileUrl(data?.url);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("error!!!");
    }
  }, []);

  const handleChangeInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoadingStatus(true);
      const file = e.target.files?.[0];
      const reader = new FileReader();
      if (!file) {
        return;
      }
      reader.onload = async () => {
        await handleFile(file);
      };
      reader.readAsDataURL(file);
    },
    [handleFile],
  );

  const handleGetSchedules = React.useCallback(async (collectionId: string) => {
    if (collectionId) {
      const result = await getSchedulesList(collectionId);
      setSchedules(result?.data);
      setScheduleId(result?.data?.[0].id ?? null);
    }
  }, []);

  const handleChangeCollectionId = React.useCallback(
    async (collectionId: string) => {
      setContractId(collectionId);
      if (collectionId) handleGetSchedules(collectionId);
    },
    [handleGetSchedules],
  );

  const handleChangeScheduleId = React.useCallback(
    async (_scheduleId: string) => {
      setScheduleId(_scheduleId);
    },
    [],
  );

  const handleMint = React.useCallback(async () => {
    if (
      contractId &&
      scheduleId &&
      communityId &&
      userToken &&
      name &&
      fileUrl
    ) {
      setLoadingDialogStatus(true);
      setExternalCookieToken(communityId, userToken);
      const data = await mint({
        contractId,
        scheduleId,
        communityId,
        originCommunityId: communityId,
        token: userToken,
        callbackUrl:
          window.location.origin +
          `/communities/${communityId}/user/${userId}?token=${userToken}`,
        cancelCallbackUrl:
          window.location.origin +
          `/communities/${communityId}/user/${userId}?token=${userToken}`,
        customItem: {
          name,
          description,
          itemUrl: fileUrl,
        },
      });
      if (data) {
        window.location.href = data.location;
      }
    }
  }, [
    contractId,
    description,
    fileUrl,
    communityId,
    name,
    scheduleId,
    userId,
    userToken,
  ]);

  const handleLoad = React.useCallback(() => {
    setLoadingStatus(false);
  }, []);

  return (
    <>
      <FieldsWrapper>
        <Section>
          <SectionTitle>
            <FormattedMessage id="user_nft_mint_page_nft_title_title" />
          </SectionTitle>
          <SectionContent>
            <SingleLineBoxInput
              size="Large"
              value={name}
              placeholder={intl.formatMessage({
                id: "user_nft_mint_page_nft_title_placeholder",
              })}
              onChange={setName}
            />
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>
            <FormattedMessage id="user_nft_mint_page_nft_description_title" />
          </SectionTitle>
          <SectionContent>
            <MultilineBoxInput
              wrapperStyle={DescriptionBoxStyle}
              size="Large"
              autoFocus={true}
              value={description}
              placeholder={intl.formatMessage({
                id: "user_nft_mint_page_nft_description_placeholder",
              })}
              suffix={{
                type: "characters",
                maxCount: 2000,
              }}
              onChange={setDiscription}
            />
          </SectionContent>
        </Section>
        {collections && collections.length > 0 && (
          <Section>
            <SectionTitle>
              <FormattedMessage id="user_nft_mint_page_select_collection_title" />
            </SectionTitle>
            <SectionContent>
              <StaticSelection
                size="l"
                state="normal"
                selected={contractId}
                options={collections.map(item => ({
                  value: item.id,
                  label: item.name,
                }))}
                isMultiple={false}
                useSearch={true}
                placeholder={intl.formatMessage({
                  id: "user_nft_mint_page_select_collection_placeholder",
                })}
                overrideStyle={SelectionStyle}
                onChange={handleChangeCollectionId}
              />
            </SectionContent>
          </Section>
        )}
        {schedules && schedules.length > 0 && (
          <Section>
            <SectionTitle>
              <FormattedMessage id="user_nft_mint_page_select_schedule_title" />
            </SectionTitle>
            <SectionContent>
              <StaticSelection
                size="l"
                state="normal"
                selected={scheduleId}
                options={schedules.map(item => ({
                  value: item.id,
                  label: item.name,
                }))}
                isMultiple={false}
                useSearch={true}
                placeholder={intl.formatMessage({
                  id: "user_nft_mint_page_select_schedule_placeholder",
                })}
                overrideStyle={SelectionStyle}
                onChange={handleChangeScheduleId}
              />
            </SectionContent>
          </Section>
        )}
        <Section>
          <SectionTitle>
            <FormattedMessage id="user_nft_mint_page_upload_media_title" />
          </SectionTitle>
          <SectionContent>
            <NFTFileWrapper hasMinHeight={Boolean(!fileUrl)}>
              {loading === undefined ? (
                <NFTFileUploader onClick={() => fileRef?.current?.click()}>
                  <CameraIcon size="l" />
                </NFTFileUploader>
              ) : (
                <>
                  {!fileUrl ? (
                    <SkeletonBox width="100%" overrideStyle={SkeletonStyle}>
                      <DefaultLoader />
                    </SkeletonBox>
                  ) : (
                    <img src={fileUrl} onLoad={handleLoad} />
                  )}
                </>
              )}
            </NFTFileWrapper>
          </SectionContent>
          <input
            ref={fileRef}
            style={{ display: "none" }}
            className="input-file"
            type="file"
            accept="image/gif, image/png, image/jpeg, image/bmp, image/webp"
            onChange={handleChangeInput}
          />
        </Section>
        <Section>
          <SectionContent>
            <Spacer value={20} />
            <MintButton onClick={handleMint}>
              <FormattedMessage id="button_mint_my_nft" />
            </MintButton>
          </SectionContent>
        </Section>
      </FieldsWrapper>
      <RedirectLoadingDialog
        open={openLoadingDialog}
        onClose={() => setLoadingDialogStatus(true)}
      />
    </>
  );
};

export default MintingFields;
