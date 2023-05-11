import React from "react";
import { DefaultDivider } from "common/components/divider";
import { DividerWrapper } from "../../styled";

export function WithDivider({
  top,
  bottom,
  children,
}: React.PropsWithChildren<{
  top?: boolean;
  bottom?: boolean;
}>) {
  if (!children) {
    return null;
  }
  return (
    <>
      {top && (
        <DividerWrapper>
          <DefaultDivider />
        </DividerWrapper>
      )}
      {children}
      {bottom && (
        <DividerWrapper>
          <DefaultDivider />
        </DividerWrapper>
      )}
    </>
  );
}

export function OnlyNormal({
  children,
  productType,
}: React.PropsWithChildren<{
  productType: Moim.Commerce.PRODUCT_TYPE;
}>) {
  if (productType === "normal") {
    return null;
  }
  return <>{children}</>;
}

export function OnlyFunding({
  children,
  productType,
}: React.PropsWithChildren<{
  productType: Moim.Commerce.PRODUCT_TYPE;
}>) {
  if (productType === "normal") {
    return null;
  }
  return <>{children}</>;
}
