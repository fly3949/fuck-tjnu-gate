import { createStore } from 'vuex'
import storage from '@/utils/storage'

export default createStore({
  state: {
    info: {
      name: '',
      sex: '',
      faculty: '',
      major: '',
      grade: '',
      stuNum: '',
      reason: '',
      leaveTime: '',
      backTime: '',
      status: 0 // 0 默认，1 未出，2 已出未进，3 已进
    }
  },
  mutations: {
    SET_INFO (state, info) {
      state.info = info
      storage.set('INFO', info)
    },
    SET_STATUS (state, status) {
      state.info.status = status
      storage.set('INFO', state.info)
      console.log(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
