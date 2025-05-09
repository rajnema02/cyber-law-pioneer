const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const User = require('../Models/User.model')
const mongoose = require('mongoose')

// const permissionUrls = [];

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secret = process.env.ACCESS_TOKEN_SECRET
      const options = {
        expiresIn: '30d',
        issuer: process.env.DOMAIN,
        audience: userId,
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(createError.InternalServerError())
          return
        }
        resolve(token)
      })
    })
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers.authorization && !req.headers.token){
      console.log('no token found called', req);
      return next(createError.Unauthorized())
    } 
    let token = '';
    if(req.headers.token){
       token = req.headers.token;
    }else{

      const authHeader = req.headers.authorization
      const bearerToken = authHeader.split(' ')
     token = bearerToken[1]
    }
    // const token = req.headers.token;
    if (!token) {
      createError.Unauthorized('Unauthorized')
    }
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
      if (err) {
        const message =
          err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
        return next(createError.Unauthorized(message))
      }
      const user = await User.findOne({ _id: mongoose.Types.ObjectId(payload.aud) })
      req.user = user
      req.payload = payload
      next()
    })
  },
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secret = process.env.REFRESH_TOKEN_SECRET
      const options = {
        expiresIn: '1y',
        issuer: process.env.DOMAIN,
        audience: userId,
      }
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(createError.InternalServerError())
        }

        resolve(token)
      })
    })
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(createError.Unauthorized())
          const userId = payload.aud
          resolve(userId)
        }
      )
    })
  },
}
