<!--
功能：上传并预览图片
参数：limit: Number  最大上传数量
事件：update  更新图片ID数组
-->
<template>
  <div class="image-uploader">
    <swiper
      :indicator-dots="limit !== 1"
      indicator-active-color="#0086F1"
      :current="swiperState"
      @change="handleSwiperChange"
    >
      <swiper-item v-for="(item, index) in imagesUrl" :item-id="index" :key="index">
        <img :src="item" class="swiper-image" mode="center" @click="previewImage">
        <!-- TODO: 删除时如果有草稿中的图片（真实url和tmpUrl混合？）会产生异常 -->
        <!-- <div class="del-image" @click="deleteImage">×</div> -->
      </swiper-item>
      <swiper-item v-if="imagesUrl.length < limit" :item-id="imagesUrl.length" @click="parseImage" class="add-swiper">
        <img src="/static/images/icon_add.png" class="add-icon">
        <span>添加图片</span>
      </swiper-item>
    </swiper>
    <!-- <span class="clear-img" @click="clearImages">全部清空</span> -->
  </div>
</template>

<script>
export default {
  props: {
    limit: Number,
    initImages: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      swiperState: 0,
      // concat返回一个新数组，新api这里应该直接是图片url
      imagesUrl: this.initImages.concat(),
      // imagesId: deprecated
    }
  },
  methods: {
    handleSwiperChange(e) {
      console.log(e)
      // TODO:
      this.swiperState = Math.min(e.mp.detail.current, this.limit)
    },
    parseImage(e) {
      if (this.imagesUrl.length === this.limit) {
        mpvue.showToast({
          title: '图片数量达到上限',
          icon: 'none'
        })
      }
      wx.chooseImage({
        count: this.limit,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          for (let path of res.tempFilePaths) {
            wx.uploadFile({
              url: this.$fly.config.baseURL + '/upload?session_id=' + this.$store.state.sessionId,
              filePath: path,
              name: 'file',
              success: data => {
                // TODO: 有问题
                this.swiperState = Math.min(this.imagesUrl.length, this.limit - 1)
                // this.imagesUrl = this.imagesUrl.concat(res.tempFilePaths)
                // 这里返回的内层应该没有Data
                this.imagesUrl.push(JSON.parse(data.data).FileUrl)
                this.$emit('update', this.imagesUrl)
              }
            })
          }
        }
      })
    },
    previewImage(e) {
      wx.previewImage({
        current: e.mp.detail.current,
        urls: this.imagesUrl
      })
    },
    // deleteImage() {
    //   this.imagesUrl.splice(this.swiperState, 1)
    //   this.imagesId.splice(this.swiperState, 1)
    //   this.swiperState && this.swiperState--
    //   this.$emit('update', this.imagesId)
    // },
    clearImages() {
      this.swiperState = 0
      this.imagesUrl = []
      // this.imagesId = []
      this.$emit('update', this.imagesUrl)
      // this.$emit('update', this.imagesId)
    }
  },
  created() {
    // 无需，目前改为直接存url
    // this.imagesUrl = this.imagesId.map(item => `${this.$fly.config.baseURL}/common/pic/${item}`)
  },
}
</script>

<style scoped>

swiper {
  height: 220rpx;
}

.swiper-image {
  background: rgba(173, 216, 230, 0.253);
  width: 100%;
  height: 100%;
}

.add-swiper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(173, 216, 230, 0.24);
}

.add-icon{
  width: 50rpx;
  height: 50rpx;
}

.del-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 18px;
  height: 18px;
  line-height: 18px;
  background: #fff;
  color: red;
  text-align: center;
  opacity: .8;
}

.clear-img {
  color: #c2c5c8;
  float: right;
  font-size: 12px;
}
</style>
