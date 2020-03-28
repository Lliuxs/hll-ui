<template>
  <div class="hll-popover">
    <!-- 点击的时候不触发document上的事件 事件冒泡到document上了 -->
    <div
      class="hll-popover-content"
      v-if="isShow"
      ref="content"
      @click.stop
      :class="`content-${placement}`"
    >
      <h3 v-if="title" class="hll-popover-header">{{title}}</h3>
      <!-- <div class="hll-popover-body">{{content}}</div> -->
      <slot>{{content}}</slot>
      <div class="arrow"></div>
    </div>
    <slot name="reference"></slot>
  </div>
</template>

<script>
const on = (element, event, handler) => {
  element.addEventListener(event, handler, false);
};
const off = (element, event, handler) => {
  element.removeEventListener(event, handler, false);
};
export default {
  name: "hll-popover",
  props: {
    value: {
      default: false,
      type: Boolean
    },
    placement: {
      validator(type) {
        if (!["top", "bottom", "right", "left"].includes(type)) {
          throw new Error("属性不对");
        }
        return true;
      }
    },
    title: {
      type: String
    },
    width: String,
    content: String,
    trigger: {
      type: String,
      default: "click"
    }
  },
  data() {
    return {
      isShow: this.value
    };
  },
  watch: {
    value: {
      handler(v) {
        this.isShow = v;
        if (v) {
          // 显示 div移到外层
          this.$nextTick(() => {
            let content = this.$refs.content;
            document.body.appendChild(content);
            if (this.trigger === "hover") {
              on(content, "mouseenter", this.handleMouseEnter);
              on(content, "mouseleave", this.handleMouseLeave);
            }
          });
        }
      },
      immediate: true
    },
    isShow(value) {
      this.$emit("input", value);
    }
  },
  mounted() {
    // 页面加载就绑定事件 如何给slot绑定事件
    const reference = this.$slots.reference; // 这就是一个vnode
    if (reference) {
      this.reference = reference[0].elm;
    }
    if (this.trigger === "hover") {
      on(this.$el, "mouseenter", this.handleMouseEnter);
      on(this.$el, "mouseleave", this.handleMouseLeave);
    } else if (this.trigger === "click") {
      on(this.reference, "click", this.toggle);
      on(document, "click", this.handlerDocumentClick);
    }
  },
  beforeDestory() {
    off(this.$el, "mouseenter", this.handleMouseEnter);
    off(this.$el, "mouseleave", this.handleMouseLeave);
    off(this.reference, "click", this.toggle);
    off(document, "click", this.handlerDocumentClick);
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow;
    },
    handlerDocumentClick(e) {
      if (this.$el.contains(e.target)) {
        return false;
      }
      this.isShow = false;
    },
    handleMouseEnter() {
      clearTimeout(this.timer);
      this.isShow = true;
    },
    handleMouseLeave() {
      // 离开的时候不是立即离开的
      this.timer = setTimeout(() => {
        this.isShow = false;
      }, 500);
    }
  }
};
</script>

<style scoped lang="scss">
.hll-popover {
  display: inline-block;
  position: relative;
}
.hll-popover-content {
  position: absolute;
  top: 100px;
  left: 100px;
  padding: 10px;
  border-radius: 4px;
  z-index: 10;
  box-shadow: -1px -1px 3px #ccc, 1px 1px 3px #ccc;
  background: #fff;
}
.arrow {
  position: absolute;
}
.arrow::before,
.arrow::after {
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 6px solid #ccc;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: transparent;
  position: absolute;
}
.arrow::after {
  border-bottom-color: #fff;
  transform: translateY(1px);
  filter: drop-shadow(0 -2px 1px #ccc);
}
.content-top {
  .arrow {
    left: 50%;
    margin-left: -6px;
    bottom: 0px;
    &::after,
    &::before {
      transform: rotate(180deg);
    }
  }
}
.content-bottom {
  .arrow {
    left: 50%;
    margin-left: -6px;
    top: -12px;
  }
}
.content-left {
  .arrow {
    top: 50%;
    margin-top: -6px;
    right: 0px;
    &::after,
    &::before {
      transform: rotate(90deg);
    }
  }
}
.content-right {
  .arrow {
    top: 50%;
    margin-top: -6px;
    left: -12px;
    &::after,
    &::before {
      transform: rotate(-90deg);
    }
  }
}
</style>
