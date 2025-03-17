const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        index: true,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    images: [String],
    ratings: {
        average: {
            type: Number,
            min: 1,
            max: 5
        },
        count: {
            type: Number,
            default: 0
        }
    }
}, { timestamps: true });

module.exports=mongoose.model('Product',ProductSchema);