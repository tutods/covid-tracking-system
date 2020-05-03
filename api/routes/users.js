// Express Package
const express = require('express');
const router = express.Router();

// User Model
const model = require('../models/User');

// Controllers
const { login, register } = require('../controllers/UserController');
const {
	getAll,
	getById,
	getOneAndUpdate,
	getOneAndDelete,
} = require('../controllers/GenericController')(model);

/**
 * @swagger
 * /api/users/:
 *  post:
 *    tags:
 *       ['Users']
 *    summary: Create a new User
 *    description: Use to create or register any user
 *    responses:
 *      '200':
 *        description: User created with success
 *        schema:
 *           $ref: '#/definitions/User'
 *      '500':
 *        description: There was an error creating the user
 *
 */
router.post('/', register);

/**
 * @swagger
 * /api/users/:
 *  get:
 *    tags:
 *       ['Users']
 *    summary: Get all users
 *    description: Use to get all users on database
 *    responses:
 *      '200':
 *        description: Return all users on database
 *        schema:
 *           $ref: '#/definitions/User'
 *      '500':
 *        description: Error in connection
 *
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    tags:
 *       ['Users']
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *    summary: Get one
 *    description: Get one user by id in parameter
 *    responses:
 *      '200':
 *        description: Return the user with id in parameters
 *        schema:
 *           $ref: '#/definitions/User'
 *      '500':
 *        description: Return error(s)
 *
 */
router.get('/:id', getById);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    tags:
 *       ['Users']
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *    summary: Get one user and update
 *    description: Get one user by id and update the fields in body
 *    responses:
 *      '200':
 *        description: Return the id of user
 *        schema:
 *           $ref: '#/definitions/User'
 *      '500':
 *        description: Return error(s)
 *
 */
router.put('/:id', getOneAndUpdate);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    tags:
 *       ['Users']
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *    summary: Get one user and delete
 *    description: Get one user by id and delete that user
 *    responses:
 *      '200':
 *        description: Return the id of user deleted
 *        schema:
 *           $ref: '#/definitions/User'
 *      '500':
 *        description: Return error(s)
 *
 */
router.delete('/:id', getOneAndDelete);

/**
 * @swagger
 * /api/users/login:
 *  post:
 *    tags:
 *       ['Users']
 *    summary: Login with data in request body
 *    description: Validated all data send by form, and (if login data is valid) create authentication token
 *    responses:
 *      '200':
 *        description: Return the token after validate all data
 *      '500':
 *        description: Return error(s)
 *
 */
router.post('/login', login);

module.exports = router;
