<template>
  <div class="flex items-center justify-center">
    <div class="bg-white text-black text-6xl">
      <div v-for="line in 3" :key="line" class="flex">
        <button
          v-for="col in 3"
          :key="col"
          :class="[
            'w-48 h-48 border-black border-b border-r focus:outline-none',
            win ? 'cursor-default' : '',
            line === 1 ? 'border-t' : '',
            col === 1 ? 'border-l' : '',
          ]"
          @click="gameInput(line, col)"
          :disabled="win"
        >
          <span v-if="filledBy(line, col)">{{ filledBy(line, col) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { find } from 'lodash'

@Component
export default class BoardGame extends Vue {
  @Prop() scores?: { symbol: string; line: number; col: number }[]
  @Prop() win?: boolean

  filledBy(line: number, col: number) {
    const existing = this.findFilledAt(line, col)
    return existing ? existing.symbol : false
  }

  gameInput(line: number, col: number) {
    if (this.win || this.findFilledAt(line, col)) return
    this.$emit('game-input', [line, col])
  }

  @Watch('scores')
  onScoreChange() {
    this.checkForWinner()
  }

  findFilledAt(line: number, col: number) {
    return find(
      this.scores,
      (score: { symbol: string; line: number; col: number }) =>
        score.line == line && score.col == col
    )
  }

  checkForWinner() {
    let current: string | null = null
    line: for (let line = 1; line < 4; line++) {
      for (let col = 1; col < 4; col++) {
        const filled = this.findFilledAt(line, col)
        if (!filled) continue line
        if (!current) {
          current = filled.symbol
          continue
        }
        if (filled.symbol !== current) continue line
        else if (col === 3) {
          this.$emit('win', current)
          return
        }
      }
    }
    col: for (let col = 1; col < 4; col++) {
      for (let line = 1; line < 4; line++) {
        const filled = this.findFilledAt(line, col)
        if (!filled) continue col
        if (!current) {
          current = filled.symbol
          continue
        }
        if (filled.symbol !== current) continue col
        else if (line === 3) {
          this.$emit('win', current)
          return
        }
      }
    }
    current = this.findFilledAt(2, 2) ? this.findFilledAt(2, 2).symbol : null
    if (!current) return
    if (
      this.findFilledAt(1, 1) &&
      this.findFilledAt(1, 1).symbol === current &&
      this.findFilledAt(3, 3) &&
      this.findFilledAt(3, 3).symbol === current
    ) {
      this.$emit('win', current)
      return
    }
    if (
      this.findFilledAt(1, 3) &&
      this.findFilledAt(1, 3).symbol === current &&
      this.findFilledAt(3, 1) &&
      this.findFilledAt(3, 1).symbol === current
    ) {
      this.$emit('win', current)
      return
    }
  }
}
</script>
