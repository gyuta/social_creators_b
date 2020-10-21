<template>
  <div>
    <Modal ref='ProfileModal'>
      <UpdateProfile :user='loginUser' @send="$refs.ProfileModal.isActive = false; $emit('getUser')"></UpdateProfile>
    </Modal>
    <Modal ref='IconModal'>
      <UpdateIcon :uid='loginUser.id' @update="$refs.IconModal.isActive = false; $emit('getUser')"></UpdateIcon>
    </Modal>
    <Modal ref='QR'>
      <ShowQR :id='loginUser.id'></ShowQR>
    </Modal>
    <Modal ref='ReadQR'>
      <ReadQR :storeId='loginUser.id'></ReadQR>
    </Modal>
    <h1>マイページ</h1>
    <p>こんにちは、{{ loginUser.name }} さん</p>
    <p>プロフィール: {{ loginUser.profile | avoidEmpty }}</p>
    <div class='c-btn' @click='$refs.ProfileModal.isActive = true'>プロフィールを変更する</div>
    <div class='c-btn' @click='$refs.IconModal.isActive = true'>アイコンを変更する</div>
    <br>
    <div class="c-btn" @click='$refs.QR.isActive = true'>QRコードを表示</div>
    <br>
    <br>
    <div v-if="isOwner">
      <div class="c-btn" @click='$refs.ReadQR.isActive = true'>QRコードを読み取る</div>
      <div class="c-btn" v-if="isOwner" @click="$router.push('\mystore')">店舗情報へ</div>
    </div>
    <br>
    <br>
    <div class='c-btn' @click='signout'>ログアウトする</div>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue'
import UpdateProfile from '../components/UpdateProfile.vue'
import UpdateIcon from '../components/UpdateIcon.vue'
import ReadQR from '../components/ReadQR.vue'
import ShowQR from '../components/ShowQR.vue'

export default {
  name: 'Profile',
  props: ['loginUser'],
  components: {Modal, UpdateProfile, UpdateIcon, ReadQR, ShowQR},
  data() {
    return {
      isOwner: this.loginUser.kind === 'owner'
    }
  },
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