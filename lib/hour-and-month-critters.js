export function getSortedMeridianCritters(allCritters, hour, month) {
  const crittersAM = allCritters.filter((critter) => {
    return critter.hoursAM.includes(hour);
  });
  const crittersPM = allCritters.filter((critter) => {
    return critter.hoursPM.includes(hour);
  });
  const crittersInMonthAM = crittersAM.filter((critter) => {
    return critter.monthsNorth.includes(month);
  });
  const crittersInMonthPM = crittersPM.filter((critter) => {
    return critter.monthsNorth.includes(month);
  });

  const sortedMorningCritters = crittersInMonthAM.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  const sortedAfternoonCritters = crittersInMonthPM.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return sortedAfternoonCritters, sortedMorningCritters;
}
