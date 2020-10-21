<template>
  <div>
    <Modal ref='ProfileModal'>
      <UpdateProfile :user='loginUser' @send="$refs.ProfileModal.isActive = false; $emit('getUser')"></UpdateProfile>
    </Modal>
    <Modal ref='IconModal'>
      <UpdateIcon :uid='loginUser.id' @update="$refs.IconModal.isActive = false; $emit('getUser')"></UpdateIcon>
    </Modal>
    <Modal ref='QR'>
    </Modal>
    <Modal ref='ReadQR'>
      <ReadQR :storeId='loginUser.id'></ReadQR>
    </Modal>
    <div class="user-info">
      <img :src="loginUser.icon" alt="">
      <div class="name">{{ loginUser.name }} さん</div>
    </div>
    <div class="QR-wrap">
      <ShowQR :id='loginUser.id'></ShowQR>
    </div>
    <div class="row top">
      <div class="key">総挨拶回数</div>
      <div class="value">19回</div>
    </div>
    <div class="row">
      <div class="key">登録地域</div>
      <div class="value">京都府京都市左京区</div>
    </div>
    <br>
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

.QR-wrap {
  text-align: center;
}

.user-info {
  display: flex;
  align-items: center;
  margin-left: 20px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }

  .name {
    padding: 20px;
  }
}

.icon-wrap {
  margin-bottom: 10px;

  img {
    width: 150px;
    height: 150px;
    border-radius: 150px;
    margin: 0 auto;
  }
}

.top {
  border-top: 1px solid gray;
}

.row {
  display: flex;
  padding: 5px 20px;
  border-bottom: 1px solid gray;

  &:first-of-type {
    border-top: 1px solid gray;
  }

  .value {
    flex-grow: 1;
    text-align: right;
  }
}
</style>