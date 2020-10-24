<template>
  <div>
    <Title title="挨拶ランク" :showBackBtn='true' ></Title>
    <div class="wrap">
      <div class="item" v-for='item of 8' :key='item'>
        <div class="name">ほげほげ商店</div>
        <img src="https://www.pakutaso.com/shared/img/thumb/PASONA160306550I9A2233_TP_V.jpg" alt="" class="icon">
        <div class="count">挨拶回数　5 回</div>
        <div class="note">次の挨拶ランクまで後5回</div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '../components/Title'

export default {
  name: 'GreedRank',
  components: {Title},
}
</script>

<style lang='scss' scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
  
  .item {
    flex-basis: 33.3%;
    text-align: center;
    padding: 10px;
    font-size: 8px;

    img {
      border-radius: 100px;
    }
  }
}
</style>