<template>
  <div>
    <div v-if="center">
      <GmapMap
        :center="center"
        :zoom="18"
        map-type-id="roadmap"
        style="width: 100%; height: 300px"
      >
        <GmapMarker
          :position="center"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PinnedMap',
  props: ['center']
}
</script>

<style>

</style>