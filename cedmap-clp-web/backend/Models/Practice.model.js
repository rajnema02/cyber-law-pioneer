const mongoose = require('mongoose');

const PracticePageSchema = new mongoose.Schema({
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
     service: {
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

const PracticePage = mongoose.model('PracticePage', PracticePageSchema);

module.exports = PracticePage;
