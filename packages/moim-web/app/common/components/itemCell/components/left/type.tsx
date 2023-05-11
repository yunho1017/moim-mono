export interface ILeftProps {
  leftContentsSize: Moim.DesignSystem.Size;
  onClick?: () => void;
  margin: {
    left: Moim.Enums.MarginSize;
    right: Moim.Enums.MarginSize;
  };
}

export interface ISizeMap {
  touchArea: number;
}

export interface ILeftContentsSizeMap {
  size: number;
}

export const leftContentsSizeMap: {
  [key in Moim.DesignSystem.Size]?: ILeftContentsSizeMap;
} = {
  xs: {
    size: 18,
  },
  s: {
    size: 24,
  },
  m: {
    size: 36,
  },
  l: {
    size: 48,
  },
};
