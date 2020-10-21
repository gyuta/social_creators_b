<template>
  <div>
    <Modal ref='modal'>
      <div class="card">
        <div class="item" v-for="n of 10" :key="n">
          <div class="cell">
            {{ n }}
          </div>
          <div class='stamp' v-if="n <= count">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-emoji-smile" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path fill-rule="evenodd" d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683z"/>
              <path d="M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
            </svg>
          </div>
        </div>
      </div>
      <div class='reward'>
        {{ reward }}
      </div>
      <div class="expire">
        失効期限: 2021:01:20
      </div>
      <div class="note">
        最後にスタンプを押されてから３ヶ月後に失効となります。
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from './Modal.vue'

export default {
  name: 'StampCardModal',
  components: {Modal},
  data() {
    return {
      count: 3,
      reward: 'スタンプ１０個獲得でオリジナルTシャツプレゼント！'
    }
  },
  methods: {
    show() {
      this.$refs.modal.isActive = true;
    }
  }
}
</script>

<style lang='scss' scoped>
.card {
  display: flex;
  flex-wrap: wrap;

  .item {
    flex-basis: 20%;
    padding: 5px;
    height: 60px;
    position: relative;

    .cell {
      border: black solid 1px;
      height: 50px;
      margin: 5px;
      border-radius: 10px;
      line-height: 40px;
    }
    
    &:last-of-type {
      .cell {
        border: var(--yellow) solid 2px;
        font-weight: bold;
      }
    }

    .stamp {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      margin-top: 8px;

      svg {
        width: 30px;
        height: 30px;
      }
    }
  }
}

.reward {
  margin-top: 10px;
  font-size: 12px;
}

.expire {
  margin-top: 10px;
  font-size: 10px;
}

.note {
  font-size: 8px;;
}
</style>