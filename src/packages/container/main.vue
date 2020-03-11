<template>
  <main class="hll-main">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'hll-main'
};
</script>

<style  lang="scss">
.hll-main {
  flex: 1;
  padding: 20px;
}
</style>
