<template>
  <div>
    <h1>マイページ</h1>
    <div @click='signout'>ログアウトする</div>
  </div>
</template>

<script>

export default {
  name: 'Profile',
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