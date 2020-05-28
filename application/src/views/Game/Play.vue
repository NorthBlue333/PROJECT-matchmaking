<template>
  <div class="h-full flex flex-col bg-gray-900 text-white p-2 overflow-auto">
    <h1 class="text-center text-3xl font-semibold">Game {{ this.id }}</h1>
    <GameBoard :scores="scores" :id="id" :winner="winner" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Headers from '@/mixins/Headers.vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({
  mixins: [Headers],
  components: {
    GameBoard: () => import('@/components/Game/Board/Board.vue'),
  },
})
export default class GamePlay extends Vue {
  documentTitle = ''
  @Prop({ required: true }) id?: string
  scores: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ] = ['', '', '', '', '', '', '', '', '']
  winner = ''

  async created() {
    if (!this.currentRoom) {
      console.log('hey')
      this.$router.push({ name: 'game.waiting' })
      return
    }

    this.documentTitle = 'Game ' + this.id
    document.title = this.documentTitle
    this.currentRoom.onStateChange(() => {
      this.scores = this.currentRoom.state.board
      this.winner = this.currentRoom.state.winner
    })
  }

  get currentRoom() {
    return this.$store.state.game.room
  }
}
</script>
