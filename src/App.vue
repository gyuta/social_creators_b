<template>
  <div id="app">
    <Header :user='user'></Header>
    <router-view :loginUser='user' />
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  name: 'App',
  components: {Header},
  data() {
    return {
      user: null,
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      const _this = this;
      this.$firebase.auth().onAuthStateChanged( authUser => {
        if (authUser) {
          _this.getUserInfoFromUserId(authUser.uid)
            .then( user => {
              _this.user = user
            })
        } else {
          _this.user = null
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  background-color: #fff;
  min-height: 100vh;
  width: 500px;
  margin: 0 auto;
}
</style>
