<template>
  <div>
    <!-- <UpdateProfileImg ref='modal' :uid='$route.params.id'></UpdateProfileImg> -->
    <h1>マイページ</h1>
    <p>こんにちは、{{ loginUser.name }} さん</p>
    <div class='c-btn' @click='$refs.modal.isActive = true'>アイコンを変更する</div>
    <div class='c-btn' @click='signout'>ログアウトする</div>
  </div>
</template>

<script>
// import UpdateProfileImg from '../components/UpdateProfileImg.vue'

export default {
  name: 'Profile',
  data() {
    return {
      uid: this.$route.params.id,
      isOwner: false
    }
  },
  props: ['loginUser'],
  // components: {UpdateProfileImg},
  created() {
    this.isOwner = (this.userInfo && this.userInfo.uid === this.uid)

    const _this = this;
    this.$firebase.firestore().collection('user')
      .where('uid', '==', this.uid)
      .get()
      .then(function (qs) {
        qs.forEach( doc => {
          _this.user = doc.data()
        })
      })

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