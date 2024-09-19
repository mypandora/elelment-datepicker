<template>
  <div id="app">
    <div class="block">
      <span class="demonstration">使用 value-format</span>
      <div class="demonstration">值：{{ value1 }}</div>
      <el-date-picker
        v-model="value1"
        type="year"
        placeholder="选择年"
        format="yyyy 年"
        value-format="yyyy[YY]"
      >
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">使用 value-format</span>
      <div class="demonstration">值：{{ value11 }}</div>
      <el-date-picker
        v-model="value11"
        type="years"
        placeholder="选择年"
        format="yyyy 年"
        value-format="yyyy[YY]"
      >
      </el-date-picker>
    </div>

    <div class="block">
      <span class="demonstration">使用 value-format</span>
      <div class="demonstration">值：{{ value2 }}</div>
      <el-date-picker
        v-model="value2"
        type="halfyear"
        placeholder="选择半年"
        format="yyyy 年B半年"
        value-format="yyyyBB[HY]"
      >
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">使用 value-format</span>
      <div class="demonstration">值：{{ value21 }}</div>
      <el-date-picker
        v-model="value21"
        type="halfyears"
        placeholder="选择半年"
        format="yyyy 年B半年"
        value-format="yyyyBB[HY]"
      >
      </el-date-picker>
    </div>

    <div class="block">
      <span class="demonstration">使用 value-format</span>
      <div class="demonstration">值：{{ value3 }}</div>
      <el-date-picker
        v-model="value3"
        type="month"
        placeholder="选择月"
        format="yyyy 年 MM 月"
        value-format="yyyyMM[MM]"
      >
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">使用 value-format</span>
      <div class="demonstration">值：{{ value4 }}</div>
      <el-date-picker
        v-model="value4"
        type="date"
        placeholder="选择月"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyyMMDD[DD]"
      >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import ElDatePicker from "./components/index";

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
      value4: "",
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
