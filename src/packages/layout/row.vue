<template>
  <div class="hll-row" :style='rowStyle'>
    <!-- slot是不能传参的 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'hll-row',
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    justify: {
      type: String,
      validator(type) {
        if (type && !['start', 'end', 'center', 'space-around', 'spacebetween'].includes(type)) {
          console.log('类型错误')
        }
        return true
      }
    }
  },
  computed: {
    rowStyle() {
      let style = {}
      if (this.gutter) {
        // 通过margin负值解决padding问题
        style = {
          ...style,
          marginLeft: -this.gutter / 2 + 'px',
          marginRight: -this.gutter / 2 + 'px'
        }
      }
      if (this.justify) {
        let key = ['start', 'end'].includes(this.justify) ? 'flex-' + this.justify : this.justify
        style = {
          ...style,
          justifyContent: key
        }
      }

      return style
    }
  },
  mounted() {
    this.$children.forEach(child => {
      // 拿到的是组件的实例 放在data中 组件是不能修改props属性值得
      child.gutter = this.gutter
    })
  }
};
</script>

<style  lang="scss">
.hll-row {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
</style>
