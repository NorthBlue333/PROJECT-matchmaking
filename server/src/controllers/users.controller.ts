import { Router } from 'express'
import { User } from '../models/user.model'

export const users = Router()

users.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

users.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    })
    if (user.password === req.body.password) res.status(201).json(user)
    else throw new Error('Bad credentials')
  } catch (e) {
    res.status(400).send(e)
  }
})

users.get('', async (req, res, next) => {
  try {
    req.query
    res.json(await User.scope(req.query['scope'] as any).findAll())
  } catch (e) {
    next(e)
  }
})

users.get('/:id', async (req, res, next) => {
  try {
    const user = await User.scope(req.query['scope'] as any).findByPk(
      req.params['id']
    )
    res.json(user)
  } catch (e) {
    next(e)
  }
})

users.put('/:id', async (req, res, next) => {
  try {
    await User.update(req.body, { where: { id: req.params['id'] } })
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})
