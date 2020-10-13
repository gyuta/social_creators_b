<template>
  <div>
    <h1>マイページ</h1>
    <p>こんにちは、{{ loginUser.name }} さん</p>
    <div class='c-btn' @click='signout'>ログアウトする</div>
  </div>
</template>

<script>

export default {
  name: 'Profile',
  props: ['loginUser'],
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

<style>

</style>