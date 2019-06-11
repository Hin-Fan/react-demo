import bodyParser from 'body-parser'
import express from 'express'
import { router } from './lib/router'
const defaultPort = 80

export const app = express()
app.use(bodyParser.json())
app.use(router)

/**
 * Starts an express server using the given port (default 80)
 * @param {Object} p
 * @param {Number} p.port port to use
 * @returns {import('http').Server}
 */
export const start = ({ port = defaultPort }) => app.listen(port, () => console.log('Listening on port', port))
export default { app, start }
