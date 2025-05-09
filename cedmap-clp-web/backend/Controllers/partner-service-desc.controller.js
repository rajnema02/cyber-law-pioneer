const Model = require('../Models/partner-service-desc.model');
const PartnerServiceModel = require('../Models/partner-service.model'); // Add this import
const createError = require('http-errors');
const mongoose = require('mongoose');
const { upload } = require('../Helpers/helper_functions');

module.exports = {
    create: async (req, res, next) => {
        try {
            upload(req, res, async (err) => {
                if (err) {
                    return res.status(501).json({ error: err });
                }

                // Extract data from the request body
                const data = req.body;

                // Validate that the partner service belongs to the selected partner
                const partnerService = await PartnerServiceModel.findById(data.partnerServiceId);
                if (!partnerService || partnerService.partnerId.toString() !== data.partnerId.toString()) {
                    return res.status(400).json({
                        error: "Invalid partner service selection",
                        message: "The selected service doesn't belong to the chosen partner"
                    });
                }
                // Check if an entry with the same name already exists and is not inactive
                const dataExists = await Model.findOne({ 
                    name: data.name, 
                    is_inactive: false,
                    partnerId: data.partnerId,
                    partnerServiceId: data.partnerServiceId
                });
                if (dataExists) {
                    throw createError.Conflict('Service description for this partner and service already exists');
                }

                // Populate additional fields
                data.created_at = Date.now();
                data.created_by = req.user._id;

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

                // Create a new document
                const newData = new Model(data);

                // Save the document to the database
                const result = await newData.save();

                // Return the newly created document as a response
                res.json(result);
            });
        } catch (error) {
            next(error);
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
            
            // Validate ID format
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ 
                    success: false,
                    error: "Invalid ID format",
                    message: "The provided ID is not a valid MongoDB ObjectID"
                });
            }
    
            // Find document with proper population
            const result = await Model.findOne({
                _id: id,
                is_inactive: false,
                disabled: false
            })
            .populate({
                path: 'partnerId',
                select: 'name image description',
                match: { is_inactive: false, disabled: false }
            })
            .populate({
                path: 'partnerServiceId',
                select: 'name description images',
                match: { is_inactive: false, disabled: false }
            })
            .lean()
            .exec();
    
            if (!result) {
                return res.status(404).json({ 
                    success: false,
                    error: "Partner-Service Description not found",
                    message: "Either the ID doesn't exist or the record is inactive"
                });
            }
    
            // Check if populated references exist
            if (!result.partnerId || !result.partnerServiceId) {
                return res.status(404).json({ 
                    success: false,
                    error: "Associated partner or service not found",
                    message: "The related partner or service might be inactive or deleted"
                });
            }
    
            // Transform file paths
            const transformFilePaths = (obj) => {
                const transformed = { ...obj };
                const fileFields = ['image', 'file', 'image1', 'image2', 'image3'];
                
                fileFields.forEach(field => {
                    if (transformed[field]) {
                        transformed[`${field}_url`] = 
                            transformed[field].replace(/\\/g, '/');
                    }
                });
                
                return transformed;
            };
    
            const transformedResult = transformFilePaths(result);
    
            res.json({ 
                success: true, 
                data: transformedResult 
            });
    
        } catch (error) {
            console.error("Error in getById:", error);
            res.status(500).json({ 
                success: false,
                error: "Internal Server Error",
                message: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
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
                data.updated_by = req.user ? req.user._id : null; // Ensure user ID is set properly
    
                // Handle file uploads
                if (req.files) {
                    if (req.files.image) {
                        data.image_url = req.files.image[0].path;
                    }
                    if (req.files.file) {
                        data.file_url = req.files.file[0].path;
                    }
                }
    
                const result = await Model.findByIdAndUpdate(id, { $set: data }, { new: true });
                if (!result) {
                    return res.status(404).json({ error: "Partner not found" });
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