<template>
  <div>
    <Title title="" showBackBtn="true"></Title>
    <div class="main">
      <div class="title">
        ゴボウ安いよ！
      </div>
      <div class="date">
        投稿者: ごぼりん
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
      body: `明日（今日も声かけてくれたら）ゴボウ安くします！夕飯のおかずは筑前煮で決まりやね！！`
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