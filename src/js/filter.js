import Vue from 'vue'
import { database } from 'firebase'

Vue.filter('avoidEmpty', str => {
  if (!str) return '未設定'
  return str
})

Vue.filter('fullDate', date => {
  return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes()
})