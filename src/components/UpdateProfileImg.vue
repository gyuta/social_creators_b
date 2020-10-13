<template>
  <div class="modal" v-bind:class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-card">
    <section class="modal-card-body main">
      <croppa v-model="myCroppa" placeholder="画像を選択" @new-image="showOkBtn = true" @image-remove="showOkBtn = false"></croppa>
      <div v-show="showOkBtn" class="ok btn" @click="uploadCroppedImg">プロフィール画像として設定する</div>
      <div class="cancel btn" @click="isActive = false">キャンセル</div>
    </section>
    </div>
  </div>
</template>

<script>
import 'vue-croppa/dist/vue-croppa.css'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'UpdateProfileImg',
  data() {
    return {
      myCroppa: {},
      showOkBtn: false,
      isActive: false
    }
  },
  props: ['uid'],
  methods: {
    uploadCroppedImg() {
      const _this = this;
      this.myCroppa.generateBlob((blob) => {
        const uuid = uuidv4();
        this.$firebase.storage()
          .ref('userIcon/' + uuid)
          .put(blob)
          .then(ss => {
            ss.ref.getDownloadURL().then(url => {
              this.$firebase.firestore()
                .collection('users')
                .doc(_this.uid)
                .update({'icon': url})
                .then(() => {
                  location.reload();
                })
            })
          })
        // write code to upload the cropped image file (a file is a blob)
      }, 'image/jpeg', 0.8) // 80% compressed jpeg file
    }
  }
}
</script>

<style scoped lang='scss'>
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/components/modal.sass";
.main {
  text-align: center;
}

.btn {
  margin: 20px auto;
  border-radius: 7px;
  padding: 4px;
  cursor: pointer;
}

.ok {
  width: 80%;
}

.cancel {
  width: 30%;
}
</style>