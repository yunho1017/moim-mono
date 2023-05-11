const MAX_AXIS_PIXEL = 4000;

const softLimits = new Map<string, number>([
  ["4g", 1024 * 1024 * 50], // 100MB
  ["3g", 1024 * 1024 * 10], // 20MB
  ["2g", 1024 * 1024 * 2], // 2MB
  ["slow-2g", 1024 * 512], // 512KB
]);
const MAX_FILE_SIZE = 1 * 1024 * 1024 * 1024;

export function isConsentRequired(file: File) {
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;
  if (connection) {
    const connectionType = connection.effectiveType;
    if (connectionType) {
      const softLimit = softLimits.get(connectionType) || softLimits.get("4g");
      return file.size > (softLimit as number);
    }
  }
  return false;
}

export async function isAcceptableSize(file: File) {
  return new Promise(resolve => {
    if (file.size <= MAX_FILE_SIZE) {
      if (file.type.match("image.*")) {
        resolve(file.size <= MAX_FILE_SIZE);
        const img = new Image();
        const objUrl = URL.createObjectURL(file);
        img.onload = function() {
          resolve(
            !(img.width >= MAX_AXIS_PIXEL || img.height >= MAX_AXIS_PIXEL),
          );
          URL.revokeObjectURL(objUrl);
        };
        img.src = objUrl;
      } else {
        resolve(true);
      }
    } else {
      resolve(false);
    }
  });
}
