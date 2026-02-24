const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    amazonLink: { type: String, default: '' },
    flipkartLink: { type: String, default: '' },
    healthkartLink: { type: String, default: '' },
    category: { type: String, required: true },
    lastUpdated: { type: String, required: true },
    clicks: { type: Number, default: 0 }
}, {
    timestamps: true
});

// Adjust output to match frontend expectations
productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Product', productSchema);
