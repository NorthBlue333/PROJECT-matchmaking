<template>
  <div
    :class="['rounded p-4 h-full overflow-auto', themeClasses]"
    :style="themeStyle"
  >
    <Header
      ref="header"
      :themes="themes"
      :current-theme="currentTheme"
      @change-theme="handleThemeChange"
      :win="!!winner"
      :draw="draw"
    />
    <div v-if="winner || draw" class="text-center flex flex-col items-center">
      <span v-if="winner">{{
        winner === ownId ? 'You win!' : 'Your opponent wins!'
      }}</span>
      <span v-if="draw">It's a draw !</span>
      <t-button
        variant="primary"
        primary-class="text-black bg-white border-white hover:bg-white hover:border-white focus:outline-none"
        size="sm"
        @click="
          $store.dispatch('leaveRoom', null)
          $router.push({ name: 'game.waiting' })
        "
      >
        Restart
      </t-button>
    </div>
    <Game
      @win="winner = $event"
      @game-input="handleGameInput"
      :scores="scores"
      class="mt-4"
      :win="!!winner"
      :draw="draw"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Theme } from '../../../types/game/theme'
import Header from './Header.vue'

@Component({
  components: {
    Header: () => import('./Header.vue'),
    Game: () => import('./Game.vue'),
  },
})
export default class GameBoard extends Vue {
  @Prop() id?: string
  currentTheme: Theme | null = null
  themes: Theme[] = [
    {
      backgroundClass: 'green-900',
      colorClass: 'white',
    },
    {
      backgroundClass: 'teal-900',
      colorClass: 'white',
    },
  ]
  @Prop() scores?: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ]
  @Prop() winner?: boolean | string
  @Prop() draw?: boolean

  handleThemeChange(theme: Theme) {
    this.currentTheme = theme
  }

  async handleGameInput(line: number, col: number) {
    await this.$store.dispatch('sendGameMove', { x: col, y: line })
  }

  get themeClasses() {
    if (!this.currentTheme) return ''
    return this.$refs.header
      ? (this.$refs.header as Header).themeClasses(this.currentTheme)
      : ''
  }

  get themeStyle() {
    if (!this.currentTheme) return ''
    return this.$refs.header
      ? (this.$refs.header as Header).themeStyle(this.currentTheme)
      : ''
  }

  get ownId() {
    return this.$store.state.game.room.sessionId
  }
}
</script>
