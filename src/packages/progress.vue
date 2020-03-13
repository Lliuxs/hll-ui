<template>
  <!-- 圆形进度条需要使用svg -->
  <div class="hll-progress">
    <div class="bar">
      <div class="bar-outer" :style="{height:strokeWidth+'px'}">
        <div class="bar-inner" :style="barStyle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "hll-progress",
  props: {
    strokeWidth: {
      type: Number,
      default: 6
    },
    percentage: {
      type: Number,
      default: 0,
      required: true
    },
    color: {
      type: String,
      default: "blue"
    }
  },
  computed: {
    barStyle() {
      const style = {};
      style.width = this.percentage + "%";
      style.background = this.color;
      return style;
    }
  }
};
</script>


<style lang="scss">
.bar-outer {
  border-radius: 100px;
  background: #eee;
  position: relative;
  vertical-align: middle;
}
.bar-inner {
  transition: width 0.6s ease;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
</style>
