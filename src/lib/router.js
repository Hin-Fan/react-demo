import { Router } from 'express'
import { getPrimeMedians } from './prime'
export const router = Router()
/** @typedef {import('express').Handler} ExpressHandler */

/** @type {import('express').ErrorRequestHandler} */
const errorHandler = (err, req, res, next) => {
  res.status(500).json({ reason: err.message })
}

/** @type {ExpressHandler} */
const ok = (req, res, next) => res.sendStatus(200)

/** @type {ExpressHandler} */
const invalidURL = (req, res, next) => res.sendStatus(404)

/** @type {ExpressHandler} */
const getPrimeMediansHandler = (req, res, next) => {
  const { max } = req.params
  const primeMedian = getPrimeMedians(+max)
  res.json({ primeMedian })
}

router.get('/ping', ok)
router.get('/', ok)
router.get('/primeMedians/:max', getPrimeMediansHandler)

router.use(errorHandler)
router.use(invalidURL)
