<template>
  <div>
    <div class="row">
      <div class="key">名前</div>
      <div class="value">{{ store.name }}</div>
    </div>
    <div class="row">
      <div class="key">ひとこと</div>
      <div class="value">{{ store.comment }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mystore',
  data() {
    return {
      store: {}
    }
  },
  props: ['loginUser'],
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
  }
}
</script>

<style>

</style>