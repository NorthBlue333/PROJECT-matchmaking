import { Room, Delayed, Client } from 'colyseus'
import { type, Schema, MapSchema, ArraySchema } from '@colyseus/schema'

const TURN_TIMEOUT = 10
const BOARD_WIDTH = 3

export class Player extends Schema {
  @type('string')
  symbol: string

  @type('boolean')
  connected: boolean

  constructor(symbol: string) {
    super()
    console.log(symbol)
    this.symbol = symbol
    this.connected = true
  }
}
export class State extends Schema {
  @type('string')
  currentTurn: string
  @type({ map: Player })
  players = new MapSchema<string>()
  @type(['string'])
  board: string[] = new ArraySchema<string>('', '', '', '', '', '', '', '', '')
  @type('string')
  winner: string
  @type('boolean')
  draw: boolean
}

export class GameRoom extends Room<State> {
  maxClients = 2
  randomMoveTimeout: Delayed

  onCreate() {
    this.setState(new State())

    this.onMessage('move', (client, data) => {
      this.doMove(client, data)
    })
  }

  doMove(client, data) {
    if (this.state.winner || this.state.draw) {
      return
    }

    if (client.sessionId === this.state.currentTurn) {
      console.log(data.x + BOARD_WIDTH * data.y)
      const index = data.x + BOARD_WIDTH * data.y

      if (this.state.board[index] === '') {
        const move = this.state.players[client.sessionId].symbol
        this.state.board[index] = move

        if (this.checkWin(data.x, data.y, move)) {
          this.state.winner = client.sessionId
        } else if (this.checkBoardComplete()) {
          this.state.draw = true
        } else {
          const playerIds = Object.keys(this.state.players)

          this.state.currentTurn =
            client.sessionId === playerIds[0] ? playerIds[1] : playerIds[0]

          this.setAutoMoveTimeout()
        }
      }
    }
  }

  onJoin(client: Client) {
    let players = Object.keys(this.state.players)
    this.state.players[client.sessionId] = new Player(
      ['X', 'O'][players.length]
    )
    players = Object.keys(this.state.players)

    if (players.length === 2) {
      this.state.currentTurn = players[0]
      this.setAutoMoveTimeout()

      // lock this room for new users
      this.lock()
    }
  }

  setAutoMoveTimeout() {
    if (this.randomMoveTimeout) {
      this.randomMoveTimeout.clear()
    }

    this.randomMoveTimeout = this.clock.setTimeout(
      () => this.doRandomMove(),
      TURN_TIMEOUT * 1000
    )
  }

  checkBoardComplete() {
    return this.state.board.filter((item) => item === '').length === 0
  }

  doRandomMove() {
    const sessionId = this.state.currentTurn
    for (let x = 0; x < BOARD_WIDTH; x++) {
      for (let y = 0; y < BOARD_WIDTH; y++) {
        const index = x + BOARD_WIDTH * y
        if (this.state.board[index] === '') {
          this.doMove({ sessionId } as Client, { x, y })
          return
        }
      }
    }
  }

  checkWin(x, y, move) {
    let won = false
    let board = this.state.board

    // horizontal
    for (let y = 0; y < BOARD_WIDTH; y++) {
      const i = x + BOARD_WIDTH * y
      if (board[i] !== move) {
        break
      }
      if (y == BOARD_WIDTH - 1) {
        won = true
      }
    }

    // vertical
    for (let x = 0; x < BOARD_WIDTH; x++) {
      const i = x + BOARD_WIDTH * y
      if (board[i] !== move) {
        break
      }
      if (x == BOARD_WIDTH - 1) {
        won = true
      }
    }

    // cross forward
    if (x === y) {
      for (let xy = 0; xy < BOARD_WIDTH; xy++) {
        const i = xy + BOARD_WIDTH * xy
        if (board[i] !== move) {
          break
        }
        if (xy == BOARD_WIDTH - 1) {
          won = true
        }
      }
    }

    // cross backward
    for (let x = 0; x < BOARD_WIDTH; x++) {
      const y = BOARD_WIDTH - 1 - x
      const i = x + BOARD_WIDTH * y
      if (board[i] !== move) {
        break
      }
      if (x == BOARD_WIDTH - 1) {
        won = true
      }
    }

    return won
  }

  async onLeave(client, consented: boolean) {
    // flag client as inactive for other users
    this.state.players[client.sessionId].connected = false

    try {
      if (consented) {
        throw new Error('Consented leave')
      }

      // allow disconnected client to reconnect into this room until 20 seconds
      await this.allowReconnection(client, 20)

      // client returned! let's re-activate it.
      this.state.players[client.sessionId].connected = true
    } catch (e) {
      // 20 seconds expired. let's remove the client.
      delete this.state.players[client.sessionId]

      if (this.randomMoveTimeout) this.randomMoveTimeout.clear()

      const remainingPlayerIds = Object.keys(this.state.players)
      if (remainingPlayerIds.length > 0) {
        this.state.winner = remainingPlayerIds[0]
      }
    }
  }
}
