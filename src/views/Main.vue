<template>
  <div>
    <h1>メインページ</h1>
    <div class="c-btn" @click="$router.push('\map')">マップへ</div>
    <h2>店舗一覧</h2>
    <StoreList></StoreList>
  </div>
</template>

<script>
import StoreList from '../components/StoreList.vue'
export default {
  name: 'Main',
  components: {StoreList}
};
</script>

<style>
</style>