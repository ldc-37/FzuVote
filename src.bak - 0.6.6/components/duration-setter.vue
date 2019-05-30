<template>
  <div class="duration-setter">
    <p class="title"><slot></slot></p>
    <div class="time-line">
      <span class="text">开始时间</span>
      <div class="pickers">
        <picker mode="date" :value="startDate" :start="nowDate" end="2021-01-01" class="date" @change="handlePickerChange('startDate', $event)">
          <span>{{startDate}}</span>
          <img src="/static/images/icon_down.png" class="icon-down">
        </picker>
        <picker mode="time" :value="startTime" :start="nowTime" end="23:59" class="time" @change="handlePickerChange('startTime', $event)">
          <span>{{startTime}}</span>
          <img src="/static/images/icon_down.png" class="icon-down">
        </picker>
      </div>
    </div>
    <div class="time-line">
      <span class="text">结束时间</span>
      <div class="pickers">
        <picker mode="date" :value="endDate" :start="startDate" end="2021-01-01" class="date" @change="handlePickerChange('endDate', $event)">
          <span>{{endDate}}</span>
          <img src="/static/images/icon_down.png" class="icon-down">
        </picker>
        <picker mode="time" :value="endTime" :start="startTime" end="23:59" class="time" @change="handlePickerChange('endTime', $event)">
          <span>{{endTime}}</span>
          <img src="/static/images/icon_down.png" class="icon-down">
        </picker>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: ''
    }
  },
  computed: {
    nowDate: () => {
      const date = new Date()
      const yyyy = date.getFullYear()
      const mm = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
      const dd = date.getDate()
      return `${yyyy}-${mm}-${dd}`
    },
    nowTime: () => new Date().toTimeString().substr(0, 5),
  },
  methods: {
    handlePickerChange(attr, e) {
      this[attr] = e.mp.detail.value
      this.$emit('update', {
        attr,
        value: e.mp.detail.value
      })
    }
  },

  mounted() {
    this.startDate = this.nowDate
    this.startTime = this.nowTime
    this.endDate = this.nowDate
    this.endTime = this.nowTime

    this.$emit('create', {
      ...this.$data
    })
  },
}
</script>

<style scoped>
.duration-setter {
  padding: 40rpx 50rpx;
}

.title {
  font-size: 16px;
  margin-bottom: 20rpx;
  color: #414141;
}

.time-line {
  position: relative;
  display: flex;
  align-items: center;
  height: 60rpx;
  color: #9999A3;
}

.text {
  position: absolute;
  left: 0;
}

.pickers {
  display: flex;
  position: absolute;
  right: 0;
}

picker {
  display: flex;
  align-items: center;
}

.icon-down {
  width: 25rpx;
  height: 25rpx;
  margin-left: 20rpx;
}

.time {
  margin-left: 20rpx;
}


</style>
