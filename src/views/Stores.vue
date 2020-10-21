<template>
  <div>
    <div class="search">
      <input type="text" placeholder="検索ワードを入力" v-model="keyword">
    </div>
    <div class="tab">
      <div class="item" :class="{active: isActive}" @click='isActive=true'>おすすめ</div>
      <div class="item" :class="{active: !isActive}" @click='isActive=false'>新着</div>
    </div>
    <div class="stores">
      <StoreCard v-for="store in  filteredStore" :key="store.id" :store='store'>
      </StoreCard>
    </div>
  </div>
</template>

<script>
import StoreCard from '../components/StoreCard'
export default {
  name: 'Stores',
  components: {StoreCard},
  data() {
    return {
      isActive: true,
      stores: [],
      keyword: ''
    }
  },
  async created() {
    const _this = this
    await this.$firebase.firestore().collection('stores')
      .get()
      .then( ss => {
        ss.forEach( item => {
          _this.stores.push(item.data())
        })
      })
  },
  computed: {
    filteredStore() {
      return this.stores.filter( item => {
        return item.name.indexOf(this.keyword) !== -1
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.search {
  padding: 20px;
  padding-bottom: 0;
  input {
    width: 100%;
    border-radius: 20px;
    outline: none;
    padding: 2px 15px;
    border: 1px solid black;
  }
}
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

.stores {
  display: flex;
  flex-wrap: wrap;
}
</style>