import { IGroupIcon } from "../components/step/groupIcon";

export default function getIcon(data: IGroupIcon | null) {
  if (!data || !data.icon) {
    return null;
  }

  const imageIcon: Moim.IImageIcon = {
    type: "image",
    data: {
      url: data.src,
    },
  };

  return imageIcon;
}

export function getURLtoIcon(url: string): Moim.IImageIcon | null {
  if (url) {
    return {
      type: "image",
      data: {
        url,
      },
    };
  }

  return null;
}
