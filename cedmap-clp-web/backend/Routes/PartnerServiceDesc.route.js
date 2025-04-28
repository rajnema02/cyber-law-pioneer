const router = require('express').Router()
const Controller = require('../Controllers/partner-service-desc.controller')
const { verifyAccessToken } = require('../Helpers/jwt_helper')

router.post('/',verifyAccessToken,  Controller.create);

router.get('/', Controller.list);

// GET service by ID (should come before routes like /:id)
router.get('/:id', Controller.getById);

// UPDATE service by ID
router.put('/:id', verifyAccessToken, Controller.update);

// DELETE (soft delete) service by ID
router.delete('/:id', verifyAccessToken, Controller.delete);

module.exports = router
