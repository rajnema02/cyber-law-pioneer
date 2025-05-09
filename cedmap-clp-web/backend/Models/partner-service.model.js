const mongoose = require('mongoose');

const PartnerServicePageSchema = new mongoose.Schema({
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
    youtubeVideoLink: {  // New field for YouTube video link
        type: String,
        validate: {
            validator: function(v) {
                // Simple validation for YouTube URL
                return /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(v);
            },
            message: props => `${props.value} is not a valid YouTube URL!`
        }
    },
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PartnerPage'
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

const PartnerServicePage = mongoose.model('PartnerServicePage', PartnerServicePageSchema);

module.exports = PartnerServicePage;