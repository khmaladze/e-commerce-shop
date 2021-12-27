import express from 'express'
import endpoints from './endpoints'

// import endpoints from "./endpoints";

const app = express()
/** Parse the request */
app.use(express.urlencoded({ extended: false }))
/** Takes care of JSON data */
app.use(express.json())

/** RULES OF OUR API */
app.use((req, res, next) => {
	// set the CORS policy
	res.header('Access-Control-Allow-Origin', '*')
	// set the CORS headers
	res.header(
		'Access-Control-Allow-Headers',
		'origin, X-Requested-With,Content-Type,Accept, Authorization',
	)
	// set the CORS method headers
	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
	if (req.method === 'OPTIONS') {
		// res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST')
		res.status(200).json({})
		return
	}
	next()
})
app.use('/api/v1', endpoints)
// app.use('/api/v1/fds', (req, res, next) => {})

export default app
