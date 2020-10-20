<template>
  <div>
    <div class="main-imgs">
      <carousel :per-page="1" :centerMode='true' :loop="true" :paginationEnabled='false' :autoplay="true">
        <slide v-for="img in store.images" :key='img'>
          <img class='store-img' :src="img" alt=''>
        </slide>
      </carousel>
    </div>
    <div class="store-header">
      <img :src="owner.icon" alt="">
      <div class="name">{{ store.name }}</div>
      <div class="count">挨拶回数 0回</div>
    </div>
    <div class="store-info">
      野菜売ってます　野菜売ってます　野菜売ってます　野菜売ってます　野菜売ってます　野菜売ってます　野菜売ってます　野菜売ってます　
    </div>
    <div class="posts"></div>
    <div class="user-comments">
      <div class="comment" v-for="comment in comments" :key="comment.id" >
        <img :src="comment.icon" alt="">
        <div class="name-body">
          <div class="name">{{ comment.name }}</div>
          <div class="body">{{ comment.body }}</div>
        </div>
      </div>
    </div>
    <div class="post-comment">
      <textarea name="" id="" cols="30" rows="2" v-model="commentBody"></textarea>
      <div class="c-btn" @click='sendComment'>送信</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreDetail',
  data() {
    return {
      id: this.$route.params.id,
      store: {},
      owner: {},
      comments: [],
      commentBody: ''
    }
  },
  props: ['loginUser'],
  async created() {
    const _this = this
    await this.$firebase.firestore().collection('stores')
      .doc(this.id)
      .get()
      .then( async doc => {
        _this.store = doc.data()

        await doc.ref.collection('comments')
          .get()
          .then( qs => {
            qs.forEach( async meta => {
              const data = meta.data()
              const comment = {...data, id: meta.id}
              await _this.$firebase.firestore().collection('users')
                .doc(data.uid)
                .get()
                .then( user => {
                  comment.name = user.data().name
                  comment.icon = user.data().icon
                })
              _this.comments.push(comment)
            })
          })
      })
  await this.$firebase.firestore().collection('users')
    .doc(this.id)
    .get()
    .then( doc => {
      _this.owner = doc.data()
    })

  },
  methods: {
    sendComment() {
      if (!this.loginUser) {
        alert('ログインしてください')
        return;
      }
      if (!this.commentBody) {
        alert('コメントを入力してください')
        return;
      }

      const _this = this
      const ref = this.$firebase.firestore().collection('stores')
        .doc(this.id)
        .collection('comments')

      const newId = ref.doc().id
      ref
        .doc(newId)
        .set({
          id: newId,
          uid: _this.loginUser.id,
          body: _this.commentBody,
          createdAt: _this.getFireTime()
        })
        .then( () => {
          _this.comments.push({
            id: _this.newId,
            name: _this.loginUser.name,
            body: _this.commentBody,
            icon: _this.loginUser.icon
          })

          _this.commentBody = ''
        })
    }
  }

}
</script>

<style scoped lang='scss'>

.store-img {
  height: 200px;
  width: 100%;
  object-fit: cover;
  padding: 0 5px;
}

.store-header {
  display: flex;
  align-items: center;
  padding: 5px;
  
  img {
    width: 60px;
    height: 60px;
    border-radius: 60px;
  }

  .name {
    flex-grow: 1;
    margin-left: 10px;
  }
}

.comment {
  display: flex;
  font-size: 12px;
  padding: 10px;
  
  img {
    width: 60px;
    height: 60px;
    border-radius: 60px;
    margin-right: 10px;
  }

  .name-body {
    flex-grow: 1;

    .name {
      color: blue;
      margin-bottom: 5px;
    }
  }
}

</style>