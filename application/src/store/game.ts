import { Module } from 'vuex'
import { State } from '.'
import { colyseusClient } from '@/colyseus'
import { Room } from 'colyseus.js'

export interface GameState {
  room: Room | null
}

export const game: Module<GameState, State> = {
  state: {
    room: null,
  },
  mutations: {
    setRoom(state: GameState, room: Room) {
      state.room = room
    },
  },
  actions: {
    async joinGameRoom({ commit }, payload?: { id: string }) {
      if (payload) {
        try {
          const room = await colyseusClient.joinById(payload.id)
          commit('setRoom', room)
        } catch (e) {
          commit('setRoom', null)
        }
      } else {
        try {
          const room = await colyseusClient.joinOrCreate('game_room')
          commit('setRoom', room)
        } catch (e) {
          commit('setRoom', null)
        }
      }
    },
    async reconnectRoom({ commit }, { id, sessionId }) {
      try {
        const room = await colyseusClient.reconnect(id, sessionId)
        commit('setRoom', room)
      } catch (e) {
        commit('setRoom', null)
      }
    },
    async sendGameMove({ state }, move) {
      await state.room?.send('move', move)
    },
  },
  getters: {
    sessionRoom() {
      const localStorage = window.localStorage.getItem('vuex')
      if (localStorage) return JSON.parse(localStorage).room
      else return null
    },
  },
}
