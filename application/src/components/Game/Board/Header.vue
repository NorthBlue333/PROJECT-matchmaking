<template>
  <header class="flex">
    <div
      class="flex flex-col items-center mx-1"
      v-for="(theme, index) in themes"
      :key="index"
    >
      <button
        :class="[
          'rounded-full border-2 h-8 w-8 flex items-center justify-center focus:outline-none',
          themeClasses(theme),
          theme === currentTheme ? 'cursor-default' : '',
        ]"
        :style="themeStyle(theme)"
        :disabled="theme === currentTheme"
        @click="changeTheme(theme)"
      >
        c
      </button>
      <span
        :class="['rounded-full h-1 w-1 mt-1', activeThemeClasses(theme)]"
        :style="activeThemeStyle(theme)"
        v-if="theme === currentTheme"
      ></span>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Theme } from '@/types/game/theme'

@Component
export default class GameBoardHeader extends Vue {
  @Prop({
    default: () => [
      {
        backgroundClass: 'gray-200',
        colorClass: 'gray-900',
      },
    ],
  })
  themes?: Theme[]
  @Prop() currentTheme?: Theme

  created() {
    if (this.themes && this.themes.length > 0) this.changeTheme(this.themes[0])
  }

  themeStyle(theme: Theme) {
    const style = []
    if (Object.prototype.hasOwnProperty.call(theme, 'background'))
      style.push(
        'background-color: ' +
          (theme as { background: string; color: string }).background +
          ';'
      )
    if (Object.prototype.hasOwnProperty.call(theme, 'color'))
      style.push(
        'color: ' +
          (theme as { background: string; color: string }).color +
          '; border-color: ' +
          (theme as { background: string; color: string }).color +
          ';'
      )
    return style.join(' ')
  }

  activeThemeStyle(theme: Theme) {
    let style = ''
    if (Object.prototype.hasOwnProperty.call(theme, 'color'))
      style =
        'background-color: ' +
        (theme as { background: string; color: string }).color +
        ';'
    return style
  }

  themeClasses(theme: Theme) {
    const classes = []
    if (Object.prototype.hasOwnProperty.call(theme, 'backgroundClass'))
      classes.push(
        'bg-' +
          (theme as { backgroundClass: string; colorClass: string })
            .backgroundClass
      )
    if (Object.prototype.hasOwnProperty.call(theme, 'colorClass'))
      classes.push(
        'text-' +
          (theme as { backgroundClass: string; colorClass: string })
            .colorClass +
          ' border-' +
          (theme as { backgroundClass: string; colorClass: string }).colorClass
      )
    return classes.join(' ')
  }

  activeThemeClasses(theme: Theme) {
    let classes = ''
    if (Object.prototype.hasOwnProperty.call(theme, 'colorClass'))
      classes =
        'bg-' +
        (theme as { backgroundClass: string; colorClass: string }).colorClass
    return classes
  }

  changeTheme(theme: Theme) {
    if (theme === this.currentTheme) return
    this.$emit('change-theme', theme)
  }
}
</script>
