<template>
  <GmapMap
    :center="mapConfig.center"
    :zoom="18"
    map-type-id="terrain"
    style="width: 100%; height: 100vh"
  >
  </GmapMap>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      google: null,
      mapConfig: {
        center: {
          lat: 35.003175,
          lng: 135.758426
        },
        zoom: 15
      }
    }
  }
}
</script>

<style scoped>

.map {
  width: 100%;
  height: 100vh;
}
</style>