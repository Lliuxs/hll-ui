<template>
  <div class="hll-col" :class="colClass" :style='colStyle'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'hll-col',
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: null
    },
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  data() {
    return {
      gutter: 0
    }
  },
  computed: {
    colClass() {
      const classes = []
      classes.push(`hll-col-${this.span}`)
      if (this.offset) {
        classes.push(`hll-col-offset-${this.offset}`)
      }
      ["xs", "sm", "md", "lg", "xl"].forEach(type => {
        if (typeof this[type] === "object") {
          let { span, offset } = this[type];
          span && classes.push(`hll-col-${type}-${span}`);
          offset && classes.push(`hll-col-${type}-offset-${offset}`);
        } else {
          this[type] && classes.push(`hll-col-${type}-${this[type]}`);
        }
      })
      return classes
    },
    colStyle() {
      let style = {}
      if (this.gutter) {
        style = {
          ...style,
          paddingLeft: this.gutter / 2 + 'px',
          paddingRight: this.gutter / 2 + 'px'
        }
      }
      return style
    }
  }
};
</script>

<style  lang="scss">
@import '@/styles/_var.scss';
// 通过循环 得到24个不同的宽度
@for $i from 1 through 24 {
  .hll-col-#{$i} {
    width: $i / 24 * 100%;
  }
  .hll-col-offset-#{$i} {
    margin-left: $i / 24 * 100%;
  }
}

@include res(xs) {
  @for $i from 1 through 24 {
    .hll-col-xs-#{$i} {
      width: $i/24 * 100%;
    }
    .hll-col-xs-offser-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}

@include res(sm) {
  @for $i from 1 through 24 {
    .hll-col-sm-#{$i} {
      width: $i/24 * 100%;
    }
    .hll-col-sm-offser-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}

@include res(md) {
  @for $i from 1 through 24 {
    .hll-col-md-#{$i} {
      width: $i/24 * 100%;
    }
    .hll-col-md-offser-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}

@include res(lg) {
  @for $i from 1 through 24 {
    .hll-col-lg-#{$i} {
      width: $i/24 * 100%;
    }
    .hll-col-lg-offser-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}

@include res(xl) {
  @for $i from 1 through 24 {
    .hll-col-xl-#{$i} {
      width: $i/24 * 100%;
    }
    .hll-col-xl-offser-#{$i} {
      margin-left: $i/24 * 100%;
    }
  }
}

</style>
