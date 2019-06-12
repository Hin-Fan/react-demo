import wtf from 'wtfnode'
import Backend from 'backend'
import next from 'next'
import { createServer } from 'http'
import { parse } from 'url'

const frontenePort = 3000
const backendPort = 3001
const servers = Object.create(null)
const main = async () => {
  try {
    console.log('Preparing backend ...')
    let deferredResolve
    const backendReady = new Promise(resolve => { deferredResolve = resolve })
    servers.backend = Backend.listen(backendPort, deferredResolve)
    await backendReady
    console.log(`Backend listensing on port ${backendPort}`)

    console.log('Preparing frontend ...')
    const app = next({ dev: true, dir: './frontend' })
    const handle = app.getRequestHandler()
    await app.prepare()
    servers.frontend = createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)
    }).listen(frontenePort, err => {
      if (err) throw err
      console.log(`Frontend ready on http://localhost:${frontenePort}`)
    })

    /*
     * Attempt to gracefully stop the service and release all its resources
     * @param {String | Number} signal
     */
    const gracefulShutdown = async signal => {
      console.log(`Received signal ${signal}, closing port ${backendPort}`)
      const pendingTasks = Object.keys(servers)
        .map(name => new Promise(resolve => servers[name].close(() => {
          console.log(`${name} closed`)
          delete servers[name]
          resolve(0)
        })))

      const shutdownTimedout = new Promise(resolve => setTimeout(() => {
        console.error(`One or more resources can not be shutdown gracefully`, JSON.stringify(Object.keys(servers)))
        wtf.dump()
        resolve(1)
      }, 2000))
      process.exit(await Promise.race([Promise.all(pendingTasks), shutdownTimedout]))
    }

    /** close server upon SIGTERM */
    process
      .on('SIGTERM', gracefulShutdown)
      .on('SIGINT', gracefulShutdown)
  } catch (err) {
    console.error(err)
  }
}

main()
