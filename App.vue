<template>
  <div id="app">
    <div class="box">
      <div class="item">
        <div>值（年）：{{ value1 }}</div>
        <el-date-picker
          v-model="value1"
          type="year"
          placeholder="选择年"
          format="yyyy 年"
          value-format="yyyy[YY]"
        >
        </el-date-picker>
      </div>
      <div class="item">
        <div>值（年）：{{ value11 }}</div>
        <el-date-picker
          v-model="value11"
          type="years"
          placeholder="选择年"
          format="yyyy 年"
          value-format="yyyy[YY]"
        >
        </el-date-picker>
      </div>

      <div class="item">
        <div>值（半年）：{{ value2 }}</div>
        <el-date-picker
          v-model="value2"
          type="halfyear"
          placeholder="选择半年"
          format="yyyy 年B半年"
          value-format="yyyyBB[HY]"
        >
        </el-date-picker>
      </div>
      <div class="item">
        <div>值（半年）：{{ value21 }}</div>
        <el-date-picker
          v-model="value21"
          type="halfyears"
          placeholder="选择半年"
          format="yyyy 年B半年"
          value-format="yyyyBB[HY]"
        >
        </el-date-picker>
      </div>

      <div class="item">
        <div>值（季度）：{{ value3 }}</div>
        <el-date-picker
          v-model="value3"
          type="quarter"
          placeholder="选择季"
          format="yyyy 年第Q季度"
          value-format="yyyyQQ[SS]"
        >
        </el-date-picker>
      </div>
      <div class="item">
        <div>值（季度）：{{ value31 }}</div>
        <el-date-picker
          v-model="value31"
          type="quarters"
          placeholder="选择季"
          format="yyyy 年第Q季度"
          value-format="yyyyQQ[SS]"
        >
        </el-date-picker>
      </div>

      <div class="item">
        <div>值（月）：{{ value4 }}</div>
        <el-date-picker
          v-model="value4"
          type="month"
          placeholder="选择月"
          format="yyyy 年 MM 月"
          value-format="yyyyMM[MM]"
        >
        </el-date-picker>
      </div>
      <div class="item">
        <div>值（月）：{{ value41 }}</div>
        <el-date-picker
          v-model="value41"
          type="months"
          placeholder="选择月"
          format="yyyy 年 MM 月"
          value-format="yyyyMM[MM]"
        >
        </el-date-picker>
      </div>
    </div>
    <p>动态测试</p>
    <div class="box">
      <button type="button" @click="handleYear">切换为年度</button>
      <button type="button" @click="handleHalfyear">切换为半年度</button>
      <button type="button" @click="handleQuarter">切换为季度</button>
      <button type="button" @click="handleMonth">切换为月度</button>
      <div class="item">
        <div>值：{{ value }}</div>
        <el-date-picker
          v-model="value"
          :type="type"
          placeholder="选择季"
          :format="format"
          :value-format="valueFormat"
        >
        </el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>
import ElDatePicker from "./lib/index";

export default {
  name: "App",
  components: {
    ElDatePicker,
  },
  data() {
    return {
      value1: "",
      value11: "",
      value2: "",
      value21: "",
      value3: "",
      value31: "",
      value4: "",
      value41: "",
      //
      value: "",
      type: "quarter",
      format: "yyyy 年第Q季度",
      valueFormat: "yyyyQQ[SS]",
    };
  },
  methods: {
    handleYear() {
      this.value = "2024YY";
      this.type = "year";
      this.format = "yyyy 年";
      this.valueFormat = "yyyy[YY]";
    },
    handleHalfyear() {
      this.value = "202402HY";
      this.type = "halfyear";
      this.format = "yyyy 年B半年";
      this.valueFormat = "yyyyBB[HY]";
    },
    handleQuarter() {
      this.value = "202403SS";
      this.type = "quarter";
      this.format = "yyyy 年第Q季度";
      this.valueFormat = "yyyyQQ[SS]";
    },
    handleMonth() {
      this.value = "202409MM";
      this.type = "month";
      this.format = "yyyy 年 MM 月";
      this.valueFormat = "yyyyMM[MM]";
    },
  },
};
</script>

<style>
.box {
  display: grid;
  grid-template-columns: repeat(4, 300px); /* 每行4列，每列宽度300px */
  gap: 10px; /* 可选，列之间的间距 */
  justify-content: center; /* 水平居中对齐 */
}
.item {
  padding: 20px;
}

@media screen and (max-width: 1000px) {
  .box {
    grid-template-columns: repeat(2, 300px); /* 每行2列，每列宽度300px */
  }
}
</style>
