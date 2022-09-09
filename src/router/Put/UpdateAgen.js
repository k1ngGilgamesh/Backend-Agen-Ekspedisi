require('dotenv').config()
const client = require('../../config/dbconfig')
const uuid = require('uuid')

exports.updateDataAgen = (req, res) => {
    const { id } = req.params
    const { nama_agen, alamat_agen, nomor_agen } = req.body

    try {
        client.query('UPDATE data_barang SET nama_agen =$2, alamat_agen =$3, nomor_agen = $4 WHERE id_agen= $1',
            [id, nama_agen, alamat_agen, nomor_agen], (error, result) => {
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