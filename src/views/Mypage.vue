<template>
  <div>
    <UpdateProfileImg ref='modal1' :uid='$route.params.id'></UpdateProfileImg>
    <Modal ref='ProfileModal'>
      <UpdateProfile :user='loginUser' @send="$refs.ProfileModal.isActive = false; $emit('getUser')"></UpdateProfile>
    </Modal>
    <Modal ref='IconModal'>
      <UpdateIcon :uid='loginUser.id' @update="$refs.IconModal.isActive = false; $emit('getUser')"></UpdateIcon>
    </Modal>
    <h1>マイページ</h1>
    <p>こんにちは、{{ loginUser.name }} さん</p>
    <p>プロフィール: {{ loginUser.profile | avoidEmpty }}</p>
    <div class='c-btn' @click='$refs.ProfileModal.isActive = true'>プロフィールを変更する</div>
    <div class='c-btn' @click='$refs.IconModal.isActive = true'>アイコンを変更する</div>
    <br>
    <div class='c-btn' @click='signout'>ログアウトする</div>
  </div>
</template>

<script>
import UpdateProfileImg from '../components/UpdateProfileImg.vue'
import Modal from '../components/Modal.vue'
import UpdateProfile from '../components/UpdateProfile.vue'
import UpdateIcon from '../components/UpdateIcon.vue'

export default {
  name: 'Profile',
  props: ['loginUser'],
  components: {UpdateProfileImg, Modal, UpdateProfile, UpdateIcon},
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