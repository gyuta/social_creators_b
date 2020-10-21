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
      <div class="name">{{ store.name }}<span class='badge'>八百屋</span></div>
      <div class="detail">
        <div class="item">営業時間：6:30 ~ 21:00</div>
        <div class="item">営業日：毎週日曜日定休日</div>
        <div class="item">価格帯：50円〜10000円</div>
        <div class="item">住所：京都市左京区京都らしさ町挨拶１丁目</div>
      </div>
    </div>
    <div class="store-info">
      <div class="title">店舗情報</div>
      <div class="info">
          <img :src="owner.icon" alt="">
          <div class="detail">
            <div class="item">ニックネーム：ごぼりん</div>
            <div class="item">好きなこと・趣味：ゴボウ</div>
            <div class="item">ひとこと：ゴボウならいつでも安くします！</div>
            <div class="item">ストーリー:「僕の人生はゴボウが全てだった」</div>
          </div>
      </div>
    </div>
    <div class="wrap">
      <div class="title">新着情報・キャンペーン情報</div>
      <div class="posts">
        <div class="post" v-for="post in posts" :key='post.id'>
          <img :src="post.image" alt="">
          <div class="band">
            <div class="post-title">{{ post.title }}</div>
            <div class="date">{{ post.createdAt.toDate() | fullDate() }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="title uc">ユーザーコメント</div>
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
      <div class="c-btn send" @click='sendComment'>送信</div>
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
      posts: [],
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

        await doc.ref.collection('posts')
          .get()
          .then( qs => {
            qs.forEach( data => {
              _this.posts.push({...data.data(), id: data.id})
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
  padding: 10px;
  
  .name {
    margin-left: 10px;
    font-size: 1.2rem;

    span {
      font-size: 12px;
      margin-left: 10px;
      border: gray 1px solid;
      padding: 2px 4px;
      border-radius: 8px;
    }
  }

  .detail {
    font-size: 8px;
    margin-left: 20px;
  }
}

.store-info {
  font-size: 12px;
  padding: 10px;
  border-top: #0000002e solid 1px;

  .title {
    margin-bottom: 5px;
  }

  .info {
    display: flex;

    img {
      width: 87px;
      height: 110px;
      border-radius: 30px;
      object-fit: cover;
    }

    .detail {
      margin-left: 10px;
    }
  }
}

.wrap {
  padding: 10px;
  border-top: #0000002e solid 1px;
  border-bottom: #0000002e solid 1px;
}

.title {
  font-size: 12px;
}

.posts {
  display: flex;

  .post {
    position: relative;
    font-size: 12px;
    margin-right: 20px;

    img {
      width: 87px;
      height: 93px;
      border-radius: 9px;
    }

    .band {
      position: absolute;
      bottom: 4px;
      width: 100%;
      color: white;
      background-color: #969292a1;
      backdrop-filter: blur(4px);
      padding: 5px;
      white-space: nowrap;
      overflow-x: scroll;

      .date {
        font-size: 5px;
      }
    }
  }
}

.uc {
  padding: 10px 0 0 10px;
}

.comment {
  display: flex;
  font-size: 12px;
  padding: 10px;
  border-bottom: #0000002e solid 1px;
  
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

textarea {
  margin: 10px;
  margin-left: 30px;
}

.send {
  position: relative;
  top: -20px;
}

</style>