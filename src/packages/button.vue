<template>
  <div>
    <!-- 动态绑定class使用计算属性 -->
    <button onClick=‘click’ class="hll-button" :class="btnClass">
      <!-- 没有不传就不存在span元素 -->
      <span v-if="this.$slots.default">
        <slot />
      </span>
    </button>
  </div>
</template>

<script>
/*
1.基本功能 点击事件
2.type类型 size属性
3.loading状态
4.图标
5.按钮组
*/
export default {
  name: 'hll-button',
  props: {
    type: {
      type: String,
      default: '',
      validator: (type) => {
        if(type && !['success', 'warning', 'danger', 'info', 'primary'].includes(type)) {
          console.error(`组件type类型必须为${['success', 'warning', 'danger', 'info', 'primary'].join(',')}`)
        }
        return true
       }
    }
  },
  computed: {
    btnClass() {
      let classes = []
      if(this.type) {
        classes.push(`hll-button-${this.type}`)
      }
      return classes
    }
  },
  methods: {
    click(event) {
      this.$emit('click', event)
    }
  },
};
</script>

<style  lang="scss">
@import '../styles/_var.scss';
$height: 42px;
$font-size: 14px;
$color: #606266;
$border-color: #dcdfe6;
$background: #ecf5ff;
$active-color: #3a8ee6;
$font-weight: 500;

.hll-button {
  display: inline-flex;
  height: $height;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid $border-color;
  color: $color;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: $font-weight;
  padding: 12px 20px;
  font-size: $font-size;
  border-radius: $border-radius;
  &:hover {
    border-color: $border-color;
    background-color: $background;
  }
  &:focus, &:active{
    color: $active-color;
    border-color: $active-color;
     background-color: $background;
    outline: none;
  }

  @each $type, $color in (primary: $primary, success: $success, warning: $warning, danger: $danger, info: $info) {
    &-#{$type} {
      background-color: #{ $color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }

  @each $type, $color in (primary: $primary-hover, success: $success-hover, warning: $warning-hover, danger: $danger-hover, info: $info-hover) {
    &-#{$type}:hover {
      background-color: #{ $color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }

    @each $type, $color in (primary: $primary-active, success: $success-active, warning: $warning-active, danger: $danger-active, info: $info-active) {
    &-#{$type}:active{
      background-color: #{ $color};
      border: 1px solid #{$color};
      color: #fff;
    }
  }
}
</style>
