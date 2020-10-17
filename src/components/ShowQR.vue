<template>
  <VueQrcode :value="id" :options="{ width: 200 }"></VueQrcode>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default {
  name: 'ShowQR',
  props: ['id'],
  components: {VueQrcode},
  created() {
    const unsubscribe = this.$firebase.firestore().collection('users')
      .doc(this.id)
      .collection('records')
      .onSnapshot( ss => {
        ss.docChanges().forEach( change => {
          if( change === 'added') {
            alert('QRコードが読み込まれました！')
            unsubscribe()
          }
        })
      })
  }
}
</script>

<style>

</style>