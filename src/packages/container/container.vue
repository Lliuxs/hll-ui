<template>
  <section class="hll-container" :class='{isVertical}'>
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'hll-container',
  props: {

  },
  data() {
    return {
      isVertical: true
    };
  },
  computed: {

  },
  mounted() {
    this.isVertical = this.$children.some(child => ['hll-footer', 'hll-header'].includes(child.$options.name))
  }
};
</script>

<style  lang="scss">
.hll-container {
  display: flex;
  flex-direction: row;
}
.hll-container.isVertical {
  flex-direction: column;
}
</style>
