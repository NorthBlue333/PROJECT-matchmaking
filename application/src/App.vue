<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
@import '~@scss/app';

html,
body,
#app {
  @apply h-full;
}

#app {
  font-family: Montserrat, Arial;
}
</style>
