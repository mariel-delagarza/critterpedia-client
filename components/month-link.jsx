import React from "react";
import Link from "next/link";

export const MonthLink = ({ month }) => {
  return (
    <Link key={month} href={`/${month}`}>
      <a className="text-4xl">{month}</a>
    </Link>
  );
};
