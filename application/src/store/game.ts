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
    async joinGameRoom({ commit, rootState }, payload?: { id: string }) {
      const userId = rootState.user.currentUser
        ? rootState.user.currentUser.id
        : null
      if (payload) {
        try {
          const room = await colyseusClient.joinById(payload.id, {
            id: userId,
          })
          commit('setRoom', room)
        } catch (e) {
          commit('setRoom', null)
        }
      } else {
        try {
          const room = await colyseusClient.joinOrCreate('game_room', {
            id: userId,
          })
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
    async leaveRoom({ state }) {
      try {
        await state.room?.leave()
        this.commit('setRoom', null)
      } catch (e) {
        console.log(e)
      }
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
