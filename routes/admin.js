var express = require('express');
var crypto = require('crypto')

var User = require('../model/user')
var Makanan = require('../model/makanan')
var Alamat = require('../model/alamat')
var Auth_middleware = require('../middlewares/auth')

var router = express.Router();
var secret = 'rahasia'
var session_store

/* GET users listing. */
router.get('/admin', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    User.find({}, function(err, user) {
        //console.log(user);
        res.render('admin/home', { session_store: session_store, users: user })
    }).select('username email firstname lastname users createdAt updatedAt')
});

/* GET users listing. */
router.get('/datamakanan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Makanan.find({}, function(err, makanan) {
        //console.log(buku);
        res.render('admin/buku/table', { session_store: session_store, makanans: makanan })
    }).select('_id kodemakanan namamakanan resep harga created_at')
});

/* GET users listing. */
router.get('/inputmakanan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
    res.render('admin/buku/input_data', { session_store: session_store})
});

//input data makanan
router.post('/inputmakanan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Makanan.find({ kodemakanan: req.body.kodemakanan }, function(err, makanan) {
        if (makanan.length == 0) {
            var datamakanan = new Makanan({
                kodemakanan: req.body.kodemakanan,
                namamakanan: req.body.namamakanan,
                resep: req.body.resep,
                harga: req.body.harga,
            })
            datamakanan.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/datamakanan')
                } else {
                    req.flash('msg_info', 'User telah berhasil dibuat')
                    res.redirect('/datamakanan')
                }
            })
        } else {
            req.flash('msg_error', 'Maaf, kode makanan sudah ada....')
            res.render('admin/buku/input_data', {
                session_store: session_store,
                kodemakanan: req.body.kodemakanan,
                nammakanan: req.body.namamakanan,
                resep: req.body.resep,
                harga: req.body.harga,
            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/editmakanan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Makanan.findOne({ _id: req.params.id }, function(err, makanan) {
        if (makanan) {
            console.log("bukus"+makanan);
            res.render('admin/buku/edit_data', { session_store: session_store, makanans: makanan })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/datamakanan')
        }
    })
})

router.post('/:id/editmakanan', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Makanan.findById(req.params.id, function(err, makanan) {
        makanan.kodemakanan = req.body.kodemakanan;
        makanan.namamkanan = req.body.namamakanan;
        makanan.resep = req.body.resep;
        makanan.harga = req.body.harga;

        makanan.save(function(err, user) {
            if (err) {
                req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
            } else {
                req.flash('msg_info', 'Edit data berhasil!');
            }

            res.redirect('/datamakanan');

        });
    });
})

router.post('/:id/deletes', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    Makanan.findById(req.params.id, function(err, makanan){
        Makanan.remove({_id:req.params.id}, function(err, makanan){
            if (err)
            {
                req.flash('msg_error', 'Maaf, sepertinya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data Makanan berhasil dihapus!');
            }
            res.redirect('/datamakanan');
        })
    })
})
router.get('/dataalamat', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Alamat.find({}, function(err, alamat) {
        //console.log(buku);
        res.render('admin/buku/tablesss', { session_store: session_store, alamats: alamat })
    }).select('_id kodealamat namarestoran alamat created_at')
});

/* GET users listing. */
router.get('/inputalamat', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session
    res.render('admin/buku/input_data1', { session_store: session_store})
});

//input data makanan
router.post('/inputalamat', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Alamat.find({ kodealamat: req.body.kodealamat }, function(err, alamat) {
        if (alamat.length == 0) {
            var dataalamat = new Alamat({
                kodealamat: req.body.kodealamat,
                namarestoran: req.body.namarestoran,
                alamat: req.body.alamat,
            })
            dataalamat.save(function(err) {
                if (err) {
                    console.log(err);
                    req.flash('msg_error', 'Maaf, nampaknya ada masalah di sistem kami')
                    res.redirect('/dataalamat')
                } else {
                    req.flash('msg_info', 'User telah berhasil dibuat')
                    res.redirect('/dataalamat')
                }
            })
        } else {
            req.flash('msg_error', 'Maaf, kode alamat sudah ada....')
            res.render('admin/buku/input_data1', {
                session_store: session_store,
                kodealamat: req.body.kodealamat,
                namarestoran: req.body.namarestoran,
                alamat: req.body.alamat,
            })
        }
    })
})

//menampilkan data berdasarkan id
router.get('/:id/editalamat', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Alamat.findOne({ _id: req.params.id }, function(err, alamat) {
        if (alamat) {
            console.log("bukus"+alamat);
            res.render('admin/buku/edit_data1', { session_store: session_store, alamats: alamat })
        } else {
            req.flash('msg_error', 'Maaf, Data tidak ditemukan')
            res.redirect('/dataalamat')
        }
    })
})

router.post('/:id/editalamat', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    session_store = req.session

    Alamat.findById(req.params.id, function(err, alamat) {
        alamat.kodealamat = req.body.kodealamat;
        alamat.namarestoran = req.body.namarestoran;
        alamat.alamat = req.body.alamat;

        alamat.save(function(err, user) {
            if (err) {
                req.flash('msg_error', 'Maaf, sepertinya ada masalah dengan sistem kami...');
            } else {
                req.flash('msg_info', 'Edit data berhasil!');
            }

            res.redirect('/dataalamat');

        });
    });
})

router.post('/:id/deletes', Auth_middleware.check_login, Auth_middleware.is_admin, function(req, res, next) {
    Alamat.findById(req.params.id, function(err, alamat){
        Alamat.remove({_id:req.params.id}, function(err, alamat){
            if (err)
            {
                req.flash('msg_error', 'Maaf, sepertinya user yang dimaksud sudah tidak ada. Dan kebetulan lagi ada masalah sama sistem kami :D');
            }
            else
            {
                req.flash('msg_info', 'Data Alamat berhasil dihapus!');
            }
            res.redirect('/dataalamat');
        })
    })
})
module.exports = router;