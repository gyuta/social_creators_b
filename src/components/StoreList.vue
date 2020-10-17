<template>
  <div class='cards'>
    <Modal ref='map'>
      <PinnedMap v-if='center' :center='center'></PinnedMap>
    </Modal>
    <Modal ref='imgModal'>
      <carousel :per-page="1" :centerMode='true' :loop="true">
        <slide v-for="img in images" :key='img'>
          <img :src="img" alt=''>
        </slide>
      </carousel>
    </Modal>
    <div class="card" v-for="store in stores" :key="store.id">
      {{ store.name }}: {{ store.comment }}
      <div class="c-btn" v-if="store.center" @click='center = store.center; $refs.map.isActive = true'>
        位置を確認する
      </div>
      <div class="c-btn" v-if="store.images" @click='images = store.images; $refs.imgModal.isActive = true'>
        画像を見る
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
      center: false,
      images: []
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