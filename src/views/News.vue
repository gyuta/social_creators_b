<template>
  <div>
    <Title title="" showBackBtn="true"></Title>
    <div class="main">
      <div class="title">
        お得なランチセット
      </div>
      <div class="date">
        投稿者: フジ
      </div>
      <div class="body">
        {{ body }}
      </div>
    </div>
  </div>
</template>

<script>
import Title from '../components/Title.vue'

export default {
  name: 'News',
  components: {Title},
  data() {
    return {
      body: `【Locoユーザー限定】モダン焼き、フジ卵、かやくご飯のランチセットが800円→750円！`
    }
  }
}
</script>

<style lang='scss' scoped>
.main {
  padding: 20px;

  .title {
    border-bottom: black solid 1px;
    font-size: 20px;
  }

  .date {
    text-align: right;
    font-size: 13px;
  }

  .body {
    white-space: pre-line;
    padding: 20px;
  }
}
</style>