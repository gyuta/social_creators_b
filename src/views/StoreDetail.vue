<template>
  <div>
    <StampCardModal ref='stamp'></StampCardModal>
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
      <div class="stamp-btn" @click='$refs.stamp.show()'>
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-gift" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zM1 4v2h6V4H1zm8 0v2h6V4H9zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5V7zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5H7z"/>
        </svg>
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
        <div class="count">
          挨拶回数 0回
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
import StampCardModal from '../components/StampCardModal'

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
  components: {StampCardModal},
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
  position: relative;
  
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

  .stamp-btn {
    position: absolute;
    bottom: 10px;
    right: 20px;
    border: black solid 1px;
    border-radius: 20px;
    padding: 0 4px;
    cursor: pointer;

    svg {
      position: relative;
      top: 2px;
    }
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
  position: relative;
  
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

  .count {
    position: absolute;
    top: 10px;
    right: 10px;
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