<template>
  <div
    :class="[
      'flex items-center justify-center',
      win || draw ? 'opacity-25' : '',
    ]"
  >
    <div class="bg-white text-black text-6xl">
      <div v-for="line in 3" :key="line" class="flex">
        <button
          v-for="col in 3"
          :key="col"
          :class="[
            'w-48 h-48 border-black border-b border-r focus:outline-none',
            win || draw ? 'cursor-default' : '',
            line === 1 ? 'border-t' : '',
            col === 1 ? 'border-l' : '',
          ]"
          @click="gameInput(line - 1, col - 1)"
          :disabled="win || draw || filledBy(line - 1, col - 1)"
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
  @Prop() draw?: boolean

  filledBy(line: number, col: number) {
    return this.findFilledAt(line, col)
  }

  gameInput(line: number, col: number) {
    if (this.win || this.draw || this.findFilledAt(line, col)) return
    this.$emit('game-input', line, col)
  }

  findFilledAt(line: number, col: number): string | boolean {
    if (!this.scores) return false
    return this.scores[col + line * 3] === ''
      ? false
      : this.scores[col + line * 3]
  }
}
</script>
