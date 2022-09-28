/*
route: /products
*/
const express = require('express');
const productSchema = require('../models/product');
const router = express.Router();

router.post('/', (req, res) => {
    const product = productSchema( req.body );
    product.save()
        .then(( data ) => res.json( data ))
        .catch(( error ) => res.json({ message: error }));
})

router.get('/', (req, res) => {
    productSchema
        .find()
        .then(( data ) => res.json( data ))
        .catch(( error ) => res.json({ message: error }));
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    productSchema
        .findById( id )
        .then(( data ) => res.json( data ))
        .catch(( error ) => res.json({ message: error }));
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre,
            precio,
            descripcion,
            laboratorio,
            stock,
            vencimiento,
            imagen,
            categoria } = req.body;
    productSchema
        .updateOne({ _id : id }, { $set: { nombre, precio, descripcion, laboratorio, stock, vencimiento, imagen, categoria }})
        .then(( data ) => res.json( data ))
        .catch(( error ) => res.json({ message: error }));
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    productSchema
        .remove({ _id : id })
        .then(( data ) => res.json( data ))
        .catch(( error ) => res.json({ message: error }));
})

module.exports = router;
