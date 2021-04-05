<template>
  <div class="wrapper">
    <div class="body">
      <Content :state="state" @out="handleOutSchool" @enter="handleEnterSchool" @setting="handleOpenSetting" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, provide } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Content from '@/components/Content.vue'
import { Toast } from 'vant'
import dayjs from '@/utils/dayjs'

export default defineComponent({
  name: 'Home',
  components: { Content },
  setup () {
    const router = useRouter()
    const store = useStore()

    function handleOpenSetting () {
      router.push({ name: 'Setting' })
    }

    const form = computed(() => {
      return store.state.info
    })

    onMounted(() => {
      if (!form.value.name || !form.value.faculty || !form.value.stuNum) {
        Toast('请完善审批信息')
        router.push({ name: 'Setting' })
      }
    })

    const state = computed(() => {
      if (form.value.status === 1) {
        return 'pass'
      }
      if (form.value.status === 2) {
        return 'out'
      }
      if (form.value.status === 3) {
        return 'enter'
      }

      if (dayjs().isBetween(form.value.leaveTime, form.value.backTime, null, '[]')) {
        return 'pass'
      }

      return 'forbidden'
    })

    function handleOutSchool () {
      store.commit('SET_STATUS', 2)
      Toast.success('提交成功')
    }

    function handleEnterSchool () {
      store.commit('SET_STATUS', 3)
      Toast.success('提交成功')
    }

    provide('info', form.value)

    return { handleOpenSetting, state, handleOutSchool, handleEnterSchool }
  }
})
</script>
