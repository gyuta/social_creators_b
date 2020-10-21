<template>
  <div>
    <div class="tab">
      <div class="item" :class="{active: isActive}" @click='isActive=true'>月間ランキング</div>
      <div class="item" :class="{active: !isActive}" @click='isActive=false'>総合ランキング</div>
    </div>
    <div class="ranking">
      <div class="row" v-for="(item, index) of 3" :key='index'>
        <div class="num">{{ index+1 }}</div>
        <img src="https://www.pakutaso.com/shared/img/thumb/MAX76_gjmax20140531_TP_V.jpg" alt="">
        <div class="name">かんたろー</div>
        <div class="count">挨拶回数　４回</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ranking',
  data() {
    return {
      isActive: true,
      ranks: []
    }
  }
}
</script>

<style lang='scss' scoped>
.tab {
  display: flex;
  height: 50px;
  margin: 20px;
  justify-content: space-between;
  cursor: pointer;

  .item {
    line-height: 50px;
    text-align: center;
    font-weight: bold;
    flex-basis: 45%;

    &.active {
      border-bottom: var(--yellow) solid 5px;
    }
  }
}

.row {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 20px;

  img {
    width: 70px;
    height: 70px;
    border-radius: 70px;
    object-fit: contain;
  }

  .name {
    margin-left: 10px;
    flex-grow: 1;
  }

  .count {
    position: absolute;
    font-size: 8px;
    bottom: 5px;
    right: 5px
  }

}

</style>