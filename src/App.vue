<template>
  <div id="app">
    <hll-button @click="fn">button</hll-button>
    <hll-button type='primary'>primary</hll-button>
    <hll-button type='success'>success</hll-button>
    <hll-button type='warning'> warning</hll-button>
    <hll-button type='danger'>danger</hll-button>
    <hll-button type='info'>info</hll-button>

    <hll-button type='primary' icon='info' iconPosition='right'>info</hll-button>
    
    <hll-button type='primary' icon='info'>info</hll-button>
    <hll-button type='primary' icon='info' :loading='true'>info</hll-button>
   
    <hll-icon icon='success'></hll-icon>

    <hll-button-group>
      <hll-button type='primary'>上一页</hll-button>
      <hll-button type='primary'>下一页</hll-button>
    </hll-button-group>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    fn(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="scss">
</style>
