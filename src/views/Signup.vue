<template>
  <div>
    <h1>新規登録</h1>
    <div class="field">
      <label>ニックネーム</label>
      <input type="text" placeholder=" " v-model="name" />
    </div>
    <div class="field">
      <label>メールアドレス</label>
      <input type="text" placeholder=" " v-model="email" />
    </div>
    <div class="field">
      <label>パスワード</label>
      <input type="password" placeholder=" " v-model="password" />
    </div>
    <div class='c-btn' @click='create'>
      登録する
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    create() {
      const _this = this
      this.$firebase.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then( result => {
          _this.$firebase.firestore().collection('users')
            .doc(result.user.uid)
            .set({
              id: result.user.uid,
              name: _this.name,
              icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3SUoeX6jEyFqg80JJfDfkHFJIJZxE76crNg&usqp=CAU'
            })
            .then( () => {
              _this.$router.push({name: 'profile', params: {id: result.user.uid}})
            })
        })
        .catch( err => {
          alert('エラーが発生しました', err)
        });
    }
  }
}
</script>

<style>

</style>