<template>
  <div class="hll-date-picker" v-click-outside="handleBlur">
    <!-- 分为两部分 一个input一个面板 -->
    <hll-input suffix-icon="icon-test5" @focus="handleFocus" :value="formateDate"></hll-input>
    <!-- 点击才显示出来 v-click-outside 给外层做一个代理-->
    <div class="hll-date-content" v-if="isVisible">
      <div class="hll-date-picker-header">
        <hll-icon icon="icon-test61"></hll-icon>
        <hll-icon icon="icon-test58"></hll-icon>
        <span>{{tmpTime.year}}年{{tmpTime.month}}月</span>
        <hll-icon icon="icon-test60"></hll-icon>
        <hll-icon icon="icon-test64"></hll-icon>
      </div>
      <div class="hll-date-picker-content">
        <!-- 面板是有三类 年月日 选项卡-->
        <template v-if="mode === 'dates'">
          <div>
            <span v-for="week in weeks" :key="week" class="cell">{{week}}</span>
            <!-- 一个月31天 + 上一个月和下一个月 （31 + 11）/ 7 = 6 一共6行 -->
          </div>
          <div v-for="i in 6" :key="`row_${i}`">
            <!-- 日期 1.获取到当天 找到之前 之后 加起来 -->
            <!-- 2.直接将当前第一天向前移动多少天之后 开始循环42天 -->
            <span v-for="j in 7" :key="`col_${j}`" class="cell">
              {{visibleDate[7 * (i - 1) + (j - 1)].getDate()}}
            </span>
          </div>
        </template>
        <template v-else-if="mode === 'months'">month</template>
        <template v-else-if="mode === 'years'">years</template>
      </div>
    </div>
  </div>
</template>

<script>
import clickOutside from "v-click-outside"; // 判断点击的是否是自己内部的元素
// console.log(clickOutside.directive)
function getDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day];
}
export default {
  name: "hll-date-picker",
  directives: {
    clickOutside: clickOutside.directive
  },
  props: {
    // 显示的日期
    value: {
      type: [String, Date],
      default: () => new Date()
    }
  },
  data() {
    const [year, month, day] = getDate(this.value || new Date());
    return {
      isVisible: false,
      weeks: ["日", "一", "二", "三", "四", "五", "六"],
      months: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      mode: "dates", // years months
      // 根据用户传入的值 格式化成yyyy-MM-dd
      time: { year, month, day },
      // 切换的时候 input的值是不会发生变化的 只有点击了日期才会变化 需要一个临时值 改变的是临时值 点击日期的时候才更改time
      tmpTime: { year, month, day }
    };
  },
  computed: {
    formateDate() {
      if (this.value) {
        const { year, month, day } = this.time;
        return `${year}-${month}-${day}`;
      }
    },
    visibleDate() {
      const firstDay = new Date(this.tmpTime.year, this.tmpTime.month - 1, 1)
      // console.log(firstDay, 'firstDay')
      let weekDay = firstDay.getDay() // 周日是0 周六是6
      weekDay = weekDay === 0 ? 7 : weekDay
      let start = firstDay - weekDay * 60 * 60 * 24 * 1000 // 移动当前是星期几
      let arr = []
      for(let i = 0; i < 42; i++) {
        arr.push(new Date(start + i * 60 * 60 * 24 * 1000))
      }
      return arr
    }
  },
  methods: {
    // 点击输入框显示面板
    handleFocus() {
      this.isVisible = true;
    },
    // 点击div外侧的时候隐藏面板
    handleBlur() {
      this.isVisible = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/_var.scss";
.hll-date-picker {
  border: 1px solid pink;
  display: inline-block;
  .hll-date-content {
    z-index: 10;
    user-select: none;
    position: absolute;
    // 7个 40 * 7 = 280px
    width: 280px;
    background: #fff;
    // 不要使用border box-sizing
    box-shadow: 1px 1px 2px $primary, -1px -1px 2px $primary;
    .hll-date-picker-header {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .hll-date-picker-content {
      .cell {
        width: 40px;
        text-align: center;
        line-height: 40px;
        display: inline-block;
      }
    }
  }
}
</style>
