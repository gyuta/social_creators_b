<template>
  <div class='main'>
    <input type="text" placeholder="検索ワードを入力" v-model="keyword">
    <GmapMap
      :center="mapConfig.center"
      :zoom="16"
      map-type-id="terrain"
      :options='options'
      style="width: 100%; height: calc(100vh - var(--footer-height));"
    >
      <GmapInfoWindow
        :position="window.position"
        :opened='window.isOpened'
        :options='window.options'
        @closeclick="window.isOpened=false"
      >
        <div class='window' @click='window.isOpened = false'>
          <div class="name">{{ window.content.name }}</div>
          <div class="body">
            <img :src="window.content.icon" alt="">
            <div class="info">
              <div class="item">営業時間：6:30 ~ 21:00</div>
              <div class="item">営業日：毎週日曜日定休日</div>
              <div class="item">価格帯：50円〜10000円</div>
              <div class="item">住所：京都市左京区京都らしさ町挨拶１丁目</div>
              <div class="wrap">
                <div class="badge">八百屋</div>
              </div>
            </div>
          </div>
          <div class="comment">
            <div class="tri"></div>
            ゴボウならいつでも安くします！
          </div>
          <div class="btn" @click="storeDetail()">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-shop" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
            </svg>
          </div>
        </div>
      </GmapInfoWindow>
      <GmapMarker
        v-for="store in filteredStore"
        :key='store.id'
        :position='store.center'
        @click='openInfoWindow(store)'
      >
      </GmapMarker>
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      keyword: '',
      mapConfig: {
        center: {
          lat: 35.003175,
          lng: 135.758426
        },
      },
      options: {
        disableDefaultUI: true,
        gestureHandling: 'greedy'
      },
      stores: [],
      markers: [
        {
          position: {
            lat: 35.003175,
            lng: 135.758426
          }
        }
      ],
      window: {
        content: {},
        position: {},
        isOpened: false,
        options: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        }
      }
    }
  },
  methods: {
    openInfoWindow(store) {
      this.window.position = store.center;
      this.window.content.id = store.id
      this.window.content.name = store.owner.name
      this.window.content.icon = store.owner.icon
      this.window.isOpened = true;
    },
    storeDetail() {
      this.$router.push({name: 'store_detail', params: {id: this.window.content.id}})
    } 
  },
  async created() {
    const _this = this;
    this.$firebase.firestore().collection('stores')
      .get()
      .then( qs => {
        qs.forEach( async storeMeta => {
          const store = storeMeta.data()
          await _this.$firebase.firestore().collection('users')
            .doc(store.id)
            .get()
            .then( userMeta => {
              store.owner = userMeta.data()
            })
          _this.stores.push(store)
        })
      })
  },
  computed: {
    filteredStore() {
      return this.stores.filter( item => {
        return item.name.indexOf(this.keyword) !== -1
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.main {
  position: relative;

  input {
    position: absolute;
    z-index: 50;
    width: calc(100% - 40px);
    left: 20px;
    top: 20px;
    border-radius: 30px;
    border: black solid 1px;
    outline: none;
    padding: 4px 8px;
    padding-left: 20px;
  }
}

.window {
  padding: 0 10px 10px 0;
  position: relative;

  .body {
    display: flex;
    align-items: center;

    img {
      width: 100px;
      height: 130px;
      object-fit: contain;
    }

    .info {
      margin-left: 5px;
      margin-bottom: 5px;
      align-self: flex-end;
      font-size: 8px;

      .wrap {
        text-align: right;

        .badge {
          display: inline-block;
          border: gray solid 1px;
          padding: 2px 4px;
          border-radius: 10px;
        }
      }
    }
  }

  .comment {
    background-color: var(--yellow);
    padding: 4px 8px;
    border-radius: 10px;
    position: relative;

    .tri {
      position: absolute;
      top: -8px;
      left: 10px;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid var(--yellow);
    }
  }

  .btn {
    position: absolute;
    top: 0;
    right: 10px;
    border: black solid 1px;
    border-radius: 30px;
    width: 30px;
    height: 30px;
    text-align: center;

    svg {
      margin-top: 5px;
      margin-left: 1px;
      width: 15px;
      height: 15px;
    }
  }
}

</style>