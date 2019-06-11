import Server from './src/server'
const port = 3000

const server = Server.start({ port })

const gracefulShutdown = signal => {
  console.log(`Received signal ${signal}, closing port ${port}`)
  server.close()
  console.log('Terminated successfully')
}

/** close server upon SIGTERM */
process
  .on('SIGTERM', gracefulShutdown)
  .on('SIGINT', gracefulShutdown)
