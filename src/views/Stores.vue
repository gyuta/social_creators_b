<template>
  <div>
    <h1>店舗一覧</h1>
    <StoreCard v-for="store in stores" :key="store.id" :store='store'>
    </StoreCard>
  </div>
</template>

<script>
import StoreCard from '../components/StoreCard'
export default {
  name: 'Stores',
  components: {StoreCard},
  data() {
    return {
      stores: []
    }
  },
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