<template>
  <div class="hll-button-group">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'hll-button-group',
  mounted() {
    // 校验内部孩子是否是我们的button组件 如果不会就报错
    const children = this.$el.children
    children.forEach(child => {
      console.assert(child.tagName === 'BUTTON', '子元素的类型必须是button')
    })
  }
};
</script>

<style  lang="scss">
@import '../styles/_var.scss';
.hll-button-group {
  display: inline-flex;
  vertical-align: middle;
  button {
    position: relative;
    border-radius: 0;
    // 边框合并
    &:not(first-child) {
      margin-left: -1px;
    }
    &:first-child {
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }
    &:last-child {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
    &:hover {
      z-index: 1;
    }
    &:focus {
      z-index: 2;
    }
  }
}
</style>
