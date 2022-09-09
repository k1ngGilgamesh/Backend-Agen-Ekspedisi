require('dotenv').config()
const client = require('../../config/dbconfig')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const moment = require('moment')

exports.login= (req, res) => {
    const { email,password } = req.body

    try {
        client.query('SELECT * FROM data_user WHERE email = $1',[email], (error, result) => {
                if (result?.rows.length > 0) {
                    const id = result.rows[0].id_pengguna
                    const username = result.rows[0].username

                    if (password === result.rows[0].password){
                        const token = jwt.sign({id, username, email} ,process.env.APP_KEY)
                        const revoked = 0
                        const id_token = uuid.v4()
                        const body = [id_token, token, revoked]
                        // const date = moment().format()

                        client.query('INSERT into revoked_token (id_token,token,is_revoked) VALUES($1, $2, $3)',body, (error1, result1) => {
                            if(result1){
                                res.status(200).send({
                                    success: true,
                                    message: "LOGIN BANG GOOD JOB",
                                    data: token
                                })
                            } else {
                                console.log({error1})
                                res.status(500).send({
                                    success: false,
                                    message: error1
                                })
                            }
                        })
                    } else {
                        res.status(500).send({
                            success: false,
                            data: 'passsnya palsu kek dia'
                        })
                    }
                } else {
                    res.status(500).send({
                        success: false,
                        data: 'data no no'
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