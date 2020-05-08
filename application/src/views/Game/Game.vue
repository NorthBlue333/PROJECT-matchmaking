<template>
  <div class="h-full">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Game extends Vue {}
</script>
