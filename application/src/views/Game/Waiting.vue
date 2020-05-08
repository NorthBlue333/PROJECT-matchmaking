<template>
  <div class="h-full bg-gray-900 text-white p-2">
    <h1 class="text-center text-3xl font-semibold">Game</h1>
    <div class="flex flex-col items-center my-2">
      <Loader />
      <div class="pt-2">Waiting{{ waitingText }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Headers from '@/mixins/Headers.vue'
import { Component } from 'vue-property-decorator'

@Component({
  mixins: [Headers],
  components: {
    Loader: () => import('@/components/Icons/Loaders/Puff.vue'),
  },
})
export default class GameWaiting extends Vue {
  documentTitle = 'Waiting for a game'
  waitingText = ''
  interval: number | null = null

  created() {
    this.interval = window.setInterval(this.setWaitingText, 500)
  }

  setWaitingText() {
    this.waitingText =
      this.waitingText.length == 3 ? '' : (this.waitingText += '.')
    document.title = 'Waiting for a game' + this.waitingText
  }

  destroyed() {
    if (this.interval) window.clearInterval(this.interval)
  }
}
</script>
