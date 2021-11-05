import React from "react";
import Link from "next/link";

export const CritterLink = ({ key, pluralCritter, critter }) => {
  return (
    <Link href={`/${pluralCritter}/${critter.slug}`}>
      <a className="text-blue-700 underline">{critter.name}</a>
    </Link>
  );
};
