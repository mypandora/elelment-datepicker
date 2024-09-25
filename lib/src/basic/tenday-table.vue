<template>
  <table @click="handleTendayTableClick" class="el-month-table">
    <tbody>
      <tr v-for="(row, key) in rows" :key="key">
        <td :class="getCellStyle(cell)" v-for="(cell, key) in row" :key="key">
          <div>
            <a class="cell">{{ tenDays[cell.text] }}</a>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Locale from "element-ui/src/mixins/locale";
import {
  isDate,
  range,
  getDayCountOfMonth,
  nextDate,
  getTendayByDay,
  getDayByTenday,
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
    date.getMonth(),
    getDayByTenday(getTendayByDay(date))
  );
};

const getTendayTimestamp = function (time) {
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
      default: "tendays",
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
      tenDays: ["上旬", "中旬", "下旬"],
      tableRows: [[]],
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
      const month = this.date.getMonth();
      const today = new Date();
      const tenday = cell.text;
      const defaultValue = this.defaultValue
        ? Array.isArray(this.defaultValue)
          ? this.defaultValue
          : [this.defaultValue]
        : [];
      style.disabled =
        typeof this.disabledDate === "function"
          ? datesInMonth(year, getDayByTenday(tenday)).every(this.disabledDate)
          : false;
      style.current =
        arrayFindIndex(
          coerceTruthyValueToArray(this.value),
          (date) =>
            date.getFullYear() === year &&
            date.getMonth() === month &&
            getTendayByDay(date) === tenday
        ) >= 0;
      style.today =
        today.getFullYear() === year &&
        today.getMonth() === month &&
        getTendayByDay(today) === tenday;
      style.default = defaultValue.some((date) =>
        this.cellMatchesDate(cell, date)
      );

      return style;
    },
    getTendayfCell(tenday) {
      const year = this.date.getFullYear();
      const month = this.date.getMonth();
      const day = getDayByTenday(tenday);
      return new Date(year, month, day);
    },
    handleTendayTableClick(event) {
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
      const tenday = row * 3 + column;
      const newDate = this.getTendayfCell(tenday);
      if (this.selectionMode === "tendays") {
        const value = this.value || [];
        const year = this.date.getFullYear();
        const month = this.date.getMonth();
        const newValue =
          arrayFindIndex(
            value,
            (date) =>
              date.getFullYear() === year &&
              date.getMonth() === month &&
              getTendayByDay(date) === tenday
          ) >= 0
            ? removeFromArray(
                value,
                (date) => date.getTime() === newDate.getTime()
              )
            : [...value, newDate];
        this.$emit("pick", newValue);
      } else {
        this.$emit("pick", tenday);
      }
    },
  },

  computed: {
    rows() {
      // TODO: refactory rows / getCellClasses
      const rows = this.tableRows;
      const disabledDate = this.disabledDate;
      const selectedDate = [];
      const now = getTendayTimestamp(new Date());

      for (let i = 0; i < 1; i++) {
        const row = rows[i];
        for (let j = 0; j < 3; j++) {
          let cell = row[j];
          if (!cell) {
            cell = {
              row: i,
              column: j,
              type: "normal",
            };
          }

          cell.type = "normal";

          const index = i * 3 + j;
          const time = new Date(
            this.date.getFullYear(),
            this.date.getMonth(),
            getDayByTenday(index)
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
