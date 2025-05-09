const mongoose = require('mongoose');

const ServiesProjectSchema = new mongoose.Schema({
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
    youtube_link: {  // New field for YouTube URL
        type: String,
        validate: {
            validator: function(v) {
                // Simple URL validation, can be enhanced
                return /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(v);
            },
            message: props => `${props.value} is not a valid YouTube URL!`
        }
    },
    description: {
        type: String,
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Services'
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

const ServicesProject = mongoose.model('ServicesProject', ServiesProjectSchema);

module.exports = ServicesProject;