const mongoose = require('mongoose');

const ServicesOffersCourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    file: {
        type: String,
    },
    googleFormLink: {
    type: String, // Store the link to Google Form
    validate: {
      validator: function(v) {
        return /^https:\/\/docs\.google\.com\/forms\/.+$/.test(v);
      },
      message: props => `${props.value} is not a valid Google Form link!`
    },
    required: false,
  },
    image:{
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
     service: {
        type: String,
    },
    program:{
        type: String,
    },
    youtubeLink: {
    type: String, // basic string field
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

const ServicesOffersCourse = mongoose.model('ServicesOffersCourse', ServicesOffersCourseSchema);

module.exports = ServicesOffersCourse;
