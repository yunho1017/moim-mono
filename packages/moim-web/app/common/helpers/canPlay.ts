export default function canPlay(mimeType: string) {
  const videoElement = document.createElement("video");
  return videoElement.canPlayType(mimeType);
}
