const mongoose = require('mongoose');

const preContactsSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
     lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    message:{
        type:String,
    },
    otp:{
       type:Number 
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

const preContacts = mongoose.model('preContacts', preContactsSchema);

module.exports = preContacts;
