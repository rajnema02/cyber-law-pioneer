const Model = require('../Models/servicesOffersCourses.model');
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
                
                // Check if course with same name already exists and is active
                const courseExists = await Model.findOne({ 
                    name: data.name, 
                    is_inactive: false 
                });
                
                if (courseExists) {
                    throw createError.Conflict('Course with this name already exists');
                }

                // Handle file uploads
                if (req.files) {
                    if (req.files.image) data.image = req.files.image[0].path;
                    if (req.files.image1) data.image1 = req.files.image1[0].path;
                    if (req.files.image2) data.image2 = req.files.image2[0].path;
                    if (req.files.image3) data.image3 = req.files.image3[0].path;
                    if (req.files.file) data.file = req.files.file[0].path;
                }

                data.created_at = Date.now();
                data.created_by = req.user._id;

                const newCourse = new Model(data);
                const result = await newCourse.save();
                res.status(201).json(result);
            });
        } catch (error) {
            next(error);
        }
    },

    list: async (req, res, next) => {
        try {
            const { name, service, program, disabled, is_inactive, page, limit } = req.query;
            const _page = page ? parseInt(page) : 1;
            const _limit = limit ? parseInt(limit) : 20;
            const _skip = (_page - 1) * _limit;
            
            const query = {};
            
            if (name) query.name = new RegExp(name, 'i');
            if (service) query.service = new RegExp(service, 'i');
            if (program) query.program = new RegExp(program, 'i');
            
            if (disabled !== undefined) query.disabled = disabled === "true";
            if (is_inactive !== undefined) query.is_inactive = is_inactive === "true";

            const result = await Model.find(query)
                .skip(_skip)
                .limit(_limit)
                .sort({ created_at: -1 });

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

    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw createError.BadRequest('Invalid course ID');
            }

            const course = await Model.findById(id);
            if (!course || course.is_inactive) {
                throw createError.NotFound('Course not found or inactive');
            }

            res.json({ data: course });
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw createError.BadRequest('Invalid course ID');
            }

            upload(req, res, async (err) => {
                if (err) {
                    return res.status(501).json({ error: err });
                }

                const updateData = req.body;
                const existingCourse = await Model.findById(id);
                
                if (!existingCourse) {
                    throw createError.NotFound('Course not found');
                }

                // Handle file uploads
                if (req.files) {
                    if (req.files.image) updateData.image = req.files.image[0].path;
                    if (req.files.image1) updateData.image1 = req.files.image1[0].path;
                    if (req.files.image2) updateData.image2 = req.files.image2[0].path;
                    if (req.files.image3) updateData.image3 = req.files.image3[0].path;
                    if (req.files.file) updateData.file = req.files.file[0].path;
                }

                updateData.updated_at = Date.now();
                updateData.updated_by = req.user._id;

                const updatedCourse = await Model.findByIdAndUpdate(
                    id, 
                    updateData, 
                    { new: true }
                );

                res.json(updatedCourse);
            });
        } catch (error) {
            next(error);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw createError.BadRequest('Invalid course ID');
            }

            const deleted_at = Date.now();
            const result = await Model.findByIdAndUpdate(
                id, 
                { 
                    is_inactive: true,
                    disabled: true, 
                    deleted_at 
                },
                { new: true }
            );

            res.json(result);
        } catch (error) {
            next(error);
        }
    },

    restore: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw createError.BadRequest('Invalid course ID');
            }

            const restored_at = Date.now();
            const result = await Model.findByIdAndUpdate(
                id, 
                { 
                    is_inactive: false,
                    disabled: false,
                    restored_at,
                    deleted_at: null
                },
                { new: true }
            );

            res.json(result);
        } catch (error) {
            next(error);
        }
    }
};