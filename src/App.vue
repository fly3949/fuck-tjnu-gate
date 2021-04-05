<template>
  <div class="body">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import storage from '@/utils/storage'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()

    onMounted(() => {
      if (storage.get('INFO')) {
        console.log(storage.get('INFO'))
        store.commit('SET_INFO', storage.get('INFO'))
      }
    })

    return {}
  }
})
</script>

<style lang="scss" scoped>
.body {
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-overflow-scrolling: touch;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}
</style>
