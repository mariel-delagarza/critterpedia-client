import React from "react";
import Link from "next/link";

export const CritterLink = ({ critter }) => {
  let pluralCritter = "";

  if (critter.__typename === "Fish") {
    pluralCritter = "fish";
  } else {
    pluralCritter = "bugs";
  }

  return (
    <Link href={`/${pluralCritter}/${critter.slug}`}>
      <a className="text-blue-700 underline">{critter.name}</a>
    </Link>
  );
};
