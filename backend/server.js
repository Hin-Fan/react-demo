import Server from './src/server'
const port = 3001

const server = Server.listen(port, () => console.log(`Listening on port ${port}`))

/**
 * Attempt to gracefully stop the service and release all its resources
 * @param {String | Number} signal
 */
const gracefulShutdown = signal => {
  console.log(`Received signal ${signal}, closing port ${port}`)
  server.close()
  console.log('Terminated successfully')
}

/** close server upon SIGTERM */
process
  .on('SIGTERM', gracefulShutdown)
  .on('SIGINT', gracefulShutdown)
