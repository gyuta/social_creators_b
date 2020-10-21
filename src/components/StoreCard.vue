<template>
  <div class="store-wrap">
    <div class="store" @click='go(store.id)'>
      <div class="main">
        <img v-if="store.images" :src="store.images[0]" alt="">
        <img v-else src="https://d1f5hsy4d47upe.cloudfront.net/cd/cd3471f596a1546e1a533cb5c4a1cbe4_t.jpeg" alt="">
        <div class="name">{{ store.name }}</div>
      </div>
      <div class="comment">{{ store.comment }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreCard',
  props: ['store'],
  methods: {
    go(id) {
      this.$router.push({name: 'store_detail', params: {'id': id}})
    }
  }
}
</script>

<style scoped lang='scss'>
.store-wrap {
  padding: 10px;
  flex-basis: 50%;
}

.store {
  cursor: pointer;
  width: 100%;

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

  .comment {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
  }
}
</style>