const Model = require('../Models/Contact.model'); // Replace with correct path to your Contact model
const createError = require('http-errors');
const mongoose = require('mongoose');
const { upload } = require('../Helpers/helper_functions');
const { smsOTP } = require("../Helpers/smsCalls");
const preContactModel = require("../Models/preContact.model");

module.exports = {
  reg: async (req, res, next) => {
    const data = req.body;
    console.log(data);
    try {
      const dataExists = await Model.findOne({
        $or: [{ email: data.email }, { mobile: data.mobile }],
        is_inactive: false,
      }).lean();

      if (dataExists) {
        throw createError.Conflict('Contact already exists with email/mobile');
      }

      const otp = generateOTP();
      if (data.mobile) {
        console.log('OTP_SMS', otp);
        const smsResponse = await smsOTP(data.mobile, otp);
        console.log('OTP_SMS Response', smsResponse.data);
      }

      data.created_at = Date.now();
      data.otp = otp;

      const newData = new preContactModel(data);
      const result = await newData.save();
      res.json({_id: newData._id});
console.log("newdata",newData._id)
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    const data = req.body;
    console.log("data",data)
    try {
        // Fetch contact information using userId
        const contact = await preContactModel.findOne({ _id: mongoose.Types.ObjectId(data._id) });
        console.log("contact", contact);
        // Initialize new contact data object
        let newcontactData = {};

        // Check if contact was found
        if (contact) {
            if (data.otp === contact.otp) {
                newcontactData.firstName = contact.firstName;
                newcontactData.lastName = contact.lastName;
                newcontactData.email = contact.email;
                newcontactData.mobile = contact.mobile;
                newcontactData.message = contact.message;
            } else {
                return res.json({ success: false, message: 'Wrong OTP' });
            }
        } else {
            return res.json({ success: false, message: 'Contact not found' });
        }

        // Create new entry in the Model
        const newData = new Model(newcontactData);
        const result = await newData.save();

        // Send success response
        res.json({ success: true, data: newData });

    } catch (error) {
        // Handle errors and pass them to the next middleware
        next(error);
    }
},

  list: async (req, res, next) => {
    try {
      const { image, disabled, is_inactive, page, limit } = req.query;
      const _page = page ? parseInt(page) : 1;
      const _limit = limit ? parseInt(limit) : 200;
      const _skip = (_page - 1) * _limit;

      const query = {
        image: image ? new RegExp(image, 'i') : undefined,
        disabled: disabled === "true" ? true : false,
        is_inactive: is_inactive === 'true' ? true : false,
      };

      const result = await Model.aggregate([
        { $match: query },
        { $skip: _skip },
        { $limit: _limit },
      ]);

      const resultCount = await Model.countDocuments(query);

      res.json({
        data: result,
        meta: {
          current_page: _page,
          from: _skip + 1,
          last_page: Math.ceil(resultCount / _limit),
          per_page: _limit,
          to: _skip + result.length,
          total: resultCount,
        },
      });

    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw createError.BadRequest('Invalid Parameters');
      }
      const deleted_at = Date.now();
      const result = await Model.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: { is_inactive: true, disabled: true, deleted_at } });
      res.json(result);

    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw createError.BadRequest('Invalid Parameters');
      }
      const result = await Model.findById(id);
      if (!result) {
        throw createError.NotFound('Contact not found');
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw createError.BadRequest('Invalid Parameters');
      }
      const data = req.body;
      data.updated_at = Date.now();
      data.updated_by = req.user._id;
      const result = await Model.findByIdAndUpdate(id, { $set: data }, { new: true });
      if (!result) {
        throw createError.NotFound('Contact not found');
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
};

// Function to generate OTP
function generateOTP() {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
