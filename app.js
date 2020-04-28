const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path  = require('path')
const app = express();

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth-routes'))
app.use('/api/link', require('./routes/link-routes'))
app.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production'){
	app.use('/', express.static(path.json(__dirname, 'client', 'build')))

	app.get('*', (request, response) =>{
		response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = config.get('port') || 5000

async function start() {
	try {
		await mongoose.connect(config.get('mongoURI'), {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		app.listen(PORT, () => {
			console.log(`Started on port ${PORT}...`)
		})
	} catch (e) {
		console.log('Server error', e.message)
		process.exit(0)
	}
}

start()
