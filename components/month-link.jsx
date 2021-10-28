import React from "react";
import Link from "next/link";

export const MonthLink = ({ month }) => {
  return (
    <Link key={month} href={`/${month}`}>
      <a className="flex justify-center text-4xl border-2 border-yellow-700 rounded-xl p-6 bg-yellow-700 text-yellow-100">
        {month}
      </a>
    </Link>
  );
};
