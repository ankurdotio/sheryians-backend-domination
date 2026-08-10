import type { InferSchemaType, Types } from "mongoose";
import { Schema, model } from "mongoose";

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

export type ProductSchema = InferSchemaType<typeof productSchema> & {
    _id: Types.ObjectId; // Include the _id field in the ProductSchema type
};

export const ProductModel = model("Product", productSchema);
