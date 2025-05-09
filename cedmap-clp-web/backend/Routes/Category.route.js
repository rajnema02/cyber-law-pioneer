const router = require('express').Router()
const Controller = require('../Controllers/Category.controller')
const { verifyAccessToken } = require('../Helpers/jwt_helper')

router.post('/', verifyAccessToken, Controller.create)

router.get('/count', verifyAccessToken, Controller.count)

router.get('/:id', verifyAccessToken, Controller.get)

router.get('/graph/all', verifyAccessToken, Controller.graph)

router.get('/', verifyAccessToken, Controller.list)

router.put('/:id', verifyAccessToken, Controller.update)

router.delete('/:id', verifyAccessToken, Controller.delete)

router.put('/:id/restore', verifyAccessToken, Controller.restore)

module.exports = router
