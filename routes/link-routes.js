const {Router} = require('express')
const router = Router()
const auth = require('../middleware/auth.middleware')
const Link = require('../models/Link')
const config = require('config')
const shortID = require('shortid')

router.post('/generate', auth, async (request, response) => {
	try {
		const baseUrl = config.get('baseURL')
		const {from} = request.body
		const code = shortID.generate()

		const exists = await Link.findOne({from})

		if (exists) {
			return response.json({
				link: exists
			})
		}

		const to = baseUrl + '/t/' + code

		const link = await new Link({
			code, to, from, owner: request.user.userId
		}).save()

		response.status(201).json({link})
	} catch (e) {
		response.status(500).json({
			message: 'Server error. Please, try again later'
		})
	}
})

router.get('/', auth, async (request, response) => {
	try {
		const links = await Link.find({owner: request.user.userId})
		response.json(links)
	} catch (e) {
		response.status(500).json({
			message: 'Server error. Please, try again later'
		})
	}
})

router.get('/:id', auth, async (request, response) => {
	try {
		const link = await Link.findById(request.params.id)
		response.json(link)
	} catch (e) {
		response.status(500).json({
			message: 'Server error. Please, try again later'
		})
	}
})

module.exports = router

