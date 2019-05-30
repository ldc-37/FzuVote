<template>
  <div class="image-uploader">
    <swiper
      :indicator-dots="limit !== 1"
      indicator-active-color="#0086F1"
      :current="swiperState"
      @change="handleSwiperChange"
    >
      <swiper-item v-for="(item, index) in imageFiles" :item-id="index" :key="index">
        <img :src="item" class="swiper-image" @click="previewImage">
        <div class="del-image" @click="deleteImage"></div>
      </swiper-item>
      <swiper-item v-show="imageFiles.length !== limit" :item-id="imageFiles.length" @click="parseImage" class="add-swiper">
        <img src="/static/images/icon_add.png" class="add-icon">
        <span>添加图片</span>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  props: ['limit'],
  data() {
    return {
      swiperState: 0,
      imageFiles: [],
      imagesId: []
    }
  },
  methods: {
    handleSwiperChange(e){
      this.swiperState = e.mp.detail.current
    },
    parseImage(e) {
      wx.chooseImage({
        count: this.limit,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          this.imageFiles = this.imageFiles.concat(res.tempFilePaths)
          for (let path of res.tempFilePaths) {
            wx.uploadFile({
              url: this.$fly.config.baseURL + '/common/pic',
              filePath: path,
              name: 'file',
              success: data => {
                this.imagesId.push(JSON.parse(data.data).Pic_id)
                this.$emit('update', this.imagesId)
              }
            })
          }
        }
      })
    },
    previewImage(e){
      wx.previewImage({
        current: e.mp.detail.current,
        urls: this.imageFiles
      })
    },
  },
}
</script>

<style scoped>
/* .image-uploader {
  width: 100%;
  height: 100%;
} */
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
</style>
