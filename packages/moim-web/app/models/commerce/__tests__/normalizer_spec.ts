import { RAW } from "app/__mocks__";
import {
  sellerNormalizer,
  sellerListNormalizer,
  productNormalizer,
  productListNormalizer,
  productSetNormalizer,
  productSetListNormalizer,
  commerceCategoryNormalizer,
  commerceCategoryListNormalizer,
  cartResponseNormalizer,
  purchaseListNormalizer,
  shippingAddressNormalizer,
  shippingAddressListNormalizer,
} from "../normalizer";

describe("Commerce Normalizer", () => {
  describe("sellerNormalizer()", () => {
    it("should able normalize", () => {
      const result = sellerNormalizer(RAW.COMMERCE.hubSeller);
      expect(result.entities).toHaveProperty("commerce_seller");
      expect(result.result).toEqual(RAW.COMMERCE.hubSeller.id);
    });
  });
  describe("sellerListNormalizer()", () => {
    it("should able normalize", () => {
      const result = sellerListNormalizer(RAW.COMMERCE.subSellers);
      expect(result.entities).toHaveProperty("commerce_seller");
      expect(result.result).toEqual({
        data: RAW.COMMERCE.subSellers.data.map(i => i.id),
        paging: RAW.COMMERCE.subSellers.paging,
      });
    });
  });

  describe("productNormalizer()", () => {
    it("should able normalize", () => {
      const result = productNormalizer(RAW.COMMERCE.productShow);
      expect(result.entities).toHaveProperty("commerce_product");
      expect(result.result).toEqual(RAW.COMMERCE.productShow.id);
    });
  });

  describe("productListNormalizer()", () => {
    it("should able normalize", () => {
      const result = productListNormalizer(RAW.COMMERCE.products);
      expect(result.entities).toHaveProperty("commerce_product");
      expect(result.result).toEqual({
        data: RAW.COMMERCE.products.data.map(i => i.id),
        paging: RAW.COMMERCE.products.paging,
      });
    });
  });

  describe("productSetNormalizer()", () => {
    it("should able normalize", () => {
      const result = productSetNormalizer(RAW.COMMERCE.productSets.data[0]);
      expect(result.entities).toHaveProperty("commerce_productSet");
      expect(result.result).toEqual(RAW.COMMERCE.productSets.data[0].id);
    });
  });

  describe("productSetListNormalizer()", () => {
    it("should able normalize", () => {
      const result = productSetListNormalizer(RAW.COMMERCE.productSets);
      expect(result.entities).toHaveProperty("commerce_productSet");
      expect(result.result).toEqual({
        data: RAW.COMMERCE.productSets.data.map(i => i.id),
        paging: RAW.COMMERCE.productSets.paging,
      });
    });
  });

  describe("commerceCategoryNormalizer()", () => {
    it("should able normalize", () => {
      const result = commerceCategoryNormalizer(
        RAW.COMMERCE.categories.data[0],
      );
      expect(result.entities).toHaveProperty("commerce_category");
      expect(result.result).toEqual(RAW.COMMERCE.categories.data[0].id);
    });
  });

  describe("commerceCategoryListNormalizer()", () => {
    it("should able normalize", () => {
      const result = commerceCategoryListNormalizer(RAW.COMMERCE.categories);
      expect(result.entities).toHaveProperty("commerce_category");
      expect(result.result).toEqual({
        data: RAW.COMMERCE.categories.data.map(i => i.id),
      });
    });
  });

  describe("cartResponseNormalizer()", () => {
    it("should able normalize", () => {
      const result = cartResponseNormalizer(RAW.COMMERCE.carts);
      expect(result.entities).toHaveProperty("commerce_carts");
      expect(result.result).toEqual(RAW.COMMERCE.carts.id);
    });
  });

  describe("paymentListNormalizer()", () => {
    it("should able normalize", () => {
      const result = purchaseListNormalizer(RAW.COMMERCE.payments);
      expect(result.entities).toHaveProperty("commerce_purchases");
      expect(result.entities).toHaveProperty("commerce_purchaseItems");
      expect(result.result).toEqual({
        paging: RAW.COMMERCE.payments.paging,
        data: RAW.COMMERCE.payments.data.map(i => i.id),
      });
    });
  });

  describe("shippingAddressNormalizer()", () => {
    it("should able normalize", () => {
      const result = shippingAddressNormalizer(RAW.COMMERCE.shippingAddress);
      expect(result.result).toBe(RAW.COMMERCE.shippingAddress.id);
    });
  });

  describe("shippingAddressListNormalizer()", () => {
    it("should able normalize", () => {
      const result = shippingAddressListNormalizer(
        RAW.COMMERCE.shippingAddressList,
      );
      expect(result.result.data).toEqual(
        RAW.COMMERCE.shippingAddressList.data.map(x => x.id),
      );
    });
  });
});
