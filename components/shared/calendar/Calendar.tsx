"use client";

import {useState} from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarBody from "./CalendarBody";

export default function Calendar() {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startWeek = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const calendar: (number | null)[][] = [];
  let week: (number | null)[] = [];
  
  for (let i = 0; i < startWeek; i++) {
    week.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    week.push(d);
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    calendar.push(week);
  }

  return (
    <section className="flex flex-col gap-3 p-3">
      <CalendarHeader
        year={year}
        month={month}
        setMonth={setMonth}
        setYear={setYear}
      />
      <CalendarBody calendar={calendar} today={today} />
    </section>
  );
}
