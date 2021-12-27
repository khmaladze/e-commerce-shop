import express from 'express'
import { getOpenApiSchemaRouter } from '../open-api-documentation'
import app from './app'
import config from './swagger.config'

app.use('/docs', express.static('demo/swagger-ui-static'))
app.use(getOpenApiSchemaRouter(app, config))
app.listen(8080, () => {
	console.log('server started')
})
