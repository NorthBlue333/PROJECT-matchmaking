<template>
  <div class="h-full bg-gray-900 text-white p-2">
    <h1 class="text-center text-3xl font-semibold">Game</h1>
    <div class="flex justify-center my-4">
      <router-link :to="{ name: 'game.waiting' }">
        <t-button
          variant="primary"
          primary-class="text-white bg-green-500 border-green-500 hover:bg-green-700 hover:border-green-700 focus:outline-none"
        >
          Search for a game
        </t-button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Headers from '@/mixins/Headers.vue'
import { Component } from 'vue-property-decorator'

@Component({
  mixins: [Headers],
})
export default class GameIndex extends Vue {
  documentTitle = 'Game Index'
}
</script>
