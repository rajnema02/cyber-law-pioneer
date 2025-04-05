const Model = require('../Models/ServiceDetails.model')
const createError = require('http-errors')
const mongoose = require('mongoose')
const ModelName = 'Services'
const { upload } = require('../Helpers/helper_functions')

module.exports = {
    create : async (req, res, next) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(501).json({ error: err });
            }

            // Extract data from the request body
            const data = req.body;
            console.log(data);

            // Check if the entry with the same name already exists and is not inactive
            const dataExists = await Model.findOne({ name: data.name, is_inactive: false });
            if (dataExists) {
                throw createError.Conflict('Team member already exists');
            }

            // If no errors, proceed with the new data
            data.created_at = Date.now();
            data.created_by = req.user._id; // Assume the logged-in user is accessible via `req.user._id`

            // Create a new TeamDetails document
            const newData = new Model(data);

            // Save the new document to the database
            const result = await newData.save();

            // Return the newly created data as a response
            res.json(result);
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
    },
    list: async (req, res, next) => {
    try {
        const { name, post, disabled, is_inactive, page, limit, sort } = req.query;
        const _page = page ? parseInt(page) : 1;
        const _limit = limit ? parseInt(limit) : 200;
        const _skip = (_page - 1) * _limit;
        const query = {};

        if (name) {
            query.name = new RegExp(name, 'i'); // Case-insensitive regex for name
        }
        if (post) {
            query.post = new RegExp(post, 'i'); // Case-insensitive regex for post
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
    update: async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw createError.BadRequest('Invalid Parameters');
        }

        // Extract update data from request body
        const updateData = req.body;

        // Ensure the service exists
        const existingService = await Model.findById(id);
        if (!existingService) {
            throw createError.NotFound('Service not found');
        }

        // Update the fields
        updateData.updated_at = Date.now();
        updateData.updated_by = req.user._id; // Assuming the logged-in user's ID is available

        const updatedService = await Model.findByIdAndUpdate(id, updateData, { new: true });

        res.json(updatedService);
    } catch (error) {
        next(error);
    }
},
getById: async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid service ID format' });
        }

        const service = await Model.findById(id);
        if (!service || service.is_inactive) {
            return res.status(404).json({ error: 'Service not found or inactive' });
        }

        console.log("Requested service ID:", id);
        console.log("Service found:", service);

        res.json({ data: service }); // Return after logs
    } catch (error) {
        next(error);
    }
}

  


}