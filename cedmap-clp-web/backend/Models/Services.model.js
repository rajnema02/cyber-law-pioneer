const mongoose = require('mongoose');

const ServiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image1: {
        type: String,
    },
     image2: {
        type: String,
    },
     image3: {
        type: String,
    },
     image4: {
        type: String,
    },
    file: {
        type: String,
    },
    description: {
        type: String,
    },
    disabled: {
        type: Boolean,
        default: false
    },
    is_inactive: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    updated_at: {
        type: Date
    },
    deleted_at: {
        type: Date
    },
    restored_at: {
        type: Date
    }
});

const Services = mongoose.model('Services', ServiesSchema);

module.exports = Services;
