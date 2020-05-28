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
          @click="gameInput(line - 1, col - 1)"
          :disabled="win || filledBy(line - 1, col - 1)"
        >
          <span v-if="filledBy(line - 1, col - 1)">{{
            filledBy(line - 1, col - 1)
          }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class BoardGame extends Vue {
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
  @Prop() win?: boolean

  filledBy(line: number, col: number) {
    return this.findFilledAt(line, col)
  }

  gameInput(line: number, col: number) {
    if (this.win || this.findFilledAt(line, col)) return
    this.$emit('game-input', line, col)
  }

  findFilledAt(line: number, col: number): string | boolean {
    if (!this.scores) return false
    return this.scores[col + line * 3] === ''
      ? false
      : this.scores[col + line * 3]
  }

  // checkForWinner() {
  //   let current: string | null = null
  //   line: for (let line = 1; line < 4; line++) {
  //     for (let col = 1; col < 4; col++) {
  //       const filled = this.findFilledAt(line, col)
  //       if (!filled) continue line
  //       if (!current) {
  //         current = filled.symbol
  //         continue
  //       }
  //       if (filled.symbol !== current) continue line
  //       else if (col === 3) {
  //         this.$emit('win', current)
  //         return
  //       }
  //     }
  //   }
  //   col: for (let col = 1; col < 4; col++) {
  //     for (let line = 1; line < 4; line++) {
  //       const filled = this.findFilledAt(line, col)
  //       if (!filled) continue col
  //       if (!current) {
  //         current = filled.symbol
  //         continue
  //       }
  //       if (filled.symbol !== current) continue col
  //       else if (line === 3) {
  //         this.$emit('win', current)
  //         return
  //       }
  //     }
  //   }
  //   const center = this.findFilledAt(2, 2)
  //   current = center ? center.symbol : null
  //   if (!current) return
  //   const topLeft = this.findFilledAt(1, 1)
  //   const botRight = this.findFilledAt(3, 3)
  //   if (
  //     topLeft &&
  //     topLeft.symbol === current &&
  //     botRight &&
  //     botRight.symbol === current
  //   ) {
  //     this.$emit('win', current)
  //     return
  //   }
  //   const topRight = this.findFilledAt(1, 3)
  //   const botLeft = this.findFilledAt(3, 1)
  //   if (
  //     topRight &&
  //     topRight.symbol === current &&
  //     botLeft &&
  //     botLeft.symbol === current
  //   ) {
  //     this.$emit('win', current)
  //     return
  //   }
  // }
}
</script>
