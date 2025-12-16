"use client";

import {useEffect, useState} from "react";

interface ISessionDataTypes {
  sessionDate: string;
  startTime: string;
  endTime: string;
  locationDetail: string;
  status: string;
  maxStudents: number;
  price: number;
  content: string;
}
export default function SessionComp({count}: {count: number}) {
  const [session, setSession] = useState([]);
  useEffect(() => {
    setSession(Array.from({length: count}, (_, i) => ({})));
  }, [count]);
  return <div></div>;
}
