<template>
  <div class="modal" v-bind:class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-card">
    <section class="modal-card-body main">
      <slot></slot>
      <div class="cancel btn" @click="isActive = false">キャンセル</div>
    </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      isActive: false
    }
  }
}
</script>

<style scoped lang='scss'>
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/components/modal.sass";
.main {
  text-align: center;
}

.btn {
  margin: 20px auto;
  border-radius: 7px;
  padding: 4px;
  cursor: pointer;
}

.cancel {
  width: 30%;
}
</style>