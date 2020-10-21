<template>
  <div id="app">
    <router-view :loginUser='user' @getUser='getUser' />
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {Footer},
  data() {
    return {
      user: null,
      authUser: null
    }
  },
  created() {
    this.getAuthUser();
  },
  methods: {
    getAuthUser() {
      const _this = this;
      this.$firebase.auth().onAuthStateChanged( authUser => {
        if (authUser) {
          _this.authUser =  authUser
          _this.getUserInfoFromUserId(authUser.uid)
            .then( user => {
              _this.user = user
            })
        } else {
          _this.authUser = null
          _this.user = null
        }
      });
    },
    getUser() {
      if (this.authUser) {
        this.getUserInfoFromUserId(this.authUser.uid)
            .then( user => {
              this.user = user
            })
      }
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
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
}
</style>
