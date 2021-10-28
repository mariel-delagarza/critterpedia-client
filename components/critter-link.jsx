import React from "react";
import Link from "next/link";

export const CritterLink = ({ key, pluralCritter, critter }) => {
  console.log(key, pluralCritter, critter);

  return (
    <Link key={key} href={`/${pluralCritter}/${critter.slug}`}>
      <a className="text-blue-700 underline">{critter.name}</a>
    </Link>
  );
};