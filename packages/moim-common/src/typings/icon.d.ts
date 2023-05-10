declare module "*.svg" {
  import * as React from "react";
  const component: React.ComponentType<React.HTMLAttributes<HTMLSpanElement> & {
    size?: Moim.DesignSystem.Size;
    touch?: number;
  }>;
  export default component;
}

declare module "@icon/*" {
  import * as React from "react";
  const component: Omit<React.ComponentType<
    React.HTMLProps<HTMLSpanElement>,
    "size" | "touch"
  > & {
    size?: Moim.DesignSystem.Size;
    touch?: number;
  }>;
  export default component;
}
