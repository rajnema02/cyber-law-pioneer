const Model = require('../Models/partner-service.model');
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
                const dataExists = await Model.findOne({ name: data.name, is_inactive: false });
                if (dataExists) {
                    throw createError.Conflict('Service or offer already exists');
                }

                // Validate YouTube URL if provided
                if (data.youtubeVideoLink) {
                    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
                    if (!youtubeRegex.test(data.youtubeVideoLink)) {
                        throw createError.BadRequest('Invalid YouTube URL format');
                    }
                }

                // Populate additional fields
                data.created_at = Date.now();
                data.created_by = req.user._id; // Assume the logged-in user is accessible via `req.user._id`

                // Handle image and file
                if (req.files) {
                    if (req.files.image) {
                        data.image = req.files.image[0].path;
                    }
                    if (req.files.image1) {
                        data.image1 = req.files.image1[0].path;
                    }
                    if (req.files.image2) {
                        data.image2 = req.files.image2[0].path;
                    }
                    if (req.files.image3) {
                        data.image3 = req.files.image3[0].path;
                    }
                    if (req.files.file) {
                        data.file = req.files.file[0].path;
                    }
                }

                // Create a new PartnerServicePage document
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

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
    
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: "Invalid ID provided" });
            }
    
            // Populate the associated partner details
            const result = await Model.findById(id).populate('partnerId');
    
            if (!result) {
                return res.status(404).json({ error: "Partner-Service not found" });
            }
    
            res.json({ success: true, data: result });
        } catch (error) {
            console.error("Error in getById:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    update: async (req, res, next) => {
        try {
            upload(req, res, async (err) => {
                if (err) {
                    return res.status(501).json({ error: err });
                }
                const { id } = req.params;
                if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                    return res.status(400).json({ error: "Invalid ID provided" });
                }
    
                const data = req.body;
                data.updated_at = Date.now();
                data.updated_by = req.user ? req.user._id : null;
    
                // Validate YouTube URL if provided
                if (data.youtubeVideoLink) {
                    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
                    if (!youtubeRegex.test(data.youtubeVideoLink)) {
                        return res.status(400).json({ error: "Invalid YouTube URL format" });
                    }
                }
    
                // Handle file uploads
                if (req.files) {
                    if (req.files.image) {
                        data.image = req.files.image[0].path;
                    }
                    if (req.files.image1) {
                        data.image1 = req.files.image1[0].path;
                    }
                    if (req.files.image2) {
                        data.image2 = req.files.image2[0].path;
                    }
                    if (req.files.image3) {
                        data.image3 = req.files.image3[0].path;
                    }
                    if (req.files.file) {
                        data.file = req.files.file[0].path;
                    }
                }
    
                const result = await Model.findByIdAndUpdate(
                    id, 
                    { $set: data }, 
                    { new: true, runValidators: true } // Ensure validators run on update
                );
                
                if (!result) {
                    return res.status(404).json({ error: "Partner Service not found" });
                }
    
                res.json({ success: true, data: result });
            });
        } catch (error) {
            console.error("Error in update:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw createError.BadRequest('Invalid Parameters');
            }
            const deleted_at = Date.now();
            const result = await Model.updateOne(
                { _id: mongoose.Types.ObjectId(id) },
                { $set: { is_inactive: true, disabled: true, deleted_at } }
            );
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
};