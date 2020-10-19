<template>
  <div id="footer-wrap">
    <div id="footer">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
#footer-wrap {
  height: var(--footer-height);
}

#footer {
  background-color: var(--yellow);
  height: var(--footer-height);
  position: fixed;
  z-index: 10;
  width: 100%;
  max-width: var(--max-width);
  bottom: 0;
}
</style>