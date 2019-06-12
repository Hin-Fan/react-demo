import next from 'next'

export default next({ dev: process.env.NODE_ENV !== 'production' })
