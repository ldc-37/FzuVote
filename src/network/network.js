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
          title: item.Title || '未命名',
          imgSrc: item.Pic ? item.Pic[0] : '',
          creator: typeCN,
          joinNum: item.JoinedNumber,
          // @接口没给
          voteNum: item.JoinedNumber,
          endTime: item.EndTime,
        })
      }
      return data
    }
    else {
      throw new Error(res.Status)
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
          title: item.Title || '未命名',
          imgSrc: item.Pic ? item.Pic[0] : '',
          creator: typeCN,
          joinNum: item.JoinedNumber,
          // @接口没给
          voteNum: item.JoinedNumber,
          endTime: item.EndTime,
        })
      }
      return data
    }
    else {
      throw new Error(res.Status)
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
      throw new Error(res.Status)
    }
  },
  // 图文模式
  async createImageText(data) {
    const res = await fly.post('/picvote/new', data)
    if (res.Status !== 200) {
      throw new Error(res.Status)
    }
    return res
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
        // 该模式没有host
        host: '-',
        title: res.Data.Title || '未命名',
        desc: res.Data.Describe || '未提供说明',
        voteTimeStart: res.Data.BeginTime.substr(0, res.Data.BeginTime.length - 3),
        voteTimeEnd: res.Data.EndTime.substr(0, res.Data.EndTime.length - 3),
        // signupTimeStart: '-',
        // signupTimeEnd: '-',
      }
      const voteData = []
      for (let item of res.Data.Data) {
        voteData.push({
          id: +item.ID,
          name: item.Name || "暂无姓名",
          desc: item.Describe || "暂无介绍",
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
    else {
      throw new Error(res.Status)
    }
  },
  async voteImageText(data) {
    return await fly.post('/picvote/vote', data)
  },
  // 评选模式
  async createElection(data) {
    const res = await fly.post('/election/new', data)
    if (res.Status !== 200) {
      throw new Error(res.Status)
    }
    return res
  },
  async getElection(id) {
    const res = await fly.get('/election/get/' + id)
    if (res.Status === 200) {
      // 注意空字符串数组、三目运算符与布尔值之间的关系
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
        host: res.Data.MasterInfo || '未填写',
        title: res.Data.Title || '未命名',
        desc: res.Data.Describe || '未提供说明',
        voteTimeStart: res.Data.BeginVoteTime.substr(0, res.Data.BeginVoteTime.length - 3),
        voteTimeEnd: res.Data.EndVoteTime.substr(0, res.Data.EndVoteTime.length - 3),
        signupTimeStart: res.Data.BeginApplyTime.substr(0, res.Data.BeginApplyTime.length - 3),
        signupTimeEnd: res.Data.EndApplyTime.substr(0, res.Data.EndApplyTime.length - 3),
      }
      const voteData = []
      // let tmpid = 1
      for (let item of res.Data.JoinedUser || []) {
        voteData.push({
          // id: +item.ID || tmpid++,
          id: +item.ID,
          name: item.Name || "暂无姓名",
          desc: item.Describe || "暂无介绍",
          image: item.Pic ? fly.config.baseURL + '/common/pic/' + item.Pic : '/static/images/no-pic.gif',
          vote: +item.Vote,
          // Voted: false
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
    else {
      throw new Error(res.Status)
    }
  },
  async voteElection(data) {
    const res = await fly.post('/election/vote', data)
    if (res.Status !== 200) {
      throw new Error(res.Status)
    }
  },
  async joinElection(data) {
    const res = await fly.post('election/join', data)
    if (res.Status !== 200) {
      throw new Error(res.Status)
    }
  },
  // 问卷模式
  async createQuestionnaire(data) {
    const res = await fly.post('questionnaire/new', data)
    if (res.Status !== 200) {
      throw new Error(res.Status)
    }
    return res
  },
  async getQuestionnaire(id) {
    const res = await fly.get('questionnaire/get_title/' + id)
    if (res.Status !== 200) {
      throw new Error(res.Status)
    }
    const list = []
    for (let question of res.Data) {
      list.push({
        question: question[0],
        // @临时限制
        limit: 1,
        options: question.slice(1, question.length)
      })
    }
    return list
  },
  async getQuestionnaireResult(id) {
    const res = await fly.get('/questionnaire/get/' + id)
    if (res.Status !== 200) {
      throw new Error(res.Status)
    }
    const data = []
    let order = 1
    for (let item of res.Data.Questionnaire) {
      data.push({
        order: order++,
        title: item.Title,
        // @临时方案
        options: Object.keys(item.Answers),
        num: Object.values(item.Answers)
      })
    }
    return {
      title: res.Data.Title,
      data,
      // begintime
      // endtime
    }
  },
  async voteQuestionnaire(data) {
    const res = await fly.post('/questionnaire/vote/', data)
    if (res.Status !== 200) {
      throw new Error(res.Status)
    }
    return res
  },


  // 用户信息
  async getUserStat(sid) {
    const res = await fly.get('/user/info/' + sid)
    if (res.Status === 200) {
      const data = {
        voteNum: res.Data.Joined_vote,
        launchNum: res.Data.Built_vote,
        prizeNum: res.Data.Win_history,
      }
      return data
    }
    else {
      throw new Error(res.Status)
    }
  },
  async getUserActivity(sid, type) {
    const res = await fly.get(`/user/get/${sid}/${type}`)
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
          // @接口没给
          voteNum: item.JoinedNumber,
          endTime: item.EndTime,
        })
      }
      return data
    }
    else {
      throw new Error(res.Status)
    }
  }
}

export default network