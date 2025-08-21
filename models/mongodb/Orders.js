import mongoose from 'mongoose';

const OrdersSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    items: [{
        _id: mongoose.Schema.Types.ObjectId,
        type: { type: String, enum: ['product', 'prompt'] },
        quantity: Number
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        default: 'pending',
    }

}, { timestamps: true, versionKey: false });

OrdersSchema.virtual('_items', {
});

OrdersSchema.set('toJSON', {
    virtuals: true,
});
export const Orders = mongoose.model('Orders', OrdersSchema);
