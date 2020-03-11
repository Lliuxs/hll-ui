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
    // 当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排
    this.isVertical = this.$children.some(child => ['hll-footer', 'hll-header'].includes(child.$options.name))
  }
};
</script>

<style  lang="scss">
.hll-container {
  display: flex;
  flex-direction: row;
  flex:1;
}
.hll-container.isVertical {
  flex-direction: column;
}
</style>
