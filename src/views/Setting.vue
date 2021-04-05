<template>
  <div class="setting">
    <van-nav-bar
      title="自我审批"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-form @submit="onSubmit">
      <van-field
        v-model="form.name"
        name="姓名"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        name="radio"
        label="性别"
        :rules="[{ required: true, message: '请选择性别' }]"
      >
        <template #input>
          <van-radio-group v-model="form.sex" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="form.faculty"
        name="学院"
        label="学院"
        placeholder="学院"
        :rules="[{ required: true, message: '请填写学院' }]"
      />
      <van-field
        v-model="form.major"
        name="专业"
        label="专业"
        placeholder="专业"
        :rules="[{ required: true, message: '请填写专业' }]"
      />
      <van-field
        v-model="form.grade"
        name="年级"
        label="年级"
        placeholder="年级"
        :rules="[{ required: false, message: '请填写年级' }]"
      />
      <van-field
        v-model="form.stuNum"
        name="学号"
        label="学号"
        placeholder="学号"
        :rules="[{ required: true, message: '请填写学号' }]"
      />
      <van-field
        v-model="form.reason"
        name="出校事由"
        label="出校事由"
        placeholder="出校事由"
        :rules="[{ required: true, message: '请填写出校事由' }]"
      />
      <van-field
        v-model="form.leaveTime"
        readonly
        clickable
        name="datetimePicker"
        label="出校时间"
        placeholder="点击选择出校时间"
        @click="showLeaveTimePicker = true"
        :rules="[{ required: true, message: '请选择出校时间' }]"
      />
      <van-field
        v-model="form.backTime"
        readonly
        clickable
        name="datetimePicker"
        label="返校时间"
        placeholder="点击选择返校时间"
        @click="showBackTimePicker = true"
        :rules="[{ required: true, message: '请选择出校时间' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>

    <van-popup v-model:show="showLeaveTimePicker" position="bottom">
      <van-datetime-picker
        type="datetime"
        @confirm="handleConfirmLeaveTime"
        @cancel="showLeaveTimePicker = false"
        :min-date="new Date()"
      />
    </van-popup>
    <van-popup v-model:show="showBackTimePicker" position="bottom">
      <van-datetime-picker
        type="datetime"
        @confirm="handleConfirmBackTime"
        @cancel="showLeaveTimePicker = false"
        :min-date="new Date()"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from '@/utils/dayjs'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const form = reactive({
      name: '',
      sex: '',
      faculty: '',
      major: '',
      grade: '',
      stuNum: '',
      reason: '',
      leaveTime: '',
      backTime: '',
      status: 0 // 每次保存都初始化出入校状态
    })

    function usePicker () {
      const showLeaveTimePicker = ref(false)
      const showBackTimePicker = ref(false)

      function handleConfirmLeaveTime (value: Date) {
        form.leaveTime = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        if (dayjs(form.backTime).isBefore(form.leaveTime)) {
          form.backTime = form.leaveTime
        }
        showLeaveTimePicker.value = false
      }

      function handleConfirmBackTime (value: Date) {
        form.backTime = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        if (dayjs(form.leaveTime).isAfter(form.backTime)) {
          form.leaveTime = form.backTime
        }
        showBackTimePicker.value = false
      }

      return { showLeaveTimePicker, showBackTimePicker, handleConfirmLeaveTime, handleConfirmBackTime }
    }

    function useForm () {
      const router = useRouter()
      const store = useStore()

      function onSubmit () {
        console.log(form)
        store.commit('SET_INFO', toRaw(form))
        router.push({ name: 'Home' })
      }

      return { onSubmit }
    }

    const router = useRouter()
    const store = useStore()

    function onClickLeft () {
      router.back()
    }

    onMounted(() => {
      const info = store.state.info

      if (info) {
        form.name = info.name
        form.sex = info.sex
        form.faculty = info.faculty
        form.major = info.major
        form.grade = info.grade
        form.stuNum = info.stuNum
        form.reason = info.reason
        form.leaveTime = info.leaveTime ? info.leaveTime : dayjs().format('YYYY-MM-DD HH:mm:ss')
        form.backTime = info.backTime ? info.backTime : dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
    })

    return { ...usePicker(), ...useForm(), form, onClickLeft }
  }
})
</script>
