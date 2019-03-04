const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
const Producto = require('../models/producto');
const _ = require('underscore');
let app = express();

app.get('/producto', verificaToken, (req, res) => {
    let desde = Number(req.query.desde || 0);
    let limit = Number(req.query.limite || 5);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limit)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productosDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            Producto.countDocuments({ disponible: true }, (err, cantidad) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                };

                res.json({
                    ok: true,
                    productos: productosDB,
                    cantidad
                })

            })



        });
})

app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!productoDB) {
                return res.json({
                    ok: false,
                    err: {
                        message: 'Producto no encontrado'
                    }
                })
            }

            res.json({
                ok: true,
                producto: productoDB
            })

        });
})

app.get('/producto/buscar/:palabra', verificaToken, (req, res) => {
    let palabra = req.params.palabra;
    let regex = new RegExp(palabra, 'i');
    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (productoDB.length == 0) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Producto no encontrado'
                    }
                })
            }

            res.json({
                ok: true,
                producto: productoDB
            })

        });
})

app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;
    let id_user = req.usuario._id

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: id_user
    })

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'error al guardar'
                }
            })
        }

        res.status(201).json({
            ok: true,
            producto: productoDB
        })

    })

})

app.put('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion'])
    Producto.findByIdAndUpdate(id, body, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            producto: productoDB
        })

    })
})

app.delete('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            producto: productoDB
        })
    });

})






module.exports = app;