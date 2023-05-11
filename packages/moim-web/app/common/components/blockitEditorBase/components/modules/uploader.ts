import Quill, { StringMap } from "quill";

const uploaderModule = Quill.import("modules/uploader");
export default class MoimUploaderModule extends uploaderModule {
  private instCustomUploader: Function | undefined;

  public constructor(quill: Quill, options: StringMap) {
    super(quill, options);
    if (options.customUploader) {
      this.instCustomUploader = options.customUploader;
    }
  }

  public async customUploader(...params: any) {
    await this.instCustomUploader?.(...params);
  }
}
