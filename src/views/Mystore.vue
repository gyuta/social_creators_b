<template>
  <div>
    <Modal ref='UpdateModal'>
      <UpdateStoreInfo v-if="store" :store='store' @updated='$refs.UpdateModal.isActive = false; getStoreInfo()'></UpdateStoreInfo>
    </Modal>
    <Modal ref='LocModal'>
      <SetLocation :id='loginUser.id' @regist='$refs.LocModal.isActive = false'>></SetLocation>
    </Modal>
    <div class="c-btn" @click='$refs.UpdateModal.isActive = true'>店舗情報を登録する</div>
    <div class="c-btn" @click='$refs.LocModal.isActive = true'>位置情報を登録する</div>
    <br>
    <input type="file" ref='file' @change='uploadImg'>
    <br>
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
import UpdateStoreInfo from '../components/UpdateStoreInfo.vue'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Mystore',
  data() {
    return {
      store: false
    }
  },
  props: ['loginUser'],
  components: {Modal, SetLocation, UpdateStoreInfo},
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
      },
    uploadImg(e) {
      const _this = this
      const file = e.target.files[0]
      const uuid = uuidv4()
      this.$firebase.storage()
        .ref('storeImage/' + uuid )
        .put(file)
        .then(ss => {
          ss.ref.getDownloadURL().then(url => {
            this.$firebase.firestore()
              .collection('stores')
              .doc(_this.store.id)
              .update({'images': _this.$firebase.firestore.FieldValue.arrayUnion(url)})
              .then(() => {
                alert('追加完了！')
              })
          })
        })
        
    }
  }
}
</script>

<style>

</style>