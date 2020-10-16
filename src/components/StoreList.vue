<template>
  <div class='cards'>
    <div class="card" v-for="store in stores" :key="store.id">
      {{ store.name }}: {{ store.comment }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreList',
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