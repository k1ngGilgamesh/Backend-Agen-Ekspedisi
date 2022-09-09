require('dotenv').config()
const client = require('../../config/dbconfig')
const uuid = require('uuid')

exports.updateDataBarang = (req, res) => {
    const { id } = req.params
    const { nama_barang, kota_asal, kota_tujuan, harga } = req.body

    try {
        client.query('UPDATE data_barang SET nama_barang =$2, kota_asal =$3,kota_tujuan =$4, harga = $5 WHERE id_barang= $1',
            [id, nama_barang, kota_asal, kota_tujuan, harga], (error, result) => {
                if (result) {
                    res.send({
                        success: true,
                        data: 'Data Berhasil Diedit'
                    })
                } else {
                    console.log('error', error);

                    res.send({
                        success: false,
                        data: 'Data Gagal Diedit'
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