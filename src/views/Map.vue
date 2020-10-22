<template>
  <div class='main'>
    <input type="text" placeholder="検索ワードを入力">
    <GmapMap
      :center="mapConfig.center"
      :zoom="18"
      map-type-id="terrain"
      :options='options'
      style="width: 100%; height: calc(100vh - var(--footer-height));"
    >
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      mapConfig: {
        center: {
          lat: 35.003175,
          lng: 135.758426
        },
      },
      options: {
        disableDefaultUI: true,
        gestureHandling: 'greedy'
      }
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

</style>