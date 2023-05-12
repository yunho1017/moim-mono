declare module "aspectratio" {
  /**
   * Return:
   * x - top lef x coordinate
   * y - top lef y coordinate
   * width - new image width
   * height - new image height
   */
  function crop(
    x: number,
    y: number,
    r: string,
  ): [number, number, number, number];

  function resize(
    x: number,
    y: number,
    maxX: number,
    maxY: number,
  ): [number, number, number, number];
}
