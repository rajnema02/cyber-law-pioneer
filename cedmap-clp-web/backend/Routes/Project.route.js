const router = require('express').Router()
const Controller = require('../Controllers/Project.controller')
const { verifyAccessToken } = require('../Helpers/jwt_helper')

router.post('/',verifyAccessToken,  Controller.create)

router.get('/', Controller.list)

router.delete('/:id', verifyAccessToken, Controller.delete)

module.exports = router
