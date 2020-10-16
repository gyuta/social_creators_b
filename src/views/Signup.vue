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
    <div class="field">
      <div>
        <input type="radio" id="guest" value="guest" name='kind' v-model="kind" checked>
        <label for="guest">ゲスト</label>
      </div>
      <div>
        <input type="radio" id="owner" value="owner" name='kind' v-model="kind" >
        <label for="owner">お店の人</label>
      </div>
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
      password: "",
      kind: 'guest'
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
              icon: 'https://firebasestorage.googleapis.com/v0/b/social-creators-b.appspot.com/o/userIcon%2Fdefault.png?alt=media&token=03423779-f433-4d38-85d6-d5c1e96cc81e',
              kind: _this.kind
            })
            .then( async () => {
              if (_this.kind === 'owner') {
                await this.$firebase.firestore().collection('stores')
                  .doc(result.user.uid)
                  .set({
                    createdAt: _this.$firebase.firestore.FieldValue.serverTimestamp()
                  })
              }
              _this.$router.push('\mypage')
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