<template>
  <div>
    <div class="field">
      <label for="">ニックネーム</label>
      <input type="text" v-model="name">
    </div>
    <div class="field">
      <label for="">プロフィール</label>
      <textarea name="" id="" cols="30" rows="10" v-model="profile" placeholder="こんにちは！"></textarea>
    </div>
    <div class="c-btn" @click='update'>変更する</div>
  </div>
</template>

<script>
export default {
  name: 'UpdateProfile',
  data() {
    return {
      id: this.user.id,
      name: this.user.name,
      profile: this.user.profile
    }
  },
  props: ['user'],
  methods: {
    update() {
      const _this = this
      this.$firebase.firestore()
        .collection('users')
        .doc(this.id)
        .update({
          name: this.name,
          profile: this.profile
        })
        .then( () => {
          _this.$emit('send')
        })
    }
  }
}
</script>

<style>

</style>