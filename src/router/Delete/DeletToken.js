require('dotenv').config()
const client = require('../../config/dbconfig')
const uuid = require('uuid')

exports.deleteToken = (req, res) => {
    const { id } = req.params

    try {
        client.query('DELETE FROM revoked_token WHERE is_revoked = 0', [id],(error, result) => {
                if (result) {
                    res.send({
                        success: true,
                        data: 'data Barang Berhasil DISEPIR'
                    })
                } else {
                    console.log('error', error);

                    res.send({
                        success: false,
                        data: 'data Barang Gagal DiCOLONG'
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