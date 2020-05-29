<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  created() {
    console.log(this.$store.state)
    if (this.$store.getters.sessionUser)
      this.$store.commit('setUser', this.$store.getters.sessionUser)
  }
}
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
