const Model = require('../Models/Project.model.js');
const createError = require('http-errors');
const mongoose = require('mongoose');
const { upload } = require('../Helpers/helper_functions');

module.exports = {
    create: async (req, res, next) => {
        try {
            // Upload multiple files (assuming upload function handles multiple files)
            upload(req, res, async (err) => {
                if (err) {
                    return res.status(501).json({ error: err });
                }

                // Extract data from the request body
                const data = req.body;
                console.log(data);

                // Check if an entry with the same name already exists and is not inactive
                // const dataExists = await Model.findOne({ name: data.name, is_inactive: false });
                // if (dataExists) {
                //     throw createError.Conflict('Service or offer already exists');
                // }

                // Populate additional fields
                data.created_at = Date.now();
                data.created_by = req.user._id; // Assume the logged-in user is accessible via `req.user._id`

                // Handle image and file
                // Assuming `image` and `file` are the form field names for the image and file inputs
                if (req.files) {
                    if (req.files.image) {
                        // Save image path to the data
                        data.image_url = req.files.image[0].path; // Adjust according to your file upload structure
                    }

                    if (req.files.file) {
                        // Save file path to the data
                        data.file_url = req.files.file[0].path; // Adjust according to your file upload structure
                    }
                }

                // Create a new ServicesOffers document
                const newData = new Model(data);

                // Save the document to the database
                const result = await newData.save();

                // Return the newly created document as a response
                res.json(result);
            });
        } catch (error) {
            next(error); // Pass the error to the error handling middleware
        }
    },

    list: async (req, res, next) => {
        try {
            const { name, disabled, is_inactive, page, limit, sort } = req.query;
            const _page = page ? parseInt(page) : 1;
            const _limit = limit ? parseInt(limit) : 200;
            const _skip = (_page - 1) * _limit;
            const query = {};

            if (name) {
                query.name = new RegExp(name, 'i'); // Case-insensitive regex for name
            }
             query.disabled = disabled == "true" ? true : false;
            
       
            query.is_inactive = is_inactive === 'true' ? true : false;

            const result = await Model.aggregate([
                {
                    $match: query
                },
                {
                    $skip: _skip
                },
                {
                    $limit: _limit
                },
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
            return;
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
};
