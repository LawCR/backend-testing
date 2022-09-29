/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        nombre:
 *          type: string
 *          description: Nombre del producto
 *        precio:
 *          type: number
 *          description: Precio del producto
 *        descripcion:
 *          type: string
 *          description: Descripcion del producto
 *        laboratorio:
 *          type: string
 *          description: Laboratorio del producto
 *        stock:
 *          type: number
 *          description: Stock del producto
 *        vencimiento:
 *          type: string
 *          description: Vencimiento del producto
 *        imagen:
 *          type: string
 *          description: Imagen del producto
 *        categoria:
 *          type: string
 *          description: Categoria del producto
 *      required:
 *        - nombre
 *        - precio
 *        - descripcion
 *        - laboratorio
 *        - stock
 *        - vencimiento
 *        - imagen
 *        - categoria
 */

const express = require('express');
const productSchema = require('../models/product');
const router = express.Router();

/**
 * @swagger
 * /api/products:
 *  post:
 *   summary: Create a new product
 *   tags: [Product]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Product'
 *   responses:
 *     200:
 *      description: The product was successfully created
 */
router.post('/', (req, res) => {
    const product = productSchema( req.body );
    product.save()
        .then(( data ) => res.json( data ))
        .catch(( error ) => res.json({ message: error }));
})

/**
 * @swagger
 * /api/products:
 *  get:
 *   summary: Return all products
 *   tags: [Product]
 *   parameters:
 *    - in: query
 *      name: search
 *   responses:
 *     200:
 *      description: Products founded
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Product'
 */
router.get('/', (req, res) => {
    const { search } = req.query
    const regex = new RegExp(search,'i')
    productSchema
        // .find()
        .find({
            $or: [{nombre: regex}, {categoria: regex}],
        })
        // .select('title images price inStock slug -_id')
        // .lean()
        .then(( data ) => res.json( data ))
        .catch(( error ) => res.json({ message: error }));
})

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *   summary: Return a product by id
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The product id
 *   responses:
 *     200:
 *      description: The product was successfully founded
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Product'
 *     404:
 *      description: The product was not found
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;
    productSchema
        .findById( id )
        .then(( data ) => res.json( data ))
        .catch(( error ) => res.json({ message: error }));
})

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *   summary: Update a product by id
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The product id
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/Product'
 *   responses:
 *     200:
 *      description: The product was successfully updated
 *     404:
 *      description: The product was not found
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *   summary: delete a product
 *   tags: [Product]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The product id
 *   responses:
 *     200:
 *      description: The product was successfully deleted
 *     404:
 *      description: The product was not found
 */
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    productSchema
        .remove({ _id : id })
        .then(( data ) => res.json( data ))
        .catch(( error ) => res.json({ message: error }));
})

module.exports = router;
