<template>
  <div class="hll-input" :class="inputClass">
    <hll-icon :icon="prefixIcon" v-if="prefixIcon"></hll-icon>
    <hll-icon :icon="suffixIcon" v-if="suffixIcon"></hll-icon>
    <input
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :placeholder="placeholder"
      :value="value"
      :name="name"
      @input="$emit('input', $event.target.value)"
    />
    <!-- @mousedown.native.prevent  不会失去焦点 -->
    <hll-icon
      icon="close"
      v-if="clearable && value"
      @click.native="$emit('input', '')"
      @mousedown.native.prevent
    ></hll-icon>
    <!-- 先失去焦点 在获取焦点 -->
    <hll-icon icon="eye" v-if="showPassword && value" @click.native="changeStatus"></hll-icon>
  </div>
</template>

<script>
export default {
  name: "hll-input",
  props: {
    // 表单提交
    name: {
      type: String,
      defalut: null
    },
    // 类型
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    // input双向数据绑定 value + @input
    value: {
      type: String,
      defalut: ""
    },
    // 图标
    prefixIcon: String,
    suffixIcon: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { passwordVisible: false };
  },
  computed: {
    inputClass() {
      let classes = [];
      if (this.clearable || this.showPassword || this.suffixIcon) {
        classes.push(`hll-input-suffix-icon`);
      }
      if (this.prefixIcon) {
        classes.push(`hll-input-prefix-icon`);
      }
      return classes;
    }
  },
  methods: {
    changeStatus() {
      this.passwordVisible = !this.passwordVisible;
      this.$nextTick(() => {
        this.$refs.input.focus(); // 先失去焦点 再获取焦点 如果使用@mousedown.native.prevent的话 光标会在最前面
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/_var.scss";
.hll-input {
  display: inline-flex;
  position: relative;
  input {
    padding: 8px;
    width: 150px;
    height: 42px;
    border-radius: $border-radius;
    border: 1px solid $border-radius;
    &:focus {
      border: 1px solid $primary;
      outline: none;
      box-shadow: inset -1px 0px 2px $primary, inset 1px 1px 1px $primary;
    }
    &[disabled] {
      cursor: not-allowed;
      background: #eee;
    }
  }
}

.hll-input-suffix-icon {
  input {
    padding-right: 25px;
  }
  .hll-icon {
    right: 8px;
    top: 13px;
    position: absolute;
    cursor: pointer;
    width: 14px;
    height: 14px;
  }
}
.hll-input-prefix-icon {
  input {
    padding-left: 25px;
  }
  .hll-icon {
    left: 8px;
    top: 13px;
    position: absolute;
    cursor: pointer;
    width: 14px;
    height: 14px;
  }
}
</style>
