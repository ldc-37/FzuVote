import store from '../store/store'

var Fly = require("flyio/dist/npm/wx")
const fly = new Fly
fly.interceptors.request.use(req => {
  console.info(req)
})
fly.interceptors.response.use(res => {
  console.info(res)
  const code = res.data.ErrorCode
  if (code) {
    console.log(`错误码：${code}\n错误信息：${ErrorTips(code)}`)
    mpvue.showModel({
      title: '服务器报错',
      content: `错误码：${code}\n错误信息：${ErrorTips(code)}`,
      showCancel: false
    })
    // 需要后续处理出错，此处似乎不能reject
    // return Promise.reject(response)
  }
  return res.data
}, error => {
  if (error.toString().includes('timeout')) {
    mpvue.showToast({
      title: '网络超时，请重启小程序或稍后再试。',
      icon: 'none'
    })
  }
  return Promise.reject(error)
})
fly.config.baseURL = 'https://sugarchl.top/api'
// fly.config.baseURL = ''

const SessionId = () => store.state.sessionId


const network = {
  async getLatest() {
    const res = await fly.get('/latest')
    if (!res.ErrorCode) {
      const data = []
      for (let item of res.Data) {
        let typeCN
        switch (item.ActivityType) {
          case 'election': typeCN = '评选模式'; break;
          case 'questionnaire': typeCN = '问卷模式'; break;
          case 'picvote': typeCN = '图文模式'; break;
          default: console.error('ERROR type:' + item.ActivityType)
        }
        data.push({
          id: item.ActivityId,
          type: item.ActivityType,
          title: item.Title || '未命名',
          imgSrc: item.SharePic[0] || '/static/images/no-pic.gif',
          creator: typeCN,
          joinNum: item.AllParticipantNumber,
          voteNum: item.AllPollNumber,
          endTime: item.EndTime,
        })
      }
      return data
    }
    else {
      throw new Error(res.ErrorCode)
    }
  },
  async getHottest() {
    const res = await fly.get('/hotest')
    if (!res.ErrorCode) {
      const data = []
      for (let item of res.Data) {
        let typeCN
        switch (item.ActivityType) {
          case 'election': typeCN = '评选模式'; break;
          case 'questionnaire': typeCN = '问卷模式'; break;
          case 'picvote': typeCN = '图文模式'; break;
          default: console.error('ERROR type:' + item.ActivityType)
        }
        data.push({
          id: item.ActivityId,
          type: item.ActivityType,
          title: item.Title || '未命名',
          imgSrc: item.SharePic[0] || '/static/images/no-pic.gif',
          creator: typeCN,
          joinNum: item.AllParticipantNumber,
          voteNum: item.AllPollNumber,
          endTime: item.EndTime,
        })
      }
      return data
    }
    else {
      throw new Error(res.ErrorCode)
    }
  },
  async search(word) {
    const res = await fly.get('/search?keyword=' + word)
    if (!res.ErrorCode) {
      const data = []
      for (let item of res.Data) {
        let typeCN
        switch (item.ActivityType) {
          case 'election': typeCN = '评选模式'; break;
          case 'questionnaire': typeCN = '问卷模式'; break;
          case 'picvote': typeCN = '图文模式'; break;
          default: console.error('ERROR type:' + item.type)
        }
        data.push({
          id: item.ActivityId,
          type: item.ActivityType,
          title: item.Title,
          imgSrc: item.SharePic[0] || '',
          creator: typeCN,
          joinNum: item.AllParticipantNumber,
          voteNum: item.AllPollNumber,
          endTime: item.EndTime,
          // ?: BeginTime
        })
      }
      return data
    }
    return res.ErrorCode
  },
  /////////////// 图文模式
  async createImageText(data) {
    const res = await fly.post('/picvote/new', data)
    if (!res.ErrorCode) {
      return res
    }
    return res.ErrorCode
  },
  async getImageText(id) {
    const res = await fly.get(`/picvote?id=${id}&session_id=${SessionId()}`)
    if (!res.ErrorCode) {
      // 注意空字符串数组、三目运算符与布尔值之间的关系
      const swiperImage = res.Data.SharePic[0]
          ? res.Data.SharePic
          : ['/static/images/no-pic.gif']
      const statistic = {
        signed: res.Data.AllJoinedNumber,
        voted: res.Data.AllPollNumber,
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
          id: +item.SId,
          name: item.Title || "暂无姓名",
          desc: item.Describe || "暂无介绍",
          image: item.Pic || '/static/images/no-pic.gif',
          Num: +item.Poll,
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
    return res.ErrorCode
  },
  async voteImageText(data) {
    return await fly.post('/picvote/vote', data)
  },
  /////////////// 评选模式
  async createElection(data) {
    const res = await fly.post('/election/new', data)
    if (!res.ErrorCode) {
      return res
    }
    return res.ErrorCode
  },
  async getElection(id) {
    const res = await fly.get(`/election?id=${id}&session_id=${SessionId()}`)
    if (!res.ErrorCode) {
      // 注意空字符串数组、三目运算符与布尔值之间的关系
      const swiperImage = res.Data.SharePic[0]
          ? res.Data.SharePic
          : ['/static/images/no-pic.gif']
      const statistic = {
        signed: res.Data.AllJoinedNumber,
        voted: res.Data.AllPollNumber,
        visited: res.Data.PageView,
        leftTime: {}
      }
      ////////////////////////////////TODO: 缺少一类时间
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
      for (let item of res.Data.Data || []) {
        voteData.push({
          id: +item.SId,
          name: item.Title || "暂无姓名",
          desc: item.Describe || "暂无介绍",
          image: item.Pic || '/static/images/no-pic.gif',
          /////////////////////////////////////TODO: 这个Poll是状态还是计数
          vote: +item.Poll,
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
    return res.ErrorCode
  },
  async voteElection(data) {
    const res = await fly.post('/election/vote', data)
    if (res.ErrorCode) {
      return res.ErrorCode
    }
  },
  async joinElection(data) {
    const res = await fly.post('election/apply', data)
    if (res.ErrorCode) {
      return res.ErrorCode
    }
  },
  /////////////// 问卷模式
  async createQuestionnaire(data) {
    const res = await fly.post('questionnaire/new', data)
    if (!res.ErrorCode) {
      return res
    }
    return res.ErrorCode
  },
  async getQuestionnaire(id) {
    const res = await fly.get(`/questionnaire?id=${id}&session_id=${SessionId()}`)
    if (res.ErrorCode) {
      return res.ErrorCode
    }
    const list = []
    for (let question of res.Questionnaire) {
      list.push({
        question: question.Title,
        limit: 1, // @临时限制
        // Option是二维数组，第二维的第二个元素在未做题时始终为-1，故过滤掉
        options: question.Options.map(item => item[0])
      })
    }
    return {
      list,
      title: res.Title
    }
  },
  async getQuestionnaireResult(id) {
    const res = await fly.get(`/questionnaire?id=${id}&session_id=${SessionId()}`)
    if (res.ErrorCode) {
      return res.ErrorCode
    }
    const data = []
    // let order = 1
    // for (let item of res.Data.Questionnaire) {
    //   data.push({
    //     order: order++,
    //     title: item.Title,
    //     // @临时方案
    //     options: Object.keys(item.Answers),
    //     num: Object.values(item.Answers)
    //   })
    // }
    res.Data.Questionnaire.forEach((item, index) => {
      data.push({
        order: index + 1,
        title: item.Title,
        options: item.Options.map(arr => arr[0]),
        num: item.Options.map(arr => arr[1])
      })
    })
    return {
      title: res.Data.Title,
      data,
      // begintime
      // endtime
    }
  },
  async voteQuestionnaire(data) {
    const res = await fly.post('/questionnaire/vote/', data)
    if (!res.ErrorCode) {
      return res
    }
    return res.ErrorCode
  },


  // 用户信息
  async getUserStat(sid) {
    const res = await fly.get('/user/info?session_id=' + sid)
    if (!res.ErrorCode) {
      const data = {
        voteNum: res.Data.joined_record,
        launchNum: res.Data.built_record,
        prizeNum: res.Data.win_record,
      }
      return data
    }
    return res.ErrorCode
  },
  async getUserActivity(sid, type) {
    // const res = await fly.get(`/user/get/${sid}/${type}`)
    const res = await fly.get(`/user/joined_record?session_id=${SessionId()}`)
    if (!res.ErrorCode) {
      const data = []
      for (let item of res.Data) {
        let typeCN
        switch (item.ActivityType) {
          case 'election': typeCN = '评选模式'; break;
          case 'questionnaire': typeCN = '问卷模式'; break;
          case 'picvote': typeCN = '图文模式'; break;
          default: console.error('ERROR type:' + item.ActivityType)
        }
        data.push({
          id: item.ActivityId,
          type: item.ActivityType,
          title: item.Title,
          imgSrc: item.SharePic[0] || '',
          creator: typeCN,
          joinNum: item.Participant,
          voteNum: item.AllPoll,
          endTime: item.EndVoteTime,
        })
      }
      return data
    }
    return res.ErrorCode
  }
  // async getUserActivity() {
  //   const res = await fly.get(`/user/joined_record?session_id=${SessionId()}`)
  // }
}

export default network

function ErrorTips(code) {
  switch (code.toString()) {
    case '40001': return '数据库错误'
    case '40002': return '数据格式错误'
    case '40011': return '腾讯的锅'
    case '40020': return '用户不存在'
    case '40100': return '该活动ID不存在'
    case '40200': return '活动设置不合理，比如 开始投票时间>=结束投票时间'
    case '40210': return '重复投票'
    case '40220': return '不在活动时间内，投票时间早于开始投票时间，晚于结束投票时间'
    // 此处throw Error无人catch= =
    default: console.error('Invalid ErrorTips() param')
  }
}
