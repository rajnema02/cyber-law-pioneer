const mongoose = require('mongoose');

const ServiesProjectDescSchema = new mongoose.Schema({
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
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Services' // assuming your Partner model is named 'Partner'
    },
    serviceProjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServicesProject' // assuming your Partner model is named 'Partner'
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

const ServicesProjectDesc = mongoose.model('ServicesProjectDesc', ServiesProjectDescSchema);

module.exports = ServicesProjectDesc;
