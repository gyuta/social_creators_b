import Vue from 'vue'

Vue.filter('avoidEmpty', str => {
  if (!str) return '未設定'
  return str
})