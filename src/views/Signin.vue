<template>
  <div>
    <h1>ログイン</h1>
    <div class="field">
      <label>メールアドレス</label>
      <input type="text" placeholder=" " v-model="email" />
    </div>
    <div class="field">
      <label>パスワード</label>
      <input type="password" placeholder=" " v-model="password" />
    </div>
    <div class='c-btn' @click='signin'>ログインする</div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signin() {
      this.$firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch( err => {
          alert('エラーが発生しました', err)
        })
    }
  }
}
</script>

<style>

</style>