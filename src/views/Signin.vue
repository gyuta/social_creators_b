<template>
  <div>
    <Title title='ログイン' :showBackBtn="false"></Title>
    <div class="main">
      <div class="field">
        <label>メールアドレス</label>
        <input type="text" placeholder=" " v-model="email" />
      </div>
      <div class="field">
        <label>パスワード</label>
        <input type="password" placeholder=" " v-model="password" />
      </div>
      <div class='btn' @click='signin'>ログインする</div>
      <div class="btn new" @click="$router.push('signup')">新規登録する</div>
    </div>
  </div>
</template>

<script>
import Title from '../components/Title.vue'

export default {
  name: 'Signin',
  components: {Title},
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

<style scoped lang='scss'>

.main {
  padding: 20px;
}

label {
  display: block;
  margin-top: 20px;
}
.field {
  input {
    padding-left: 20px;
    border-radius: 40px;
    outline: none;
    border: black solid 1px;
    margin-left: 20px;
    width: 280px;

  }
}

.field2 {
  margin-top: 20px;
}

.btn {
  cursor: pointer;
  width: 200px;
  background-color: var(--yellow);
  text-align: center;
  margin: 0 auto;
  padding: 4px 8px;
  color: white;
  border-radius: 10px;
  margin-top: 40px;
}

.new {
  background-color: white;
  color: var(--yellow);
  border: 1px solid var(--yellow);
  margin-top: 20px;
}

</style>