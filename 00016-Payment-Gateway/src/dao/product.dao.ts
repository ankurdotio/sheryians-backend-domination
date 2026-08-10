import { ProductModel } from "../models/product.schema.js";
import type { CreateProductInput, StoredProduct } from "../types/product/product.types.js";




export async function getProductById(productId: string): Promise<StoredProduct | null> {

    const product = await  ProductModel.findById(productId)


    if(!product){
        return null;
    }

    return product
}