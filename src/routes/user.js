const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, updateUser, getUserById, deleteUser } = require('../controllers/user');


const router = Router();


/**
 * @swagger
 * /api/user:
 *  get:
 *   summary: Return all users
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

/**
 * @swagger
 * /api/user/{id}:
 *  put:
 *   summary: Update a user by id
 *   tags: [User]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The user id
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           $ref: '#/components/schemas/User'
 *   responses:
 *     200:
 *      description: The user was successfully updated
 *     404:
 *      description: The user was not found
 */
router.put('/:id',  updateUser);

/**
 * @swagger
 * /api/user/{id}:
 *  get:
 *   summary: Return a user by id
 *   tags: [User]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The user id
 *   responses:
 *     200:
 *      description: The user was successfully founded
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/User'
 *     404:
 *      description: The user was not found
 */
router.get('/:id',  getUserById);

/**
 * @swagger
 * /api/user/{id}:
 *  delete:
 *   summary: delete a user
 *   tags: [User]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The user id
 *   responses:
 *     200:
 *      description: The user was successfully deleted
 *     404:
 *      description: The user was not found
 */
router.delete('/:id',  deleteUser);



module.exports = router;
