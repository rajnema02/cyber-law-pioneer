const Model = require('../Models/banner.model'); // Replace with the correct path to your Banner model
const createError = require('http-errors');
const mongoose = require('mongoose');
const { upload } = require('../Helpers/helper_functions'); // Replace with the correct path to your helper functions

module.exports = {
    create: async (req, res, next) => {
        try {
            upload(req, res, async (err) => {
                if (err) {
                    return res.status(501).json({ error: err });
                }

                const data = req.body;
                console.log(data);

                // Check if a banner with the same image already exists and is not inactive
                const dataExists = await Model.findOne({ image: data.image, is_inactive: false });
                if (dataExists) {
                    throw createError.Conflict('Banner already exists');
                }

                data.created_at = Date.now();
                data.created_by = req.user._id; // Assume `req.user._id` contains the logged-in user's ID

                // Create a new Banner document
                const newBanner = new Model(data);

                // Save the new document to the database
                const result = await newBanner.save();

                res.json(result);
            });
        } catch (error) {
            next(error); // Pass the error to the error handling middleware
        }
    },

    list: async (req, res, next) => {
        try {
            const { image, disabled, is_inactive, page, limit, sort } = req.query;
            const _page = page ? parseInt(page) : 1;
            const _limit = limit ? parseInt(limit) : 200;
            const _skip = (_page - 1) * _limit;
            const query = {};

            if (image) {
                query.image = new RegExp(image, 'i'); // Case-insensitive regex for image
            }
             query.disabled = disabled == "true" ? true : false;
            
       
            query.is_inactive = is_inactive === 'true' ? true : false;

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
                    total: resultCount
                }
            });
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { id } = req.params
            if (!id) {
                throw createError.BadRequest('Invalid Parameters')
            }
            const deleted_at = Date.now()
            const result = await Model.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: { is_inactive: true,disabled:true, deleted_at } })
            res.json(result)
            return
        } catch (error) {
            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw createError.BadRequest('Invalid Parameters');
            }

            const updateData = req.body;

            const existingBanner = await Model.findById(id);
            if (!existingBanner) {
                throw createError.NotFound('Banner not found');
            }

            updateData.updated_at = Date.now();
            updateData.updated_by = req.user._id;

            const updatedBanner = await Model.findByIdAndUpdate(id, updateData, { new: true });

            res.json(updatedBanner);
        } catch (error) {
            next(error);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid banner ID format' });
            }

            const banner = await Model.findById(id);
            if (!banner || banner.is_inactive) {
                return res.status(404).json({ error: 'Banner not found or inactive' });
            }

            res.json({ data: banner });
        } catch (error) {
            next(error);
        }
    }
};
