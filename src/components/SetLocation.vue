<template>
  <div>
    <GmapMap
      :center="center"
      :zoom="18"
      map-type-id="roadmap"
      style="width: 100%; height: 300px"
      @click='click($event)'
    >
      <GmapMarker
        v-if="isClicked"
        :position="markedCenter"
      />
    </GmapMap>
    <div class="c-btn" v-if="isClicked" @click='regist'>この位置で登録する</div>
  </div>
</template>

<script>
export default {
  name: 'SetLocation',
  data() {
    return {
      isClicked: false,
      center: {
        lat: 35.003175,
        lng: 135.758426
      },
      markedCenter: {
        lat: 35.003175,
        lng: 135.758426
      }
    }
  },
  props: ['id'],
  methods: {
    click(event) {
      this.isClicked = true
      this.markedCenter.lat = event.latLng.lat()
      this.markedCenter.lng = event.latLng.lng()
    },
    regist() {
      this.$firebase.firestore().collection('stores')
        .doc(this.id)
        .update({
          center: this.markedCenter
        })
        .then( () => {
          this.$emit('regist')
        })
    }
  }
}
</script>

<style>

</style>