import Vue from 'vue'
import Vuex from 'vuex'
import { game, GameState } from './game'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export interface State {
  game: GameState
}

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
  reducer: (state: State) => ({
    room: state.game.room,
  }),
  filter: mutation => mutation.type == 'setRoom',
})

export default new Vuex.Store({
  mutations: {},
  actions: {},
  modules: {
    game,
  },
  plugins: [vuexLocal.plugin],
})
