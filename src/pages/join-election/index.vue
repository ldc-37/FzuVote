<template>
  <div class="join-election">
    <div class="one-part">
      <div class="one-line">
        <span class="attr">参赛名</span>
        <input type="text" v-model.lazy="name">
      </div>
      <div class="one-line">
        <!-- <span class="attr">微信号</span> -->
        <span class="attr">手机号</span>
        <input type="text" v-model.lazy="wechatId" placeholder="仅主办方可见">
      </div>
    </div>
    <div class="one-part">
      <p class="attr-line">参赛图片</p>
      <div class="upload" @click="uploadImage">
        <img src="/static/images/icon_add.png" v-if="!imageUrl" class="icon-add">
        <img :src="imageUrl" v-else class="upload-image">
      </div>
    </div>
    <div class="one-part no-border">
      <p class="attr-line">参赛介绍<span class="gray-font">（建议300字以内）</span></p>
      <textarea v-model.lazy="desc" placeholder="请输入参赛说明的内容描述"></textarea>
    </div>
    <div class="btn-area">
      <button class="btn" hover-class="btn-hover" @click="signup" :loading="btnLoading">报名</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      wechatId: '',
      // image: '',
      imageUrl: '',
      desc: '',
      btnLoading: false,
    }
  },
  methods: {
    uploadImage() {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          // this.image = res.tempFilePaths[0]
          wx.uploadFile({
            url: this.$fly.config.baseURL + '/upload?session_id=' + this.$store.state.sessionId,
            filePath: res.tempFilePaths[0],
            name: 'file',
            success: data => {
              // 似乎返回内层无Data项
              this.imageUrl = JSON.parse(data.data).FileUrl
            }
          })
        }
      })
    },
    async signup() {
      this.btnLoading = true
      const resCode = await this.$net.joinElection({
        "Title": this.name,
        "Pic": [this.imageUrl],
        "Describe": this.desc,
        "ElectionId": +this.$mp.query.id,
        // "WechatNumber": this.wechatId,
        "PhoneNumber": this.wechatId,
        "SessionId": this.$store.state.sessionId,
      })
      this.btnLoading = false
      if (resCode) {
        wx.showModel({
          title: '报名失败',
          content: '请尝试重新申请。错误码' + resCode
        })
      } else {
        wx.showToast({
          title: '报名成功'
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1000);
      }
    }
  },
}
</script>

<style scoped>
.join-election {
  font-size: 14px;
  color: #414141;
}

.one-part {
  padding: 30rpx 50rpx;
  border-bottom: 7px solid #EEEEF0;
}

.one-line {
  display: flex;
  margin-bottom: 30rpx;
}

.attr {
  margin-right: 30rpx;
}

.attr-line {
  margin-bottom: 25rpx;
}

.upload {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 280rpx;
  height: 280rpx;
  margin: 10rpx 0;
  background: #EFEFF0;
  border-radius: 10px;
}

.icon-add {
  width: 70rpx;
  height: 70rpx;
}

.upload-image {
  width: 100%;
  height: 100%;
}

input {
  width: 500rpx;
  text-align: center;
  border-bottom: 1px solid #aaa;
}

textarea {
  width: 650rpx;
  height: 200rpx;
  padding: 30rpx 40rpx;
  box-sizing: border-box;
  background: #EFEFF0;
  border-radius: 10px;
  font-size: 12px;
}

.btn-area {
  margin-top: 70rpx;
  margin-bottom: 50rpx;
}


.no-border {
  border: none;
}

</style>
