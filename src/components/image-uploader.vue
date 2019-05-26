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
      <swiper-item v-if="imageFiles.length !== limit" :item-id="imageFiles.length" @click="chooseImage" class="add-swiper">
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
    }
  },
  methods: {
    handleSwiperChange(e){
      this.swiperState = e.mp.detail.current
    },
    chooseImage(e) {
      wx.chooseImage({
        count: this.limit,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          this.imageFiles = this.imageFiles.concat(res.tempFilePaths)
        }
      })
    },
    previewImage(e){
      wx.previewImage({
        current: e.mp.detail.current,
        urls: this.imageFiles
      })
    },
    uploadImage() {
      wx.showLoading({
        title: '加载中',//数据请求前loading，提高用户体验
      })
      // await this._upload(imageFiles[0])
    },
    async _upload(path) {
      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: this.$fly.config.baseURL + '/',
          filePath: path,
          name: 'file',
          success: (data, statusCode) => {
            if(res.statusCode !== 200){
              wx.showToast({
                title: "上传图片失败，请稍后再试",
                icon: "none"
              });
              return false;
            }
            resolve(res.data);
          },
          failed: (err) => {
            console.log(err)
            reject(err)
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      })
    }
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
