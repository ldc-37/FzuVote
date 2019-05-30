function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

let getRemainTime = (endTime) => {
  let t = endTime - Date.parse(new Date())
  let seconds = Math.floor((t / 1000) % 60)
  let minutes = Math.floor((t / 1000 / 60) % 60)
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24)
  let days = Math.floor(t / (1000 * 60 * 60 * 24))
  return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
  }
}

export default {
  formatNumber,
  formatTime,
  getRemainTime
}
