<template>
  <div class="h-full flex flex-col bg-gray-900 text-white p-2 overflow-auto">
    <h1 class="text-center text-3xl font-semibold">Game {{ this.id }}</h1>
    <GameBoard :id="id" />
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
export default class GameWaiting extends Vue {
  documentTitle = ''
  @Prop({ required: true }) id?: number

  created() {
    this.documentTitle = 'Game ' + this.id
    document.title = this.documentTitle
  }
}
</script>
