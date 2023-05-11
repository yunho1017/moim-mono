import axios, { CancelToken } from "axios";
import MoimAPI from "common/api";

export async function fileUploaderForHub(
  file: File | Blob,
  cancelToken?: CancelToken,
): Promise<Moim.Group.IGroupImagePreview> {
  // initiate file upload
  const queueData = await MoimAPI.group.getGroupIconUploadQueue(cancelToken);
  // upload file
  const formData = new FormData();
  const url = queueData.data.upload.url;
  const fields = queueData.data.upload.fields;
  for (const key in fields) {
    if (fields.hasOwnProperty(key)) {
      formData.append(key, fields[key]);
    }
  }
  formData.append("file", file);
  await axios.post(url, formData, { cancelToken }); // currently return nothing...

  const preview = await MoimAPI.group.getGroupIconPreview(
    queueData.data.id,
    cancelToken,
  );
  return preview.data;
}

export async function fileUploaderForUserProfile(
  file: File | Blob,
  cancelToken?: CancelToken,
): Promise<Moim.Group.IGroupImagePreview> {
  // initiate file upload
  const queueData = await MoimAPI.me.getAvatarUploadSession(cancelToken);
  // upload file
  const formData = new FormData();
  const url = queueData.data.upload.url;
  const fields = queueData.data.upload.fields;
  for (const key in fields) {
    if (fields.hasOwnProperty(key)) {
      formData.append(key, fields[key]);
    }
  }
  formData.append("file", file);
  await axios.post(url, formData, { cancelToken }); // currently return nothing...

  const preview = await MoimAPI.me.getAvatarPreview(
    queueData.data.id,
    cancelToken,
  );
  return preview.data;
}
