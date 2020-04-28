const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post(
	'/login',
	[
		check('email', 'Invalid email').normalizeEmail().isEmail(),
		check('password', 'Invalid password').exists()
	],
	async (request, response) => {
		try {
			const error = validationResult(request)

			if (!error.isEmpty()) {
				response.status(400).json({
					errors: error.array(),
					message: 'Invalid input data'
				})
			}

			const {email, password} = request.body
			const user = await User.findOne({email})

			if (!user) {
				return response.status(400).json({
					message: 'User wan not found'
				})
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				return response.status(400).json({
					message: 'Password doesn\'t match'
				})
			}

			const token = jwt.sign(
				{userId: user._id},
				config.get('jwt'),
				{expiresIn: '1h'}
			)

			response.json({token, userId: user._id})

		} catch (e) {
			response.status(500).json({
				message: 'Server error. Please, try again later'
			})
		}
	}
)

router.post(
	'/register',
	[
		check('email', 'Invalid email').isEmail(),
		check('password', 'Invalid password. Min length 6 symbols').isLength({min: 6})
	],
	async (request, response) => {
		try {
			const error = validationResult(request)

			if (!error.isEmpty()) {
				response.status(400).json({
					errors: error.array(),
					message: 'Invalid input data'
				})
			}

			const {email, password} = request.body
			const candidate = await User.findOne({email})

			if (candidate) {
				return response.status(400).json({
					message: 'User with this email already exists'
				})
			}

			const hash = await bcrypt.hash(password, 12)
			const user = await new User({
				email,
				password: hash
			}).save();

			response.status(201).json({
				message: 'User was created'
			})
		} catch (e) {
			response.status(500).json({
				message: 'Server error. Please, try again later'
			})
		}
	}
)

module.exports = router
