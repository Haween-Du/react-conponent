import { CalendarProps } from "../../calendar";
import { Dayjs } from "dayjs";

interface MonthCalendarProps extends CalendarProps {}
// function getAllDays(date: Dayjs) {
//   // 一个月多少天
//   const dayInMonth = date.daysInMonth();
//   // 每月开始的天
//   const startDate = date.startOf("month");
//   const day = startDate.day();
// }

// 获取所有的渲染天数
function getAllDays(date: Dayjs) {
  const startDate = date.startOf("month");
  const day = startDate.day();

  const daysInfo: Array<{ date: Dayjs; currentMonth: boolean }> = new Array(
    6 * 7
  );

  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, "day"),
      currentMonth: false,
    };
  }

  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, "day");

    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(),
    };
  }

  return daysInfo;
}
// 准备渲染数据
function renderDays(days: Array<{ date: Dayjs; currentMonth: boolean }>) {
  const rows = [];
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      const item = days[i * 7 + j];
      row[j] = (
        <div className="calendar-month-body-cell">{item.date.date()}</div>
      );
    }
    rows.push(row);
  }
  return rows.map((row) => (
    <div className="calendar-month-body-row">{row}</div>
  ));
}

function MonthCalendar(props: MonthCalendarProps) {
  console.log(props.value, "value");

  const weekList = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  // 获取所有数据
  const allDays = getAllDays(props.value!);
  return (
    <div className="calendar-month">
      <div className="calendar-month-week-list">
        {weekList.map((week) => (
          <div className="calendar-month-week-list-item" key={week}>
            {week}
          </div>
        ))}
      </div>
      <div className="calendar-month-body">{renderDays(allDays)}</div>
    </div>
  );
}

export default MonthCalendar;
