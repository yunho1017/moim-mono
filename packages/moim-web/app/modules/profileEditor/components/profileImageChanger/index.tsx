import * as React from "react";
// actions
import { useActions } from "app/store";
import { ActionCreators as MeActionCreators } from "app/actions/me";
// components
import UserProfileImage from "common/components/userProfileImage";
import LoadingIcon from "common/components/loading/icon";
import ImageUploader, { IRefImageUploader } from "./imageUploader";
import {
  Wrapper,
  IconWrapper,
  LoadWrapper,
  UploadPhotoButton,
} from "./styledComponents";

interface IProps {
  src: string;
  isAvatarUpdating: boolean;
  onChange(avatarId: Moim.Id): void;
}

const UserImageChanger: React.FC<IProps> = ({
  src,
  isAvatarUpdating,
  onChange,
}) => {
  const [tempImageUrl, setTempImageUrl] = React.useState(src);
  const refImageUploader = React.useRef<IRefImageUploader>(null);

  const { startUpload, succeededUpload, failedUpload } = useActions({
    startUpload: MeActionCreators.startUpdateAvatar,
    succeededUpload: MeActionCreators.succeededUpdateAvatar,
    failedUpload: MeActionCreators.failedUpdateAvatar,
  });

  const handleSucceed = React.useCallback(
    (data: { blob: Blob | null; preview: Moim.Group.IGroupImagePreview }) => {
      if (data.blob) {
        const objUrl = window.URL.createObjectURL(data.blob);
        setTempImageUrl(objUrl);
      }
      succeededUpload();
      onChange(data.preview.id);
    },
    [onChange, succeededUpload],
  );

  const handleFailed = React.useCallback(() => {
    failedUpload();
  }, [failedUpload]);

  const handleClick = React.useCallback(() => {
    if (!isAvatarUpdating) {
      refImageUploader.current?.openImageCropper();
    }
  }, [isAvatarUpdating]);

  const loadingElement = React.useMemo(
    () => isAvatarUpdating && <LoadingIcon />,
    [isAvatarUpdating],
  );

  React.useEffect(
    () => () => {
      window.URL.revokeObjectURL(tempImageUrl);
    },
    [tempImageUrl],
  );

  return (
    <>
      <Wrapper onClick={handleClick} role={"button"}>
        <UserProfileImage src={tempImageUrl} size="xl" />
        <IconWrapper>
          <UploadPhotoButton />
        </IconWrapper>
        <LoadWrapper>{loadingElement}</LoadWrapper>
      </Wrapper>
      <ImageUploader
        ref={refImageUploader}
        onStartLoading={startUpload}
        onSucceed={handleSucceed}
        onFailed={handleFailed}
      />
    </>
  );
};

export default UserImageChanger;
