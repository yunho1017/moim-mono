declare namespace Moim {
  namespace Upload {
    interface IUploadFileMeta {
      file: File;
      priorityId: Id;
      priority: number;
    }

    interface IQueueInfo {
      id: Id;
      upload: IUpload;
    }

    interface IUpload {
      url: string;
      fields: IFields;
    }

    interface IFields {
      [key: string]: string;
      key: string;
      bucket: string;
      "X-Amz-Algorithm": string;
      "X-Amz-Credential": string;
      "X-Amz-Date": string;
      "X-Amz-Security-Token": string;
      Policy: string;
      "X-Amz-Signature": string;
    }

    type FileMode = "hosted" | "external" | "snippet" | "post";

    interface IUploadStatusInfo {
      id: Id;
      group: Id;
      status: IStatus;
      created_at: number;
      name: string;
      title: string;
      user: Id;
      mode: FileMode;
      uploadTimerId?: NodeJS.Timeout;
    }

    type StatusName =
      | "WAITING_FOR_UPLOAD"
      | "TRANSFERING"
      | "QUEUED"
      | "PROCESSING"
      | "AVAILABLE"
      | "FAILED";

    interface IStatus {
      name: StatusName;
      updated_at: number;
    }

    interface IFileInfo extends IUploadStatusInfo {
      // TODO: should update with file.d.ts IFile
      mimetype: string; // ex) image/jpeg
      filetype: string; // ex) jpg
      pretty_type: string; // ex) JPEG Image
      editable: boolean;
      is_starred: boolean;
      size: number;
      is_public: boolean;
      public_url_shared: boolean;
      url_private: string; // ex) files/G03PCGV9S/FC7EAUXLF/image.jpg

      // Permallink URLs
      // An URL that pointing to given file
      permalink: string; // "https://acme.vingle.group/files/C12345678/F12345678/untitled_document",

      // An URL that pointing to given file. Available only if `public_url_shared` field is true.
      permalink_public: "https://vgroup-files.com/G12345678-F12345678-aabbccddeeff";

      // Media Preview (Rich Preview) specific fields
      // Indicates whether given file has fields for rich preview rendering
      has_rich_preview: boolean; // true
      // Thumbnails
      // @todo Add more sizes
      // @todo include `srcset` usage, or not
      thumb_360?: string; // "https://files.vingle.group/files-tmb/G12345678/F12345678/360.png"
      thumb_720?: string; // "https://files.vingle.group/files-tmb/G12345678/F12345678/720.png"

      // Original image dimensions, if available
      width?: number;
      height?: number;

      // Orifinal EXIF Rotation value, if available
      // If client needs to display original image, Client must rotate original image using its EXIF Rotation (1~8)
      image_exif_rotation?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

      // External File specific fields
      // Indicates whether the master copy of a file is stored within the system or not
      is_external: boolean; // false
      // Indicates what kind of external file it is, e.g. dropbox or gdoc.
      external_type?: string; // dropbox
      // Creator defined GUID for the file.
      external_id?: string; // "123456"
      external_url?: string; // "https://docs.google.com/document/d/13EbwmayFKVeFImOplGXE-QsKctdE6hzyUdUVrZg1yVU/edit"

      // Reverse references for parents
      // Below fields are not final spec. just for example purpose only.
      // Reverse reference specification can be changed in the future!
      // @todo finish final "shares" field spec
      shares: {
        [conversation_type: "public" | "private"]: {
          [channel_id: string]: {
            ts: string; // message id
            channel_name: string; // general
            group_id: string; // G012345678
          }[];
        };
      };
      image_preview?: Blockit.ImageMetadata;
      image_urls?: Blockit.ImageSrcProps;
    }

    type IFile = IFileInfo | IUploadStatusInfo;

    interface IDenormalizedFile extends IFileInfo, IUploadStatusInfo {
      user: User.IUser;
    }

    type INormalizedFileInfoData = INormalizedEntities<IFile>;
  }
}
