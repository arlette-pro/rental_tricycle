require('dotenv').config()
const jwt = require('jsonwebtoken')
module.exports.createJwtToken = (payload)  => {
    return jwt.sign(payload, process.env.SECRET_KEY, expiresIn= 1000*60*60*2)
}