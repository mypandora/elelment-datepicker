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
          value-format="yyyyQQ[QQ]"
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
          value-format="yyyyQQ[QQ]"
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
  </div>
</template>

<script>
import ElDatePicker from "../packages/datepicker/index";

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
    };
  },
};
</script>

<style>
.box {
  columns: 2 auto;
}
.item {
  padding: 8px;
}
</style>
