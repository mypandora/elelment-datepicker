<template>
  <table @click="handleQuarterTableClick" class="el-month-table">
    <tbody>
      <tr v-for="(row, key) in rows" :key="key">
        <td :class="getCellStyle(cell)" v-for="(cell, key) in row" :key="key">
          <div>
            <a class="cell">{{ quarters[cell.text] }}</a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script type="text/babel">
import Locale from "element-ui/src/mixins/locale";
import {
  isDate,
  range,
  getDayCountOfMonth,
  nextDate,
  getQuarterByMonth,
  getMonthByQuarter,
} from "../../utils/date-util";
import { hasClass } from "element-ui/src/utils/dom";
import {
  arrayFindIndex,
  coerceTruthyValueToArray,
  arrayFind,
} from "element-ui/src/utils/util";

const datesInMonth = (year, month) => {
  const numOfDays = getDayCountOfMonth(year, month);
  const firstDay = new Date(year, month, 1);
  return range(numOfDays).map((n) => nextDate(firstDay, n));
};

const clearDate = (date) => {
  return new Date(
    date.getFullYear(),
    getMonthByQuarter(getQuarterByMonth(date))
  );
};

const getQuarterTimestamp = function (time) {
  if (typeof time === "number" || typeof time === "string") {
    return clearDate(new Date(time)).getTime();
  } else if (time instanceof Date) {
    return clearDate(time).getTime();
  } else {
    return NaN;
  }
};

// remove the first element that satisfies `pred` from arr
// return a new array if modification occurs
// return the original array otherwise
const removeFromArray = function (arr, pred) {
  const idx =
    typeof pred === "function" ? arrayFindIndex(arr, pred) : arr.indexOf(pred);
  return idx >= 0 ? [...arr.slice(0, idx), ...arr.slice(idx + 1)] : arr;
};
export default {
  props: {
    disabledDate: {},
    value: {},
    selectionMode: {
      default: "quarter",
    },
    defaultValue: {
      validator(val) {
        // null or valid Date Object
        return (
          val === null ||
          isDate(val) ||
          (Array.isArray(val) && val.every(isDate))
        );
      },
    },
    date: {},
  },

  mixins: [Locale],

  data() {
    return {
      quarters: ["第一季度", "第二季度", "第三季度", "第四季度"],
      tableRows: [[], []],
    };
  },

  methods: {
    cellMatchesDate(cell, date) {
      const value = new Date(date);
      return (
        this.date.getFullYear() === value.getFullYear() &&
        Number(cell.text) === value.getMonth()
      );
    },
    getCellStyle(cell) {
      const style = {};
      const year = this.date.getFullYear();
      const today = new Date();
      const quarter = cell.text;
      const defaultValue = this.defaultValue
        ? Array.isArray(this.defaultValue)
          ? this.defaultValue
          : [this.defaultValue]
        : [];
      style.disabled =
        typeof this.disabledDate === "function"
          ? datesInMonth(year, getMonthByQuarter(quarter)).every(
              this.disabledDate
            )
          : false;
      style.current =
        arrayFindIndex(
          coerceTruthyValueToArray(this.value),
          (date) =>
            date.getFullYear() === year && getQuarterByMonth(date) === quarter
        ) >= 0;
      style.today =
        today.getFullYear() === year && getQuarterByMonth(today) === quarter;
      style.default = defaultValue.some((date) =>
        this.cellMatchesDate(cell, date)
      );

      return style;
    },
    getQuarterOfCell(quarter) {
      const year = this.date.getFullYear();
      const month = getMonthByQuarter(quarter);
      return new Date(year, month, 1);
    },
    handleQuarterTableClick(event) {
      let target = event.target;
      if (target.tagName === "A") {
        target = target.parentNode.parentNode;
      }
      if (target.tagName === "DIV") {
        target = target.parentNode;
      }
      if (target.tagName !== "TD") return;
      if (hasClass(target, "disabled")) return;
      const column = target.cellIndex;
      const row = target.parentNode.rowIndex;
      const quarter = row * 2 + column;
      const newDate = this.getQuarterOfCell(quarter);
      if (this.selectionMode === "quarters") {
        const value = this.value || [];
        const year = this.date.getFullYear();
        const newValue =
          arrayFindIndex(
            value,
            (date) =>
              date.getFullYear() === year && getQuarterByMonth(date) === quarter
          ) >= 0
            ? removeFromArray(
                value,
                (date) => date.getTime() === newDate.getTime()
              )
            : [...value, newDate];
        this.$emit("pick", newValue);
      } else {
        this.$emit("pick", quarter);
      }
    },
  },

  computed: {
    rows() {
      // TODO: refactory rows / getCellClasses
      const rows = this.tableRows;
      const disabledDate = this.disabledDate;
      const selectedDate = [];
      const now = getQuarterTimestamp(new Date());

      for (let i = 0; i < 2; i++) {
        const row = rows[i];
        for (let j = 0; j < 2; j++) {
          let cell = row[j];
          if (!cell) {
            cell = {
              row: i,
              column: j,
              type: "normal",
            };
          }

          cell.type = "normal";

          const index = i * 2 + j;
          const time = new Date(
            this.date.getFullYear(),
            getMonthByQuarter(index) // 0,3,6,9
          ).getTime();
          const isToday = time === now;

          if (isToday) {
            cell.type = "today";
          }
          cell.text = index;
          let cellDate = new Date(time);
          cell.disabled =
            typeof disabledDate === "function" && disabledDate(cellDate);
          cell.selected = arrayFind(
            selectedDate,
            (date) => date.getTime() === cellDate.getTime()
          );

          this.$set(row, j, cell);
        }
      }
      return rows;
    },
  },
};
</script>
