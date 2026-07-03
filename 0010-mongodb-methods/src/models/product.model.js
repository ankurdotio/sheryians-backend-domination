import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    tags: [ {
        type: String
    } ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;