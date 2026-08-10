import type { InferSchemaType } from "mongoose";
import { Schema, model, models } from "mongoose";

export const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		currency: {
			type: String,
			required: true,
			trim: true,
			uppercase: true,
		},
		category: {
			type: String,
			required: true,
			trim: true,
		},
		image: {
			type: String,
			required: true,
			trim: true,
		},
		stock: {
			type: Number,
			required: true,
			min: 0,
		},
		rating: {
			type: Number,
			required: true,
			min: 0,
			max: 5,
		},
	},
	{
		timestamps: true,
	}
);

export type ProductSchema = InferSchemaType<typeof productSchema>;

export const ProductModel = models.Product || model("Product", productSchema);
