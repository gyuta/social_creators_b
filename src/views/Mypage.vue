<template>
  <div>
    <Modal ref='ProfileModal'>
      <UpdateProfile :user='loginUser' @send="$refs.ProfileModal.isActive = false; $emit('getUser')"></UpdateProfile>
    </Modal>
    <Modal ref='IconModal'>
      <UpdateIcon :uid='loginUser.id' @update="$refs.IconModal.isActive = false; $emit('getUser')"></UpdateIcon>
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
    <StampCardModal ref='stamp' :count='count'></StampCardModal>
    <div class="tab">
      <div class="item" @click="$router.push('/greeding_rank')">
        <div class="value">
          <img src="https://i.imgur.com/ZcyAtEh.png" alt="">
        </div>
        <div class="st">挨拶ランク</div>
      </div>
      <div class="item middle" @click="$router.push('/greeding_count')">
        <div class="value big">{{ loginUser.count }}回</div>
        <div class="st">総挨拶回数</div>
      </div>
      <div class="item">
        <div class="value">
          京都府京都市左京区
        </div>
        <div class="st">登録地域</div>
      </div>
    </div>
    <br>
    <div class='c-btn' @click='$refs.ProfileModal.isActive = true'>プロフィールを変更する</div>
    <div class='c-btn' @click='$refs.IconModal.isActive = true'>アイコンを変更する</div>
    <br>
    <div v-if="isOwner">
      <div class="c-btn" @click='$refs.ReadQR.isActive = true'>QRコードを読み取る</div>
      <div class="c-btn" v-if="isOwner" @click="$router.push('\mystore')">店舗情報へ</div>
    </div>
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
import StampCardModal from '../components/StampCardModal.vue'

export default {
  name: 'Profile',
  props: ['loginUser'],
  components: {Modal, UpdateProfile, UpdateIcon, ReadQR, ShowQR, StampCardModal},
  data() {
    return {
      isOwner: this.loginUser.kind === 'owner',
      change: false,
      count: this.loginUser.count
    }
  },
  created() {
    if (!this.loginUser) {
      this.$router.push('/signin')
    }

    const _this = this

    this.$firebase.firestore()
      .collection('users')
      .doc(this.loginUser.id)
      .onSnapshot(doc => {
        if (_this.change) {
          _this.count = doc.data().count
          _this.$refs.stamp.show()
        } else {
          _this.change = true
        }
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

.tab {
  display: flex;
  border-top: solid gray 1px;
  border-bottom: solid gray 1px;

  .item {
    flex-basis: 33.3%;
    text-align: center;
    padding: 10px;
    position: relative;
    cursor: pointer;

    &.middle {
      border-left: 1px solid black;
      border-right: 1px solid black;
    }

    .value {
      margin-bottom: 10px;
      img {
        margin: 0 auto;
        height: 50px; 
      }

      &.big {
        font-size: 1.5rem;
      }
    }

    .st {
      position: absolute;
      bottom: 5px;
      font-size: 8px;
    }
  }

}
</style>