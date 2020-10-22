<template>
  <div>
    <Title title='お知らせ' showBackBtn="true"></Title>
    <div class="main">
      <div class="row" v-for="(item, index) of 8" :key='index'>
        <div class="badge" v-if="index < 2"></div>
        <img src="https://previews.123rf.com/images/paylessimages/paylessimages1507/paylessimages150727905/43014951-%E3%82%B4%E3%83%9C%E3%82%A6%E6%A0%B9.jpg" alt="">
        <div class="title">ゴボウ安いよ！</div>
        <div class="store">ほげほげ商店</div>
        <div class="btn">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '../components/Title.vue'

export default {
  name: 'Notify',
  components: {Title}
  
}
</script>

<style lang='scss' scoped>
.main {
  margin-top: 20px;
}

.row {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: gray solid 1px;
  position: relative;

  &:first-child {
    border-top: gray solid 1px;
  }

  .badge {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: red;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    object-fit: contain;
    margin-right: 10px;
  }

  .title {
    flex-grow: 1;
  }

  .store {
    font-size: 8px;
    align-self: flex-end;
    margin-right: 4px;
  }
}

</style>