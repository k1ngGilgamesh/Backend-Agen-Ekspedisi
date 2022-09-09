require('dotenv').config()
const client = require('../../config/dbconfig')

exports.getDataAgen = (req, res) => {

    const { limit, page, nama_agen} = req.query
    const newPage = page === 1 ? 0 : (page - 1) * limit

    // let sql = ''
    // let parameter = []

    // if (nama_pegawai) {
    //     sql = ' SELECT * FROM data_pegawai WHERE nama_pegawai LIKE $1 limit $2 offset $3'
    //     parameter = [nama_pegawai, limit, newPage]
    // } else {
    //     sql = ' SELECT * FROM data_pegawai limit $1 offset $2'
    //     parameter = [limit, newPage]
    // }
    try {
        client.query('SELECT * FROM data_agen limit $1 offset $2 ',[limit, newPage], (error, result) => {
            if (result) {
                
                res.status(200).send({   
                    success: true,
                    data: result.rows
                })
            } else {
                console.log({error})
                res.status(500).send({
                    success: false,
                    data: error
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