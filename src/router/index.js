const router = require('express').Router()
const auth = require('../auth/middleware').auth

const getDataAgen = require('./Get/GetDataAgen').getDataAgen
const TambahAgen = require('./Post/TambahAgen').TambahAgen
const updateAgen = require('./Put/UpdateAgen').updateDataAgen
const deleteDataAgen = require('./Delete/deleteDataAgen').deleteDataAgen


const getDataBarang = require('./Get/GetDataBarang').getDataBarang
const insertDataBarang = require('./Post/InsertDataBarang').insertDataBarang
const updateDataBarang = require('./Put/UpdateDataBarang').updateDataBarang
const deleteDataBarang = require('./Delete/deleteDataBarang').deleteDataBarang


const login = require('./Post/Login').login
const Register = require('./Post/Register').Register
const Logout = require('./Put/Logout').logout

router.post('/post-login',login)
router.get('/put-logout',Logout)
router.post('/post-register',Register)

router.get('/get-data-barang',auth,getDataBarang)
router.post('/insert-data-barang', insertDataBarang)
router.put('/update-data-barang/:id', updateDataBarang)
router.delete('/delete-data-barang/:id', deleteDataBarang)

router.get('/get-data-agen',getDataAgen)
router.post('/tambah-agen', TambahAgen)
router.put('/update-data-agen/:id', updateAgen)
router.delete('/delete-data-agen/:id', deleteDataAgen)

module.exports = router;
