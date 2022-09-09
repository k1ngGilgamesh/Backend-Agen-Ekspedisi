require('dotenv').config()
const client = require('../../config/dbconfig')
const uuid = require('uuid')

exports.Register= (req, res) => {
    const id_pengguna = uuid.v4()
    const { username, password, email } = req.body

    try {
        client.query('INSERT into data_user (id_pengguna,  username, password, email) VALUES ($1,$2, $3, $4)',
            [id_pengguna,  username, password, email], (error, result) => {
                if (result) {
                    res.status(200).send({
                        success: true,
                        data: 'Registrasi berhasil'
                    })
                } else {
                    console.log('error', error);

                    res.status(500).send({
                        success: false,
                        data: 'Registrasi Gagal'
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