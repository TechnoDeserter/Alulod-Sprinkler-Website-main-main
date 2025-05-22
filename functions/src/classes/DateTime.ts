export default abstract class DateTime {
  static readonly offsetMins = 8 * 60;

  static monthAbbrev: MonthAbbrev[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  static now(): Date {
    return new Date(Date.now() + DateTime.offsetMins * 60 * 1000);
  }

  static getMonthAbbrev() {
    return DateTime.monthAbbrev[DateTime.now().getMonth()];
  }
}

export type MonthAbbrev =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";
