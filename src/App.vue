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
    </hll-button-group>-->
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
    </hll-row>-->
    <!-- <hll-input v-model="name" type='text' placeholder='请输入用户名' name='username' suffix-icon="info"></hll-input>
    <hll-input v-model="password" type='password' placeholder='请输入密码' name='password' :clearable='true'></hll-input>
    <hll-input  v-model="value"  type="password" placeholder="请输入内容"  name="psd" :showPassword='true'></hll-input>-->
    <!-- 上传的功能 input form  ajax+formdata -->
    <!-- <hll-upload
      name="avatar"
      action="http://localhost:3000/upload"
      accept="image/jpeg"
      :limit="8"
      :file-list="fileList"
      :multiple="true"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :before-upload="beforeUpload"
      :drag='true'
    >
      <hll-button type="primary">点击上传</hll-button>
      <div slot="tips">只能上传jpg/png文件，且不超过500kb</div>
    </hll-upload>-->
    <!-- v-model语法糖 value @input -->
    <!-- <hll-date-picker v-model='value1'></hll-date-picker> -->
    <!-- <hll-date-range-picker v-model="value2"/> -->
    <!-- <ul 
      class="box" 
      v-infinite-scroll='load'
      infinite-scroll-disabled='hasMore'
      infinite-scroll-delay='delay'
      infinite-scroll-distance='distance'
      infinite-scroll-immediate	='immediate'
      >
      <li v-for="c in count" :key="c">{{c}}</li>
    </ul>-->
    <!-- <hll-popover
      v-model="visible"
      placement="bottom"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
    >
      <hll-button slot="reference">click</hll-button>
    </hll-popover> -->

    <hll-popover v-model="visible" placement="bottom" title="标题" width="200" trigger="hover">
      <p>这是一段内容这是一段内容确定删除吗？</p>
      <div style="text-align: right; margin: 0">
        <hll-button @click="visible = false">取消</hll-button>
        <hll-button type="primary" @click="visible = false">确定</hll-button>
      </div>
      <hll-button slot="reference">hover 激活</hll-button>
    </hll-popover>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      name: "",
      password: "",
      value: "",
      fileList: [
        { url: "xxx1", name: "hll-upload1" },
        { url: "xxx2", name: "hll-upload2" }
      ],
      value1: "",
      value2: [],
      count: 0,
      hasMore: false,
      delay: 300, // 延时时间
      distance: 0,
      immediate: true,
      visible: false
    };
  },
  methods: {
    fn(e) {
      console.log(e);
    },
    handleExceed(files, fileList) {
      console.log("文件超出个数限制时的钩子");
    },
    handleChange(file, fileList) {
      // console.log("change", file, fileList);
    },
    handleSuccess(response, file, fileList) {
      console.log("文件上传成功");
    },
    handleError(err, file, fileList) {
      console.log("文件上传失败");
    },
    handleProgress(event, file, fileList) {
      console.log("文件上传时触发 进度条");
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        console.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        console.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    load() {
      this.count += 2;
      if (this.count >= 100) {
        this.hasMore = true;
      }
    }
  }
};
</script>

<style lang="scss">
.box {
  width: 300px;
  height: 200px;
  border: 1px solid green;
  overflow-y: scroll;
}
</style>
