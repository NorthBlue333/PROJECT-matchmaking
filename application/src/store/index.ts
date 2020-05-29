import Vue from 'vue'
import Vuex from 'vuex'
import { game, GameState } from './game'
import { user, UserState } from './user'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export interface State {
  game: GameState
  user: UserState
}

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
  reducer: (state: State) => ({
    room: state.game.room,
    currentUser: state.user.currentUser,
  }),
  filter: mutation => mutation.type == 'setRoom' || mutation.type == 'setUser',
})

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {
    game,
    user,
  },
  plugins: [vuexLocal.plugin],
})
