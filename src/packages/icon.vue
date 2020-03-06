<template>
  <div>
    <svg class="hll-icon" aria-hidden="true">
      <use :xlink:href="`#icon-${icon}`"></use>
    </svg>
  </div>
</template>

<script>
import '../styles/icon.js'
export default {
  name: 'hll-icon',
  props: {
    icon: {
      type: String,
      required: true
    }
  }
};
</script>

<style  lang="scss">
.hll-icon {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
</style>
