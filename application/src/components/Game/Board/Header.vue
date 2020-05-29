<template>
  <header class="flex">
    <div
      class="flex flex-col items-center mx-1"
      v-for="(theme, index) in themes"
      :key="index"
    >
      <button
        :class="[
          'rounded-full border-2 h-8 w-8 flex items-center justify-center focus:outline-none',
          themeClasses(theme),
          theme === currentTheme ? 'cursor-default' : '',
        ]"
        :style="themeStyle(theme)"
        :disabled="theme === currentTheme"
        @click="changeTheme(theme)"
      >
        c
      </button>
      <span
        :class="['rounded-full h-1 w-1 mt-1', activeThemeClasses(theme)]"
        :style="activeThemeStyle(theme)"
        v-if="theme === currentTheme"
      ></span>
    </div>
    <div class="mx-auto">
      <span v-if="!win && !draw && turn === ownId">Your turn!</span>
      <span v-if="!win && !draw && turn !== ownId">Opponent's turn</span>
      <span class="ml-2" v-if="!win && !draw">{{ secondsLeft }}</span>
    </div>
    <div class="flex flex-col text-right">
      <div>
        You are <span class="font-bold">{{ ownId }}</span> and you play
        <span class="font-bold">{{
          currentRoom.state.players[ownId].symbol
        }}</span>
      </div>
      <div>
        <span
          :class="[
            'font-semibold text-xs italic p-2 rounded-full',
            activeThemeClasses(currentTheme),
          ]"
          v-if="!connected"
          >DISCONNECTED</span
        >
        Your opponent is <span class="font-bold">{{ opponentId }}</span> and
        plays
        <span class="font-bold">{{
          currentRoom.state.players[opponentId].symbol
        }}</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Theme } from '@/types/game/theme'
import { filter } from 'lodash'

@Component
export default class GameBoardHeader extends Vue {
  @Prop({
    default: () => [
      {
        backgroundClass: 'gray-200',
        colorClass: 'gray-900',
      },
    ],
  })
  themes?: Theme[]
  @Prop()
  win?: boolean
  @Prop()
  draw?: boolean
  @Prop() currentTheme?: Theme
  connected = true
  turn = ''
  intervalTimeout: number | null = null
  secondsLeft = 10

  created() {
    if (this.themes && this.themes.length > 0) this.changeTheme(this.themes[0])
    this.connected = this.currentRoom.state.players[this.opponentId].connected
    this.turn = this.currentRoom.state.currentTurn
    if (this.intervalTimeout) window.clearInterval(this.intervalTimeout)
    this.intervalTimeout = window.setInterval(() => {
      if (this.secondsLeft > 0) this.secondsLeft -= 1
    }, 1000)
    this.currentRoom.onStateChange(() => {
      this.connected = this.currentRoom.state.players[this.opponentId]
        ? this.currentRoom.state.players[this.opponentId].connected
        : false
      this.turn = this.currentRoom.state.currentTurn
      this.secondsLeft = 10
      if (this.intervalTimeout) window.clearInterval(this.intervalTimeout)
      this.intervalTimeout = window.setInterval(() => {
        if (this.secondsLeft > 0) this.secondsLeft -= 1
      }, 1000)
    })
  }

  themeStyle(theme: Theme) {
    const style = []
    if (Object.prototype.hasOwnProperty.call(theme, 'background'))
      style.push(
        'background-color: ' +
          (theme as { background: string; color: string }).background +
          ';'
      )
    if (Object.prototype.hasOwnProperty.call(theme, 'color'))
      style.push(
        'color: ' +
          (theme as { background: string; color: string }).color +
          '; border-color: ' +
          (theme as { background: string; color: string }).color +
          ';'
      )
    return style.join(' ')
  }

  activeThemeStyle(theme: Theme) {
    let style = ''
    if (Object.prototype.hasOwnProperty.call(theme, 'color'))
      style =
        'background-color: ' +
        (theme as { background: string; color: string }).color +
        ';'
    return style
  }

  themeClasses(theme: Theme) {
    const classes = []
    if (Object.prototype.hasOwnProperty.call(theme, 'backgroundClass'))
      classes.push(
        'bg-' +
          (theme as { backgroundClass: string; colorClass: string })
            .backgroundClass
      )
    if (Object.prototype.hasOwnProperty.call(theme, 'colorClass'))
      classes.push(
        'text-' +
          (theme as { backgroundClass: string; colorClass: string })
            .colorClass +
          ' border-' +
          (theme as { backgroundClass: string; colorClass: string }).colorClass
      )
    return classes.join(' ')
  }

  activeThemeClasses(theme: Theme) {
    const classes = []
    if (Object.prototype.hasOwnProperty.call(theme, 'colorClass'))
      classes.push(
        'bg-' +
          (theme as { backgroundClass: string; colorClass: string }).colorClass
      )
    if (Object.prototype.hasOwnProperty.call(theme, 'backgroundClass'))
      classes.push(
        'text-' +
          (theme as { backgroundClass: string; colorClass: string })
            .backgroundClass
      )
    return classes.join(' ')
  }

  changeTheme(theme: Theme) {
    if (theme === this.currentTheme) return
    this.$emit('change-theme', theme)
  }

  get ownId() {
    return this.currentRoom.sessionId
  }

  get opponentId() {
    return filter(
      Object.keys(this.currentRoom.state.players),
      id => id !== this.ownId
    )[0]
  }

  get currentRoom() {
    return this.$store.state.game.room
  }
}
</script>
