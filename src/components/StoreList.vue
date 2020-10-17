<template>
  <div class='cards'>
    <Modal ref='map'>
      <PinnedMap v-if='center' :center='center'></PinnedMap>
    </Modal>
    <div class="card" v-for="store in stores" :key="store.id">
      {{ store.name }}: {{ store.comment }}
      <div class="c-btn" v-if="store.center" @click='center = store.center; $refs.map.isActive = true'>
        位置を確認する
      </div>
    </div>
  </div>
</template>

<script>
import Modal from './Modal.vue'
import PinnedMap from './PinnedMap.vue'

export default {
  name: 'StoreList',
  data() {
    return {
      stores: [],
      center: false
    }
  },
  components: {Modal, PinnedMap},
  async created() {
    const _this = this
    await this.$firebase.firestore().collection('stores')
      .get()
      .then( ss => {
        ss.forEach( item => {
          _this.stores.push(item.data())
        })
      })
  }
}
</script>

<style>

</style>