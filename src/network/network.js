var Fly = require("flyio/dist/npm/wx")
const fly = new Fly
fly.interceptors.request.use(req => {
  console.info(req)
})
fly.interceptors.response.use(res => {
  console.info(res)
  return res.data
})
fly.config.baseURL = 'http://119.23.35.17:8080/api'


const network = {
  async getLatest() {
    const res = await fly.get('/common/latest')
    if (res.Status === 200) {
      const data = []
      for (let item of res.Data) {
        let typeCN
        switch (item.Type) {
          case 'Election': typeCN = '评选模式'; break;
          case 'Questionnaire': typeCN = '问卷模式'; break;
          case 'Picvote': typeCN = '图文模式'; break;
          default: throw new Error('ERROR type:' + item.Type)
        }
        data.push({
          id: item.Id,
          type: item.Type,
          title: item.Title,
          imgSrc: item.Pic ? item.Pic[0] : '',
          creator: typeCN,
          joinNum: item.JoinedNumber,
          voteNum: item.JoinedNumber,
          endTime: item.EndTime,
        })
      }
      return data
    }
  },
  async getHottest() {
    const res = await fly.get('/common/hotest')
    if (res.Status === 200) {
      const data = []
      for (let item of res.Data) {
        let typeCN
        switch (item.Type) {
          case 'Election': typeCN = '评选模式'; break;
          case 'Questionnaire': typeCN = '问卷模式'; break;
          case 'Picvote': typeCN = '图文模式'; break;
          default: throw new Error('ERROR type:' + item.Type)
        }
        data.push({
          id: item.Id,
          type: item.Type,
          title: item.Title,
          imgSrc: item.Pic ? item.Pic[0] : '',
          creator: typeCN,
          joinNum: item.JoinedNumber,
          voteNum: item.JoinedNumber,
          endTime: item.EndTime,
        })
      }
      return data
    }
  },
  async search(word) {
    const res = await fly.get('/common/search/' + word)
    if (res.Status === 200) {
      const data = []
      for (let item of res.Data) {
        let typeCN
        switch (item.Type) {
          case 'Election': typeCN = '评选模式'; break;
          case 'Questionnaire': typeCN = '问卷模式'; break;
          case 'Picvote': typeCN = '图文模式'; break;
          default: throw new Error('ERROR type:' + item.type)
        }
        data.push({
          id: item.Id,
          type: item.Type,
          title: item.Title,
          imgSrc: item.Pic ? item.Pic[0] : '',
          creator: typeCN,
          joinNum: item.JoinedNumber,
          voteNum: item.JoinedNumber,
          endTime: item.EndTime,
        })
      }
      return data
    }
    else {
      console.log(this.Status)
    }
  },
  // 图文模式
  async createImageText(data) {
    return await fly.post('/picvote/new', data)
  },
  async getImageText(id) {
    const res = await fly.get('/picvote/get/' + id)
    if (res.Status === 200) {
      // @注意空字符串数组、三目运算符与布尔值之间的关系
      const swiperImage = +res.Data.SharePic 
          ? res.Data.SharePic.map(item => fly.config.baseURL + '/common/pic/' + item)
          : ['/static/images/no-pic.gif']
      const statistic = {
        signed: res.Data.JoinedNumber,
        voted: res.Data.VotedNumber,
        visited: res.Data.PageView,
        leftTime: {}
      }
      const voteInfo = {
        // 接口没给host
        host: '',
        title: res.Data.Title,
        desc: res.Data.Describe,
        // TODO:substring
        voteTimeStart: res.Data.BeginTime,
        voteTimeEnd: res.Data.EndTime,
        // signupTimeStart: '-',
        // signupTimeEnd: '-',
      }
      const voteData = []
      for (let item of res.Data.Data) {
        voteData.push({
          id: +item.ID,
          name: item.Name || "暂无",
          desc: item.Describe || "暂无",
          image: item.Pic ? fly.config.baseURL + '/common/pic/' + item.Pic : '/static/images/no-pic.gif',
          Num: +item.Vote,
          Voted: false
        })
      }
      const data = {
        swiperImage,
        statistic,
        voteInfo,
        voteData
      }
      return data
    }
  }
}

export default network