require('dotenv').config()
const client = require('../../config/dbconfig')
const uuid = require('uuid')

exports.deleteDataAgen = (req, res) => {
    const { id } = req.params

    try {
        client.query('DELETE FROM data_agen WHERE id_agen = $1', [id],(error, result) => {
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