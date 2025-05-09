const Model = require('../Models/ServiceProject.model');
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

                const data = req.body;
                console.log(data);

                const dataExists = await Model.findOne({ name: data.name, is_inactive: false });
                // if (dataExists) {
                //     throw createError.Conflict('Service or offer already exists');
                // }

                data.created_at = Date.now();
                data.created_by = req.user._id;

                // Handle file uploads
                if (req.files) {
                    if (req.files.image1) data.image1 = req.files.image1[0].path;
                    if (req.files.image2) data.image2 = req.files.image2[0].path;
                    if (req.files.image3) data.image3 = req.files.image3[0].path;
                    if (req.files.image4) data.image4 = req.files.image4[0].path;
                    if (req.files.file) data.file = req.files.file[0].path;
                }

                const newData = new Model(data);
                const result = await newData.save();
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
                query.name = new RegExp(name, 'i');
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
    
            const result = await Model.findById(id).populate('serviceId');
    
            if (!result) {
                return res.status(404).json({ error: "service-Service not found" });
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
    
                // Handle file uploads
                if (req.files) {
                    if (req.files.image1) data.image1 = req.files.image1[0].path;
                    if (req.files.image2) data.image2 = req.files.image2[0].path;
                    if (req.files.image3) data.image3 = req.files.image3[0].path;
                    if (req.files.image4) data.image4 = req.files.image4[0].path;
                    if (req.files.file) data.file = req.files.file[0].path;
                }
    
                const result = await Model.findByIdAndUpdate(id, { $set: data }, { new: true });
                if (!result) {
                    return res.status(404).json({ error: "service not found" });
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