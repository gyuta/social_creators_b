<template>
  <div id="footer-wrap">
    <div id="footer">
      <div class="item" @click='top()'>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-house-door-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 10.995V14.5a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z"/>
          <path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
        </svg>
      </div>
      <div class="item" @click='map()'>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
          <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
        </svg>
      </div>
      <div class="item notify" @click='notify()'>
        <div class="new">new</div>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bell-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
        </svg>
      </div>
      <div class="item" @click='mypage()'>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    mypage() {
      this.$router.push('/mypage').catch( err => {})
    },
    top() {
      this.$router.push('/').catch( err => {})
    },
    notify() {
      this.$router.push('/notify').catch( err => {})
    },
    map() {
      this.$router.push('/map').catch( err => {})
    }
  }
}
</script>

<style scoped lang='scss'>
#footer-wrap {
  height: var(--footer-height);
}

#footer {
  background-color: var(--yellow);
  height: var(--footer-height);
  position: fixed;
  z-index: 10;
  width: 100%;
  max-width: var(--max-width);
  bottom: 0;
  display: flex;
  align-items: center;

  .item {
    flex-basis: 25%;
    text-align: center;
    cursor: pointer;

    svg {
      width: 30px;
      height: 30px;
      fill: white;
    }
  }
}

.notify {
  position: relative;

  .new {
    position: absolute;
    top: 0px;
    right: 20px;
    background-color: #4AB2FF;
    color: white;
    padding: 1px 3px;
    border-radius: 10px;
    font-size: 6px;
    font-weight: bold;
  }
}
</style>