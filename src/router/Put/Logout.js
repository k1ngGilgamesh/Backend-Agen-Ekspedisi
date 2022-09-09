require('dotenv').config()
const client = require('../../config/dbconfig')
const jwt = require('jsonwebtoken')


exports.logout= (req, res) => {
    const token = req.headers['authorization'].slice(7)
    try {
        client.query('UPDATE revoked_token SET is_revoked = 1 WHERE token = $1',[token], (error, result) => { 
            if (result) {
                console.log({token})
                res.status(200).send({
                    success: true,
                    data: 'Logout Berhasil'
                })
            } else {
                console.log('error', error);

                res.status(500).send({
                    success: false,
                    data: 'Logout Gagal' 
                })
            }
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            data: err
        })
    }
}