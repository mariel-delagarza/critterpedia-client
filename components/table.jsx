import React from "react";
import { CritterLink } from "./critter-link";

export const Table = ({ critters }) => {
  const getLink = (critter) => {
    if (critter.typename === "fish") {
      return (
        <CritterLink key={critter.id} pluralCritter="fish" critter={critter} />
      );
    } else {
      return (
        <CritterLink key={critter.id} pluralCritter="bugs" critter={critter} />
      );
    }
  };

  return (
    <table>
      <caption>
        <h1>All {critters[0].__typename}</h1>
      </caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Value</th>
          <th>Time of Day</th>
          <th>Months</th>
        </tr>
      </thead>
      <tbody>
        {critters.map((critter) => (
          <tr key={critter.name}>
            <td>{getLink(critter)}</td>
            <td>{critter.location}</td>
            <td>{critter.value}</td>
            <td>{critter.timeRange}</td>
            <th>{critter.monthsNorth}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
