import { RAW, NORMALIZED } from "app/__mocks__";
import {
  sellerDenomalizer,
  sellerListDenomalizer,
  productDenomalizer,
  productListDenomalizer,
  productSetDenomalizer,
  productSetListDenomalizer,
  commerceCategoryDenomalizer,
  commerceCategoryListDenomalizer,
  purchaseListDenomalizer,
  shippingAddressDenormalizer,
  shippingAddressListDenormalizer,
} from "../denormalizer";

const MOCK_ENTITIES = {
  ...NORMALIZED.COMMERCE.subSellers.entities,
  ...NORMALIZED.COMMERCE.products.entities,
  ...NORMALIZED.COMMERCE.productSets.entities,
  ...NORMALIZED.COMMERCE.categories.entities,
  ...NORMALIZED.COMMERCE.carts.entities,
  ...NORMALIZED.COMMERCE.payments.entities,
  ...NORMALIZED.COMMERCE.shippingAddressList.entities,
};

describe("Commerce Denormalize", () => {
  describe("sellerDenomalizer()", () => {
    it("should get seller", () => {
      const result = sellerDenomalizer(
        RAW.COMMERCE.subSellers.data[0].id,
        MOCK_ENTITIES,
      );
      expect(result.id).toEqual(RAW.COMMERCE.subSellers.data[0].id);
    });
  });

  describe("sellerListDenomalizer()", () => {
    it("should get seller list", () => {
      const result = sellerListDenomalizer(
        NORMALIZED.COMMERCE.subSellers.result,
        MOCK_ENTITIES,
      );
      expect(result).toEqual(RAW.COMMERCE.subSellers);
    });
  });

  describe("productDenomalizer()", () => {
    it("should get product", () => {
      const result = productDenomalizer(
        NORMALIZED.COMMERCE.products.result.data[0],
        MOCK_ENTITIES,
      );

      const goalKeys = [
        ...Object.keys(RAW.COMMERCE.products.data[0]),
        "seller",
        "deliveryGroup",
        "categories",
        "additionalFees",
        "additionalFeeInfos",
      ];

      expect(Object.keys(result)).toEqual(goalKeys);
    });
  });

  describe("productListDenomalizer()", () => {
    it("should get product list", () => {
      const result = productListDenomalizer(
        NORMALIZED.COMMERCE.products.result,
        MOCK_ENTITIES,
      );
      expect(result).toHaveProperty("data");
      expect(result).toHaveProperty("paging");
      expect(result.data).toHaveLength(RAW.COMMERCE.products.data.length);

      const goalKeys = [
        ...Object.keys(RAW.COMMERCE.products.data[0]),
        "seller",
        "deliveryGroup",
        "categories",
        "additionalFees",
        "additionalFeeInfos",
      ];
      expect(Object.keys(result.data[0])).toEqual(goalKeys);
    });
  });

  describe("productSetDenomalizer()", () => {
    it("should get productSet", () => {
      const result = productSetDenomalizer(
        NORMALIZED.COMMERCE.productSets.result.data[0],
        MOCK_ENTITIES,
      );

      const goalKeys = [
        ...Object.keys(RAW.COMMERCE.productSets.data[0]),
        "products",
      ];

      expect(result).toHaveProperty("products");
      expect(result.products).toHaveLength(2);
      expect(Object.keys(result)).toEqual(goalKeys);
    });
  });

  describe("productSetListDenomalizer()", () => {
    it("should get productSet list", () => {
      const result = productSetListDenomalizer(
        NORMALIZED.COMMERCE.productSets.result,
        MOCK_ENTITIES,
      );

      expect(result).toHaveProperty("data");
      expect(result).toHaveProperty("paging");
      expect(result.data).toHaveLength(RAW.COMMERCE.productSets.data.length);
      const goalKeys = [
        ...Object.keys(RAW.COMMERCE.productSets.data[0]),
        "products",
      ];
      expect(Object.keys(result.data[0])).toEqual(goalKeys);
    });
  });

  describe("commerceCategoryDenomalizer()", () => {
    it("should get category", () => {
      const result = commerceCategoryDenomalizer(
        NORMALIZED.COMMERCE.categories.result.data[4],
        MOCK_ENTITIES,
      );

      expect(result).toEqual(RAW.COMMERCE.categories.data[4]);
    });
  });

  describe("commerceCategoryListDenomalizer()", () => {
    it("should get category list", () => {
      const result = commerceCategoryListDenomalizer(
        NORMALIZED.COMMERCE.categories.result,
        MOCK_ENTITIES,
      );
      expect(result).toEqual(RAW.COMMERCE.categories);
    });
  });

  describe("paymentListDenomalizer()", () => {
    it("should get payment list", () => {
      const result = purchaseListDenomalizer(
        NORMALIZED.COMMERCE.payments.result,
        MOCK_ENTITIES,
      );

      expect(result).toEqual({
        data: RAW.COMMERCE.payments.data.map(i => ({
          ...i,
          purchaseItems: i.purchaseItems.map(x => x),
        })),
        paging: RAW.COMMERCE.payments.paging,
      });
    });
  });

  describe("shippingAddressDenormalizer()", () => {
    it("should denormalize", () => {
      const result = shippingAddressDenormalizer(
        NORMALIZED.COMMERCE.shippingAddress.result,
        MOCK_ENTITIES,
      );
      expect(result).toEqual(RAW.COMMERCE.shippingAddress);
    });
  });

  describe("shippingAddressListDenormalizer()", () => {
    it("should denormalize", () => {
      const result = shippingAddressListDenormalizer(
        NORMALIZED.COMMERCE.shippingAddressList.result,
        MOCK_ENTITIES,
      );
      expect(result).toEqual(RAW.COMMERCE.shippingAddressList);
    });
  });
});
