const router = require('express').Router();
const Controller = require('../Controllers/ServiceDetails.controller');
const { verifyAccessToken } = require('../Helpers/jwt_helper');

// CREATE service
router.post('/', verifyAccessToken, Controller.create);

// LIST all services
router.get('/', Controller.list);

// GET service by ID (should come before routes like /:id)
router.get('/:id', Controller.getById);

// UPDATE service by ID
router.put('/:id', verifyAccessToken, Controller.update);

// DELETE (soft delete) service by ID
router.delete('/:id', verifyAccessToken, Controller.delete);

module.exports = router;