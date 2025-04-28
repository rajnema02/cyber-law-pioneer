const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ServicesOffersCourses.controller');
const { verifyAccessToken } = require('../Helpers/jwt_helper'); // Assuming you have JWT auth

// Create a new course
router.post('/', verifyAccessToken, controller.create);

// Get list of courses with pagination and filtering
router.get('/', controller.list);

// Get single course by ID
router.get('/:id', controller.getById);

// Update a course
router.patch('/:id', verifyAccessToken, controller.update);

// Delete a course (soft delete)
router.delete('/:id', verifyAccessToken, controller.delete);

// Restore a deleted course
router.post('/:id/restore', verifyAccessToken, controller.restore);

module.exports = router;