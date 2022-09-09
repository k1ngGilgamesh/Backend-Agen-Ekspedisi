require('dotenv').config()
const client = require('../../config/dbconfig')
const uuid = require('uuid')

exports.insertDataBarang = (req, res) => {
    const id = uuid.v4()
    const { nama_barang, kota_asal, kota_tujuan, harga } = req.body

    try {
        client.query('INSERT into data_barang (id_barang, nama_barang, kota_asal, kota_tujuan, harga) VALUES ($1,$2, $3, $4,$5)',
            [id, nama_barang, kota_asal, kota_tujuan, harga], (error, result) => {
                if (result) {
                    res.status(200).send({
                        success: true,
                        data: 'Data Berhasil Ditambahkan'
                    })
                } else {
                    console.log('error', error);

                    res.status(500).send({
                        success: false,
                        data: 'Data Gagal Ditambahkan'
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