import React from "react";
import Link from "next/link";

export const CritterLink = (key, pluralCritter, critter) => {
  return (
    <Link key={key} href={`/${pluralCritter})/${critter.slug}`}>
      <a>{critter.name}</a>
    </Link>
  );
};
