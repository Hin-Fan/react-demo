import Backend from 'backend';
import next from 'next';
import {createServer} from 'http'
import { parse } from 'url';
const port = 3001

const main = async () => {

  try {

    console.log('Preparing backend ...')
    let deferredResolve
    const backendReady = new Promise(resolve => { deferredResolve = resolve })
    const backend = Backend.listen(port, deferredResolve)  
    await backendReady
    console.log(`Backend listensing on port ${port}`)

    console.log('Preparing frontend ...')
    const frontend = next({ dev: true, dir: './frontend' })
    const handle = frontend.getRequestHandler()
    await frontend.prepare()
    createServer((req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      handle(req, res, parsedUrl)      
    }).listen(3000, err => {
      if (err) throw err
      console.log('> Frontend ready on http://localhost:3000')
    })

    /*
     * Attempt to gracefully stop the service and release all its resources
     * @param {String | Number} signal 
     */
    const gracefulShutdown = signal => {
      console.log(`Received signal ${signal}, closing port ${port}`)
      backend.close()
      console.log('Terminated successfully')
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
// import Backend from 'backend';
// import next from 'next';
// const port = 3001

// const backend = Backend.listen(port, () => console.log(`Backend listening on port ${port}`))
// const frontend = next({dev: true, dir: './frontend'}).prepare()
//   .then(() => console.log(`Frontend ready`))
//   .catch(err => console.error(err))

// /*
//  * Attempt to gracefully stop the service and release all its resources
//  * @param {String | Number} signal 
//  */
// const gracefulShutdown = signal => {
//   console.log(`Received signal ${signal}, closing port ${port}`)
//   backend.close()
//   console.log('Terminated successfully')
// }

// /** close server upon SIGTERM */
// process
//   .on('SIGTERM', gracefulShutdown)
//   .on('SIGINT', gracefulShutdown)