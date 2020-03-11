<template>
  <div id="app">
    <!-- <hll-button @click="fn">button</hll-button>
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
    </hll-button-group> -->

    
    <!-- <hll-row>
      <hll-col :span='12'>
        <div>1</div>
      </hll-col>
      <hll-col :span='12'>
        <div>2</div>
      </hll-col>
      <hll-col :span='12'>
        <div>3</div>
      </hll-col>
    </hll-row>

    <hll-row>
      <hll-col :span='6'>
        <div>offset1</div>
      </hll-col>
      <hll-col :span='6' :offset='12'>
        <div>offset2</div>
      </hll-col>
    </hll-row>

    <hll-row :gutter='20'>
      <hll-col :span='6'>
        <div>6</div>
      </hll-col>
      <hll-col :span='6'>
        <div>6</div>
      </hll-col>
      <hll-col :span='6'>
        <div>6</div>
      </hll-col>
      <hll-col :span='6'>
        <div>6</div>
      </hll-col>
    </hll-row> -->

    <hll-input v-model="name" type='text' placeholder='请输入用户名' name='username' suffix-icon="info"></hll-input>
    <hll-input v-model="password" type='password' placeholder='请输入密码' name='password' :clearable='true'></hll-input>
    <hll-input  v-model="value"  type="password" placeholder="请输入内容"  name="psd" :showPassword='true'></hll-input>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    fn(e) {
      console.log(e)
    }
  },
  data() {
    return {
      name: '',
      password: '',
      value: ''
    }
  }
}
</script>

<style lang="scss">
</style>
