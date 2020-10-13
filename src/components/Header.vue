<template>
  <div id="header">
    <div id="title">バルス（仮）</div>
    <div class="right">
      <div v-if="user" class="mypage">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3SUoeX6jEyFqg80JJfDfkHFJIJZxE76crNg&usqp=CAU" alt="" class="icon">
      </div>
      <div v-else class="btns">
        <div class="btn signup">新規登録</div>
        <div class="btn signin">ログイン</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      user: false
    }
  }
};
</script>

<style scoped>
#header {
  height: var(--header-height);
  border-bottom: black solid 1px;
  display: flex;
  align-items: center;
  padding: 4px 8px;
}

#title {
  flex-grow: 1;
}

.icon {
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: black solid 1px;
  cursor: pointer;
}

.btns {
  display: flex;
}

.btn {
  font-size: 0.8rem;
  padding: 2px 4px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 0 4px;
  cursor: pointer;
}
</style>