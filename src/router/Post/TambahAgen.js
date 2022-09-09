require('dotenv').config()
const client = require('../../config/dbconfig')
const uuid = require('uuid')

exports.TambahAgen = (req, res) => {
    const id = uuid.v4()
    const { nama_agen, alamat_agen, nomor_agen} = req.body

    try {
        client.query('INSERT into data_agen (id_agen, nama_agen, alamat_agen, nomor_agen) VALUES ($1,$2, $3, $4,$5)',
            [id, nama_agen, alamat_agen, nomor_agen], (error, result) => {
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