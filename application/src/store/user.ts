import { Module } from 'vuex'
import { State } from '.'
import axios from 'axios'

export interface UserState {
  currentUser: { username: string; id: number } | null
}

export const user: Module<UserState, State> = {
  state: {
    currentUser: null,
  },
  mutations: {
    setUser(state: UserState, user: { username: string; id: number }) {
      state.currentUser = user
    },
  },
  actions: {
    async loginUser(
      { commit },
      payload?: { username: string; password: string }
    ) {
      try {
        const user = await axios.post(
          'http://dev.lounatabbara.site:3000/users/login',
          payload
        )
        commit('setUser', { username: user.data.username, id: user.data.id })
      } catch (e) {
        commit('setUser', null)
      }
    },
    async registerUser(
      { commit },
      payload?: { username: string; password: string; email: string }
    ) {
      try {
        const user = await axios.post(
          'http://dev.lounatabbara.site:3000/users',
          payload
        )
        commit('setUser', { username: user.data.username, id: user.data.id })
      } catch (e) {
        commit('setUser', null)
      }
    },
  },
  getters: {
    sessionUser() {
      const localStorage = window.localStorage.getItem('vuex')
      if (localStorage) return JSON.parse(localStorage).currentUser
      else return null
    },
  },
}
