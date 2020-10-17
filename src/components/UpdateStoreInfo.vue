<template>
  <div>
    <div class="field">
      <label for="">店名</label>
      <input type="text" v-model="name">
    </div>
    <div class="field">
      <label for="">コメント</label>
      <textarea name="" id="" cols="30" rows="10" v-model="comment" placeholder="学割あります"></textarea>
    </div>
    <div class="c-btn" @click='update'>変更する</div>
  </div>
</template>

<script>
export default {
  name: 'UpdateStoreInfo',
  data() {
    return {
      id: this.store.id,
      name: this.store.name,
      comment: this.store.comment
    }
  },
  props: ['store'],
  methods: {
    update() {
      const _this = this
      this.$firebase.firestore()
        .collection('stores')
        .doc(this.id)
        .update({
          name: this.name,
          comment: this.comment
        })
        .then( () => {
          _this.$emit('updated')
        })
    }
  }
}
</script>

<style>

</style>