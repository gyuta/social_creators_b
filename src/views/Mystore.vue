<template>
  <div>
    <Modal ref='LocModal'>
      <SetLocation :id='loginUser.id' @regist='$refs.LocModal.isActive = false'>></SetLocation>
    </Modal>
    <div class="c-btn" @click='$refs.LocModal.isActive = true'>位置情報を登録する</div>
    <div class="row">
      <div class="key">名前</div>
      <div class="value">{{ store.name }}</div>
    </div>
    <div class="row">
      <div class="key">ひとこと</div>
      <div class="value">{{ store.comment }}</div>
    </div>
    <div v-if="store.center">
      位置情報 {{ store.center.lat }},{{ store.center.lng }}
    </div>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue'
import SetLocation from '../components/SetLocation.vue'

export default {
  name: 'Mystore',
  data() {
    return {
      store: {}
    }
  },
  props: ['loginUser'],
  components: {Modal, SetLocation},
  async created() {
    if (this.loginUser.kind !== 'owner') {
      this.$router.push('/')
    }
    const _this = this
    await this.$firebase.firestore().collection('stores')
      .doc(this.loginUser.id)
      .get()
      .then( result => {
        if (result.exists) {
          _this.store = result.data()
        } else {
          alert('ストア情報が存在しません')
        }
      })
  },
  methods: {
    getStoreInfo() {
      const _this = this
      this.$firebase.firestore().collection('stores')
        .doc(this.loginUser.id)
        .get()
        .then( result => {
          if (result.exists) {
            _this.store = result.data()
          } else {
            alert('ストア情報が存在しません')
          }
        })
      }
  }
}
</script>

<style>

</style>