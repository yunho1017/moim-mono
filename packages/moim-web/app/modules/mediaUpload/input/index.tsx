import * as React from "react";

export type MediaUploadTypes =
  | "application"
  | "image"
  | "video"
  | "animated-image";

export const MEDIA_RESPONSE_ACCEPTS = new Map<MediaUploadTypes, string>([
  ["image", "image/jpeg,image/png,image/webp,image/bmp,image/svg*,image/tiff"],
  ["animated-image", "image/gif"],
  ["video", "video/mp4,video/x-m4v,video/*"],
  ["application", "application/xml,application/pdf,application/*"],
]);

interface IProps {
  onChange: (file: File) => void;
  denyTypes?: MediaUploadTypes[];
}

class MediaUploadInput extends React.Component<IProps> {
  private readonly fileInput: React.RefObject<
    HTMLInputElement
  > = React.createRef();

  public render() {
    const accepts = this.getFileAccepts();
    return (
      <input
        ref={this.fileInput}
        style={{ display: "none" }}
        type="file"
        accept={accepts.join(",")}
        disabled={!accepts.length}
        onChange={this.handleMediaInput}
      />
    );
  }

  public readonly clear = () => {
    if (this.fileInput.current) {
      this.fileInput.current.value = "";
    }
  };

  public readonly trigger = () => {
    if (this.fileInput.current) {
      this.fileInput.current.click();
    }
  };

  public readonly hasFile = () => {
    if (this.fileInput.current) {
      return Boolean(
        this.fileInput.current.files && this.fileInput.current.files.length > 0,
      );
    }

    return false;
  };

  private readonly getFileAccepts = (): string[] => {
    const denyTypes = this.props.denyTypes || [];
    return Array.from(MEDIA_RESPONSE_ACCEPTS.entries())
      .filter(([key]) => !denyTypes.includes(key))
      .reduce<string[]>((result, [, types]) => result.concat(types), []);
  };

  private readonly handleMediaInput = () => {
    const { current: input } = this.fileInput;
    if (input && input.files) {
      const file = input.files[0];
      this.props.onChange(file);
    }
  };
}

export default MediaUploadInput;
