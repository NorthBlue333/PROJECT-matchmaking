<template>
  <section class="absolute w-full top-0">
    <div
      class="absolute top-0 w-full h-screen bg-gray-900"
      style='background-image: url("https://images.unsplash.com/photo-1588571534778-86b8154a214d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"); background-size: 100%; background-repeat: no-repeat;'
    ></div>
    <div class="container mx-auto px-4 h-screen">
      <div class="flex content-center items-center justify-center h-full">
        <div class="w-full lg:w-4/12 px-4 pt-32">
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
          >
            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div class="text-gray-500 text-center mb-3 font-bold">
                <small>Sign in with credentials</small>
              </div>
              <form @submit.prevent="login">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                    >Username</label
                  >
                  <input
                    type="username"
                    class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                    placeholder="Username"
                    style="transition: all 0.15s ease 0s;"
                    v-model="username"
                  />
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                    >Password</label
                  >
                  <input
                    type="password"
                    class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                    placeholder="Password"
                    style="transition: all 0.15s ease 0s;"
                    v-model="password"
                  />
                </div>

                <div class="text-center mt-6">
                  <button
                    class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    type="submit"
                    style="transition: all 0.15s ease 0s;"
                  >
                    Sign In
                  </button>
                  <div class="flex flex-wrap mt-6">
                    <div class="mx-auto">
                      <router-link :to="{ name: 'signup' }"
                        ><small>Create new account</small></router-link
                      >
                    </div>
                    <div class="mx-auto">
                      <router-link :to="{ name: 'game.index' }"
                        ><small>Play as guest</small></router-link
                      >
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class LoginForm extends Vue {
  username = ''
  password = ''

  beforeCreate() {
    if (this.$store.state.user && this.$store.state.user.currentUser)
      this.$router.push({ name: 'game.index' })
  }

  async login() {
    await this.$store.dispatch('loginUser', {
      password: this.password,
      username: this.username,
    })
    console.log(this.$store.state.user.currentUser)
    if (this.$store.state.user.currentUser)
      this.$router.push({ name: 'game.index' })
  }
}
</script>
