<template>
  <div id='header'>
    <span v-if="showBackBtn" class='btn' @click='back()'>
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
      </svg>
    </span>
    <span class='title'>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: ['title', 'showBackBtn'],
  methods: {
    back() {
      window.history.back();
    }
  }
}
</script>

<style lang='scss' scoped>
#header {
  line-height: var(--header-height);
  background: linear-gradient(var(--yellow), white);

  .btn {
    margin-left: 20px;
    position: relative;
    top: 2px;
    cursor: pointer;
  }

  .title {
    margin-left: 20px;
  }
}

</style>