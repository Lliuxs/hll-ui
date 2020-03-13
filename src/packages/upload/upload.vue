<template>
  <div class="hll-upload">
    <uploadDragger v-if="drag" :accept="accept" @file="uploadFiles"></uploadDragger>
    <template v-else>
      <div @click="handleClick" class="hll-upload-btn">
        <slot></slot>
      </div>
      <input
        type="file"
        :accept="accept"
        :multiple="multiple"
        @change="hanleChange"
        :name="name"
        ref="input"
        class="input"
      />
    </template>
    <div>
      <slot name="tips"></slot>
    </div>
    <ul>
      <li v-for="(file, index) in files" :key="file.uid">
        <div class="list-item">
          <hll-icon icon="file"></hll-icon>
          <img :src="file.url" alt />
          {{file.name}}
          <hll-progress v-if="file.status === 'uploading'" :percentage="file.percentage"></hll-progress>
          <hll-icon icon="close"></hll-icon>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// 用户需要哪些功能 用户行为
import ajax from "./ajax";
import uploadDragger from "./upload-dragger.vue";
export default {
  name: "hll-upload",
  components: {
    uploadDragger
  },
  props: {
    name: {
      type: String,
      default: "file"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    action: {
      type: String,
      required: true
    },
    // 显示已经上传过的图片
    fileList: {
      type: Array,
      default: () => []
    },
    accept: String,
    limit: Number,
    onExceed: Function,
    onChange: Function,
    onSuccess: Function,
    onError: Function,
    onProgress: Function,
    beforeUpload: Function,
    httpRequest: {
      type: Function,
      default: ajax // 默认原生的ajax
    },
    drag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tempIndex: 1,
      files: [], // 存储文件list
      reqs: {}
    };
  },
  watch: {
    fileList: {
      handler(fileList) {
        // 将用户传入的格式化
        this.files = fileList.map(item => {
          item.uid = Date.now() + this.tempIndex++;
          item.status = "success";
          return item;
        });
      },
      immediate: true
    }
  },
  methods: {
    handleClick() {
      // 在点击之前要还原
      this.$refs.input.value = "";
      this.$refs.input.click(); // 原生的click事件
    },
    hanleChange(e) {
      const files = e.target.files; // 这是一个类数组 获取选中的文件
      // 多个文件上传 多个ajax
      this.uploadFiles(files);
    },
    uploadFiles(files) {
      // 和limit做比较
      if (this.limit && this.fileList.length + files.length > this.limit) {
        return this.onExceed && this.onExceed();
      }
      [...files].forEach(rawFile => {
        // 用户的文件 需要做一些处理 可能用户频繁的上次同一个文件
        this.handleStart(rawFile); // 处理上传之前
        this.upload(rawFile); // 上传
      });
    },
    handleStart(rawFile) {
      // 每个对象都有一个状态 上传中 上传失败 上传成功
      rawFile.uid = Math.random() + this.tempIndex++; // 给文件生成一个唯一的id标识
      // 自己构建一条文件信息
      const file = {
        status: "ready", // 默认是准备上传
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0, // 上传的进度
        uid: rawFile.uid,
        type: rawFile.type,
        raw: rawFile
      };
      this.files.push(file);
      this.onChange && this.onChange(file, this.files);
    },
    upload(rawFile) {
      // 先判断这个文件是否能够上传 size
      if (!this.beforeUpload) {
        return this.post(rawFile);
      } else {
        const flag = this.beforeUpload(rawFile); // 获取返回值 返回false就不上传
        if (flag) {
          return this.post(rawFile);
        }
      }
    },
    post(rawFile) {
      // 真正上传的方法 httpRequest 调用ajax
      const uid = rawFile.uid; // uid标识当前文件 多个ajax上传 中断ajax
      const options = {
        file: rawFile,
        // filename: rawFile.name,
        filename: this.name,
        action: this.action,
        onProgress: event => {
          // console.log('处理上传中状态', event)
          this.handleProgress(event, rawFile);
        },
        onSuccess: res => {
          // console.log('处理成功的状态', res)
          this.handleSuccess(res, rawFile);
        },
        onError: err => {
          // console.log('处理失败的状态', err)
          this.handleError(err, rawFile);
        }
      };
      // req就是当前的请求
      let req = this.httpRequest(options);
      this.reqs[uid] = req; // 将ajax保存起来 之后可以取消请求
      if (req && req.then) {
        // axios返回的是一个promise
        req.then(options.onSuccess, options.onError);
      }
    },
    getFile(rawFile) {
      return this.files.find(file => file.uid === rawFile.uid);
    },
    handleProgress(event, rawFile) {
      // 进度条 不同的状态 通过源文件找到格式化的 status
      const file = this.getFile(rawFile);
      file.status = "uploading";
      file.percentage = event.percent || 0;
      this.onProgress && this.onProgress(event, file, this.files);
    },
    handleSuccess(res, rawFile) {
      const file = this.getFile(rawFile);
      file.status = "success";
      this.onSuccess && this.onSuccess(res, file, this.files);
      // 文件状态发生变化调用change
      this.onChange && this.onChange(file, this.files);
    },
    handleError(err, rawFile) {
      const file = this.getFile(rawFile);
      file.status = "fail";
      this.onError && this.onError(err, file, this.files);
      this.onChange && this.onChange(file, this.files);
      delete this.reqs[file.uid]; // 失败的ajax不需要后续再中断请求
      // files中不应该有这个
      this.files = this.files.filter(item => item.uid !== file.uid)
    }
  }
};
</script>

<style lang="scss">
.hll-upload {
  .hll-upload-btn {
    display: inline-block;
  }
  .input {
    display: none;
  }
}
</style>