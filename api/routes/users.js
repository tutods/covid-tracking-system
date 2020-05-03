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

router.get('/:id', getById);

router.put('/:id', getOneAndUpdate);

router.delete('/:id', getOneAndDelete);

router.post('/login', login);

module.exports = router;
