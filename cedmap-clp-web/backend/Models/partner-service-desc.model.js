const mongoose = require('mongoose');

const PartnerServiceDescPageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    file: {
        type: String,
    },
    image: {
        type: String,
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
    description: {
        type: String,
    },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'PartnerPage' },

    partnerServiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'PartnerServicePage' },

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

const PartnerServiceDescPage = mongoose.model('PartnerServicedescPage', PartnerServiceDescPageSchema);

module.exports = PartnerServiceDescPage;
