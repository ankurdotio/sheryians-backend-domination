import type { ProductSchema } from "../../models/product.schema.js";

export type StoredProduct = ProductSchema;

export type CreateProductInput = Omit<StoredProduct, "createdAt" | "updatedAt">;

export type ProductPatch = Partial<
    Omit<StoredProduct, "createdAt" | "updatedAt">
>;