<template>
  <div class="hll-date-picker" v-click-outside="handleBlur">
    <!-- 分为两部分 一个input一个面板 -->
    <hll-input
      suffix-icon="icon-test5"
      @focus="handleFocus"
      :value="formateDate"
      @change="handleChange"
    ></hll-input>
    <!-- 点击才显示出来 v-click-outside 给外层做一个代理-->
    <div class="hll-date-content" v-if="isVisible">
      <!-- <div class="hll-date-picker-header">
        <hll-icon icon="icon-test61" @click="changeYear(-1)"></hll-icon>
        <hll-icon icon="icon-test58" @click="changeMonth(-1)"></hll-icon>
        <b @click="mode='years'">{{tmpTime.year}}</b>年
        <b @click="mode='months'">{{tmpTime.month}}</b>月
        <hll-icon icon="icon-test60" @click="changeMonth(1)"></hll-icon>
        <hll-icon icon="icon-test64" @click="changeYear(1)"></hll-icon>
      </div>-->
      <div class="hll-date-picker-content">
        <!-- 面板是有三类 年月日 选项卡-->
        <template v-if="mode === 'dates'">
          <div class="hll-date-picker-header">
            <hll-icon icon="icon-test61" @click="changeYear(-1)"></hll-icon>
            <hll-icon icon="icon-test58" @click="changeMonth(-1)"></hll-icon>
            <b @click="mode='years'">{{tmpTime.year}}</b>年
            <b @click="mode='months'">{{tmpTime.month}}</b>月
            <hll-icon icon="icon-test60" @click="changeMonth(1)"></hll-icon>
            <hll-icon icon="icon-test64" @click="changeYear(1)"></hll-icon>
          </div>
          <div>
            <span v-for="week in weeks" :key="week" class="cell">{{week}}</span>
            <!-- 一个月31天 + 上一个月和下一个月 （31 + 11）/ 7 = 6 一共6行 -->
          </div>
          <div v-for="i in 6" :key="`row_${i}`">
            <!-- 日期 1.获取到当天 找到之前 之后 加起来 -->
            <!-- 2.直接将当前第一天向前移动多少天之后 开始循环42天 -->
            <!-- 当前月是黑色 不是当前月是灰色的 -->
            <!-- 今天就是蓝色 选中的就是白色字体蓝色背景 -->
            <!-- 划过的颜色为蓝色hover 不是当月的不变的 -->
            <span
              v-for="j in 7"
              :key="`col_${j}`"
              class="cell cell-date"
              @click="selectDate(getCurrentDate(i, j))"
              :class="{
                isNotCurrentMonth: !isCurrentMonth(getCurrentDate(i, j)),
                isToday: isToday(getCurrentDate(i, j)),
                isSelect: isSelect(getCurrentDate(i, j))
                }"
            >{{getCurrentDate(i, j).getDate()}}</span>
          </div>
        </template>
        <template v-else-if="mode === 'months'">
          <div class="hll-date-picker-header">
            <hll-icon icon="icon-test61" @click="changeYear(-1)"></hll-icon>
            <span>
              <b @click="mode='years'">{{this.tmpTime.year}}年</b>
            </span>
            <hll-icon icon="icon-test64" @click="changeYear(1)"></hll-icon>
          </div>
        </template>
        <template v-else-if="mode === 'years'">
          <div class="hll-date-picker-header">
            <!-- 年是10年选的 -->
            <hll-icon icon="icon-test61" @click="changeYear(-10)"></hll-icon>
            <span>
              <b @click="mode='years'">{{startYear}}年--{{startYear+9}}年</b>
            </span>
            <hll-icon icon="icon-test64" @click="changeYear(10)"></hll-icon>
          </div>
        </template>
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
    // data方法只执行一次的
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
        return `${year}-${(month + "").padStart(2, 0)}-${(day + "").padStart(
          2,
          0
        )}`;
      }
    },
    visibleDate() {
      // 数据变化会更新tmpTime会重新计算
      const firstDay = new Date(this.tmpTime.year, this.tmpTime.month - 1, 1);
      // console.log(firstDay, 'firstDay')
      let weekDay = firstDay.getDay(); // 周日是0 周六是6
      weekDay = weekDay === 0 ? 7 : weekDay;
      let start = firstDay - weekDay * 60 * 60 * 24 * 1000; // 移动当前是星期几
      let arr = [];
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(start + i * 60 * 60 * 24 * 1000));
      }
      return arr;
    },
    startYear() {
      return this.tmpTime.year - (this.tmpTime.year % 10);
    }
  },
  watch: {
    // 根据最新的value来更新time和tmpTime
    value(newValue) {
      const [year, month, day] = getDate(newValue);
      this.time = { year, month, day };
      // this.tmpTime = this.time // 不能这么写 这样指向同一个
      this.tmpTime = { ...this.time };
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
      this.mode = 'dates'
    },
    getCurrentDate(i, j) {
      return this.visibleDate[7 * (i - 1) + (j - 1)];
    },
    isCurrentMonth(date) {
      const { year, month } = this.tmpTime;
      let [y, m] = getDate(date);
      return year === y && month === m; // 判断当前年月是否相等
    },
    isToday(date) {
      const [year, month, day] = getDate(new Date());
      let [y, m, d] = getDate(date);
      return year === y && month === m && day === d; // 判断是不是今天
    },
    isSelect(date) {
      const { year, month, day } = this.tmpTime;
      let [y, m, d] = getDate(date);
      return year === y && month === m && day === d; // 判断选中是哪天
    },
    // 选中日期
    selectDate(date) {
      // 触发一个input事件 v-model双向数据绑定 语法糖
      this.$emit("input", date);
      this.handleBlur();
    },
    changeYear(count) {
      const oldDate = new Date(this.tmpTime.year, this.tmpTime.month);
      const newDate = oldDate.setFullYear(oldDate.getFullYear() + count);
      const [year] = getDate(new Date(newDate));
      this.tmpTime.year = year;
    },
    changeMonth(count) {
      // 更改月分不要直接加减 通过new Date()计算
      const oldDate = new Date(this.tmpTime.year, this.tmpTime.month);
      const newDate = oldDate.setMonth(oldDate.getMonth() - 1 + count);
      const [year, month] = getDate(new Date(newDate));
      this.tmpTime.year = year;
      this.tmpTime.month = month;
    },
    // input输入框改变
    handleChange(e) {
      const value = e.target.value;
      let regExp = /^(\d{4})-(\d{1,2})-(\d{1,2})/;
      // 更新输入框内容
      if (value.match(regExp)) {
        this.$emit("input", new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3));
      } else {
        e.taget.value = this.formateDate;
      }
      // 触发失去焦点
      this.handleBlur();
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

    .hll-date-picker-content {
      .cell {
        width: 40px;
        text-align: center;
        line-height: 40px;
        display: inline-block;
        font-weight: 500;
        // &:hover {
        //   // 滑动的时候
        //   color: blue;
        // }
      }
    }
  }
  .hll-date-picker-header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .isNotCurrentMonth {
    // 不是当前月字体是灰色的
    color: #ccc;
  }
  // 划过时的hover样式 不是当前月是不变色的
  .cell-date:hover:not(.isNotCurrentMonth):not(.isSelect) {
    color: $primary;
  }

  .isToday {
    // 今天的颜色就是蓝色
    color: $primary;
    background: #fff;
  }
  .isSelect {
    // 选中的
    background: $primary;
    color: #fff;
    border-radius: 50%;
  }
}
</style>
