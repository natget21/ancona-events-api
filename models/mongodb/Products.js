import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema({
    title: {
        En: { type: String, required: true },
        It: { type: String, required: true }
    },
    description: {
        En: { type: String, required: true },
        It: { type: String, required: true }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

ProductsSchema.set('toJSON', {
    versionKey: false
});

export const Products = mongoose.model('Products', ProductsSchema);
