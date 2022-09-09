const client = require('../config/dbconfig')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')) {
        const jwt_token = req.headers['authorization'].substr(7)
        req.headers.auth_token = jwt_token
        client.query('SELECT * FROM revoked_token WHERE token = $1 AND is_revoked = 1',[jwt_token], (error, result) => {
            if (result){
                if (result?.rows.length > 0){
                    res.send({
                        success : false,
                        message : 'Session expired'
                    })
                } else {
                    try{
                        const user  = jwt.verify(jwt_token, process.env.APP_KEY)
                        req.auth = user
                        next()
                    } catch (e) {
                        res.status(400).send({
                            success: false,
                            message: e
                        })
                    }
                }
            } else {
                res.status(500).send({
                    success: false,
                    message: 'sad'
                })
            }
        }) 
    } else {
        res.status(500).send({
            success: false,
            message: 'AKSES NO NO BANG'
        })
    }
}

module.exports = { auth }