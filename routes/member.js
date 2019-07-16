var express = require('express');
var crypto = require('crypto');

var User = require('../model/user')
var Makanan = require('../model/makanan')
var Alamat = require('../model/alamat')
var Auth_middleware = require('../middlewares/auth')

var router = express.Router();
var secret = 'rahasia'
var session_store

/* GET users listing. */
router.get('/member', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    User.find({}, function(err, user) {
        console.log(user);
        res.render('admin/home', { session_store: session_store, users: user })
    })
});

/* GET users listing. */
router.get('/datamakananmember', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    Makanan.find({}, function(err, makanan) {
        console.log(makanan);
        res.render('admin/buku/table', { session_store: session_store, makanans: makanan })
    }).select('_id kodemakanan namamakanan resep harga created_at')
});
router.get('/dataalamatmember', Auth_middleware.check_login, Auth_middleware.is_member, function(req, res, next) {
    session_store = req.session

    Alamat.find({}, function(err, alamat) {
        console.log(alamat);
        res.render('admin/buku/tablesss', { session_store: session_store, alamats: alamat })
    }).select('_id kodealamat namarestoran alamat created_at')
});




module.exports = router;