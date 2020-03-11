<template>
  <aside class="hll-aside" :style='{width}'>
    <slot></slot>
  </aside>
</template>

<script>
export default {
  name: 'hll-aside',
  props: {
    width: {
      type: String
    }
  }
};
</script>

<style  lang="scss">
</style>
