<template>
  <div class="hll-input">
    <input :type="type" :placeholder="placeholder" :value='value' @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'hll-input',
  props: {
    name: {
      type: String,
      defalut: null
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    value: {
      type: String,
      defalut: ''
    }
  },
  components: {

  },
  data() {
    return {

    };
  },
  computed: {

  },
  mounted() {

  },
  methods: {

  },
};
</script>

<style lang="scss">
.hll-input {
  display: inline-flex;
  input {
    padding: 8px;
    width: 150px;
    height: 42px;
  }
}
</style>
