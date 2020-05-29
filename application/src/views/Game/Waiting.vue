<template>
  <div class="h-full bg-gray-900 text-white p-2">
    <h1 class="text-center text-3xl font-semibold">Game</h1>
    <div class="flex flex-col items-center my-2">
      <Loader />
      <div class="pt-2">Waiting{{ waitingText }}</div>
      <t-button
        variant="primary"
        primary-class="text-black bg-white border-white hover:bg-white hover:border-white focus:outline-none"
        size="sm"
        @click="
          $store.dispatch('leaveRoom', null)
          joinRoom()
        "
      >
        Retry
      </t-button>
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

  async created() {
    this.interval = window.setInterval(this.setWaitingText, 500)
    await this.joinRoom()
  }

  async joinRoom() {
    if (this.$store.getters.sessionRoom) {
      await this.$store.dispatch('reconnectRoom', {
        id: this.$store.getters.sessionRoom.id,
        sessionId: this.$store.getters.sessionRoom.sessionId,
      })
    }

    if (!(this.currentRoom && this.currentRoom.id)) {
      await this.$store.dispatch('joinGameRoom')
    }

    this.currentRoom.onStateChange(() => {
      if (Object.keys(this.currentRoom.state.players).length === 2) {
        this.currentRoom.removeAllListeners()
        this.$router.push({
          name: 'game.play',
          params: { id: this.currentRoom.id },
        })
      }
    })
  }

  setWaitingText() {
    this.waitingText =
      this.waitingText.length == 3 ? '' : (this.waitingText += '.')
    document.title = 'Waiting for a game' + this.waitingText
  }

  destroyed() {
    if (this.interval) window.clearInterval(this.interval)
  }

  get currentRoom() {
    return this.$store.state.game.room
  }
}
</script>
