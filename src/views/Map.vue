<template>
  <GmapMap
    :center="mapConfig.center"
    :zoom="18"
    gestureHandling='greedy'
    map-type-id="terrain"
    style="width: 100%; height: calc(100vh - var(--header-height) - var(--footer-height));"
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

/* .map {
  width: 100%;
  height: calc(100vh - var(--header-height));
} */
</style>