import express from 'express'
import http from 'http'
import cors from 'cors'
import { users } from './controllers/users.controller'

export const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/users', users)

import { Game } from './models/game.model'
console.log(Game.prototype)
