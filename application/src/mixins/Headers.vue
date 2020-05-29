<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Headers extends Vue {
  documentTitle = ''

  created() {
    document.title = this.documentTitle
  }
}
</script>
