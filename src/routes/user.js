const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet } = require('../controllers/user');


const router = Router();


/**
 * @swagger
 * /api/user:
 *  get:
 *   summary: Return all products
 *   tags: [User]
 *   parameters:
 *    - in: query
 *      name: limite
 *    - in: query
 *      name: desde
 *   responses:
 *     200:
 *      description: Users founded
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/User'
 */
router.get('/',  usuariosGet);



module.exports = router;
