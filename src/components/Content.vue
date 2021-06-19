<template>
  <div class="index">
    <!-- 个人信息 -->
    <section class="result big-size">
      <p>
        出校备案编号：000430009
        <!-- <span v-if="backType==1" class="fzbig"
          style="float:right"
          :class="colorList[formStatus]"
        >{{TodayBackTextList[formStatus]}}</span>
        <span v-else class="fzbig"
          style="float:right;"
          :class="colorList[formStatus]"
        >{{NoTodayBackTextList[formStatus]}}</span> -->
      </p>
      <p @click="handleOpenSetting">
        <span>状态：</span>
        <span class="bgc-grey" v-if="state === 'forbidden'">已过期</span>
        <span class="bgc-green" v-if="state === 'pass'">当日返校已备案</span>
        <span class="bgc-blue" v-if="state === 'out'">已离校(当日返校)</span>
        <span class="bgc-yellow" v-if="state === 'enter'">已返校(当日返校)</span>
        <!-- <span v-if="backType==1"
          :class="colorList[formStatus]"
        >{{TodayBackTextList[formStatus]}}</span>
        <span v-else
          :class="colorList[formStatus]"
        >{{NoTodayBackTextList[formStatus]}}</span> -->
      </p>
      <p>
        <span>出校日期：</span>
        <span>{{info?.leaveTime && formatDate(info.leaveTime) || ''}}</span>
      </p>
      <p>
        <span>当前时间：</span>
        <span class="time">{{nowTime}}</span>
      </p>
      <p>
        <span>出校起始时间：</span>
        <span>{{info?.leaveTime || ''}}</span>
      </p>
      <p>
        <span>出校结束时间：</span>
        <span>{{info?.backTime || ''}}</span>
      </p>
      <p>
        <span>提交时间：</span>
        <span>{{submitTime}}</span>
      </p>
      <p>
        <span>姓名：</span>
        <span>{{info?.name || ''}}</span>
      </p>
      <p>
        <span>学号：</span>
        <span>{{info?.stuNum || ''}}</span>
      </p>
      <p>
        <span>性别：</span>
        <span>{{info?.sex == "1" ? "男" : "女" || ''}}</span>
      </p>
      <p>
        <span>学院：</span>
        <span>{{info?.faculty || ''}}</span>
      </p>
      <p>
        <span>专业：</span>
        <span>{{info?.major || ''}}</span>
      </p>
      <p>
        <span>年级：</span>
        <span>{{info?.grade || ''}}</span>
      </p>
      <p>
        <span>出校事由：</span>
        <span>{{info?.reason || ''}}</span>
      </p>
      <!-- <p v-if="backType!=1">
        <span>返校日期：</span>
        <span>{{result.record && result.record.fxrq}}</span>
      </p> -->
    </section>
    <!-- <section class="result">
      <p>
        <span>审核意见：</span>
        <span>{{result.record && result.record.approvalRemarks}}</span>
      </p>
      <p>
        <span>审核时间：</span>
        <span>{{result.record && result.record.approvalTime}}</span>
      </p>
      <p>
        <span>审核人姓名：</span>
        <span>{{result.record && result.record.approvalUserName}}</span>
      </p>
    </section> -->
    <div class="btn-wrap" v-if="state === 'pass' || state === 'out'">
      <div class="btn bgc-blue" @click="handleOutSchool()" v-if="state === 'pass'">确定离校</div>
      <div class="btn bgc-blue" @click="handleEnterSchool()" v-if="state === 'out'">确定回校</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, PropType, computed } from 'vue'
import { IForm } from '@/types/form'
import dayjs from '@/utils/dayjs'

export default defineComponent({
  props: {
    state: {
      type: String as PropType<'forbidden' | 'pass' | 'out' | 'enter'>,
      default: 'forbidden'
    }
  },
  emits: ['out', 'enter', 'setting'],
  setup (props, { emit }) {
    const info : undefined | IForm = inject('info')

    const nowTime = ref(dayjs().format('HH:mm:ss'))

    const formatDate = (time: string) => {
      return dayjs(time).format('YYYY-MM-DD')
    }

    const submitTime = computed(() => {
      return dayjs(info?.leaveTime).hour(-2).format('YYYY-MM-DD HH:mm:ss')
    })

    setInterval(() => {
      nowTime.value = dayjs().format('HH:mm:ss')
    }, 1000)

    function handleOutSchool () {
      emit('out')
    }

    function handleEnterSchool () {
      emit('enter')
    }

    function handleOpenSetting () {
      emit('setting')
    }

    return { info, nowTime, formatDate, submitTime, handleOutSchool, handleEnterSchool, handleOpenSetting }
  }
})
</script>

<style lang='scss' scoped>
.time {
  color: red;
  font-weight: bold;
  font-size: 64px;
}

.index {
  background-color: #f5f5f5;
  font-size: 32px;
  color: #333;
  overflow: auto;
  height: 100%;
  padding-bottom: 80px;
  section {
    background-color: #fff;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 20px;
    .title {
      font-weight: 520;
      font-size: 36px;
    }
    p {
      font-size: 28px;
      padding: 30px 0;
      border-bottom: 1px solid rgba(235, 235, 235, 0.5);
      span {
        &:nth-child(2) {
          max-width: 70%;
        }
      }
      .fzbig{
        font-size:  40px;
      }
    }
  }

  .big-size{
    p:nth-child(2){
        font-size: 64px;
      }
    p:nth-child(n+3):nth-child(-n+6){
        font-size: 46px;
      }
  }
}

.bgc-lightblue {
  color: #99daff;
}
.bgc-blue {
  color: #01a3ff;
}
.bgc-yellow {
  color: #f3a730;
}
.bgc-red {
  color: #ed5560;
}
.bgc-green {
  color: #00bc9d;
}
.bgc-grey {
  color: #aaa;
}
.bgc-purple {
  color: #6300bf;
}

.btn-wrap {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  text-align: center;
  display: flex;
  .btn {
    width: 100%;
    padding: 25px;
    color: #fff;
  }
  .bgc-deepblue {
    background-color: #3482df;
  }
  .bgc-blue {
    background-color: #4199ff;
  }
  .bgc-black {
    background-color: #b3b3b3;
  }
}
</style>
