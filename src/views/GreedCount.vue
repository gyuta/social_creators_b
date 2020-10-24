<template>
  <div>
      <Title title="挨拶回数内訳" :showBackBtn='true' ></Title>
      <div class="a">
        <div class="b">
          <div class="item">
            <div class="store">フレフレ青果店</div>
            <div class="count">1</div>
          </div>
          <div class="item">
            <div class="store">理髪店　だいまる</div>
            <div class="count">3</div>
          </div>
          <div class="item">
            <div class="store">らーめん　かさん</div>
            <div class="count">2</div>
          </div>
          <div class="item">
            <div class="store">モダン焼き フジ</div>
            <div class="count">1</div>
          </div>
        </div>
          <div class="item">
            <div class="store">総合計</div>
            <div class="count">7</div>
          </div>
      </div>
  </div>
</template>

<script>
import Title from '../components/Title.vue'
export default {
  name: 'GreedCount',
  components: {Title}
}
</script>

<style lang='scss' scoped>

.a {
  padding: 20px;

  .b {
    border-bottom: 1px solid gray;

  }
}

    .item {
      display: flex;
      padding: 10px;

      .store {
        flex-grow: 1;
      }
    }

</style>