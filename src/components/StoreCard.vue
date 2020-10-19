<template>
  <div class="store">
    <div class="main">
      <img v-if="store.images" :src="store.images[0]" alt="">
      <img v-else src="https://d1f5hsy4d47upe.cloudfront.net/cd/cd3471f596a1546e1a533cb5c4a1cbe4_t.jpeg" alt="">
      <div class="name">{{ store.name }}</div>
    </div>
    <div class="comment">{{ store.comment }}</div>
  </div>
</template>

<script>
export default {
  name: 'StoreCard',
  props: ['store']
}
</script>

<style scoped lang='scss'>
.store {
  margin: 10px;
  .main {
    position: relative;

    img {
      height: 200px;
      width: 100%;
      object-fit: cover;
    }

    .name {
      position: absolute;
      bottom: 0;
      background-color: #ffffffa1;
      width: 100%;
      backdrop-filter: blur(4px);
      color: white;
      font-size: 15px;
      padding: 8px 4px;
    }
  }
}
</style>