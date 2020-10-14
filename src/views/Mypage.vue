<template>
  <div>
    <UpdateProfileImg ref='modal' :uid='$route.params.id'></UpdateProfileImg>
    <h1>マイページ</h1>
    <p>こんにちは、{{ loginUser.name }} さん</p>
    <p>プロフィール: {{ loginUser.profile | avoidEmpty }}</p>
    <div class='c-btn' @click='$refs.modal.isActive = true'>アイコンを変更する</div>
    <div class='c-btn' @click='signout'>ログアウトする</div>
  </div>
</template>

<script>
import UpdateProfileImg from '../components/UpdateProfileImg.vue'

export default {
  name: 'Profile',
  props: ['loginUser'],
  components: {UpdateProfileImg},
  created() {
    if (!this.loginUser) {
      this.$router.push('/signin')
    }
  },
  methods: {
    signout() {
      const _this = this
      this.$firebase.auth()
        .signOut()
        .then( () => {
          _this.$router.push('/')
        })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>