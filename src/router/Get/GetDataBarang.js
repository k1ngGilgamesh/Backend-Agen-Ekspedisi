require('dotenv').config()
const client = require('../../config/dbconfig')

exports.getDataBarang = (req, res) => {

    const { limit, page, nama_barang} = req.query
    const newPage = page === 1 ? 0 : (page - 1) * limit

    let sql = ''
    let parameter = []

    if (nama_barang) {
        sql = ' SELECT * FROM data_barang WHERE nama_barang LIKE $1 limit $2 offset $3'
        parameter = [nama_barang, limit, newPage]
    } else {
        sql = ' SELECT * FROM data_barang limit $1 offset $2'
        parameter = [limit, newPage]
    }
    try {
        client.query(sql,parameter, (error, result) => {
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