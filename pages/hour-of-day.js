import { gql } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HourTimeTable } from "../components/hour-time-table";

export default function Hour({ bugs, fish }) {
  const { query, isReady } = useRouter();

  const [params, setParams] = useState(null);

  useEffect(() => {
    // workaround initial empty `query` issue: https://github.com/vercel/next.js/discussions/11484
    if (!isReady) return;
    setParams(query);
  }, [isReady, query]);

  if (!params) {
    return null; // or loading, etc. - just not an uncontrolled form input with `defaultValue`
  }

  const allCritters = bugs.concat(fish);
  const crittersAM = allCritters.filter((critter) => {
    return critter.hoursAM.includes(params.hour);
  });
  const crittersPM = allCritters.filter((critter) => {
    return critter.hoursPM.includes(params.hour);
  });
  const crittersInMonthAM = crittersAM.filter((critter) => {
    return critter.monthsNorth.includes(params.month);
  });
  const crittersInMonthPM = crittersPM.filter((critter) => {
    return critter.monthsNorth.includes(params.month);
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

  return (
    <div>
      <h1 className="text-4xl my-8">Critters by Hour of the Day</h1>
      <form
        method="GET"
        className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="flex-1 flex items-center justify-start border-solid border-4 bg-white rounded truncate">
          <label
            htmlFor="hour"
            className="block text-sm font-medium text-gray-700 px-4"
          >
            Hour:{" "}
          </label>
          <select
            id="hour"
            name="hour"
            className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue={params.hour}
          >
            <option value="One">1</option>
            <option value="Two">2</option>
            <option value="Three">3</option>
          </select>
        </div>
        <div className="flex-1 flex items-center justify-start border-solid border-4 bg-white rounded truncate">
          <label
            htmlFor="meridian"
            className="block text-sm font-medium text-gray-700 px-4"
          >
            AM or PM?
          </label>
          <select
            id="meridian"
            name="meridian"
            className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue={params.meridian}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <div className="flex-1 flex items-center justify-start border-solid border-4 bg-white rounded truncate">
          <label
            htmlFor="month"
            className="block text-sm font-medium text-gray-700 px-4"
          >
            Month:
          </label>
          <select
            id="month"
            name="month"
            className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue={params.month}
          >
            <option value="January">January</option>
            <option value="February">February</option>
          </select>
        </div>
        <button
          type="submit"
          className="items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 max-w-sm"
        >
          Submit
        </button>
      </form>
      <>
        {params.meridian == "PM" && (
          <HourTimeTable sortedCritters={sortedAfternoonCritters} />
        )}
        {params.meridian == "AM" && (
          <HourTimeTable sortedCritters={sortedMorningCritters} />
        )}
      </>
    </div>
  );
}

// grab ALL of the fish and bugs and the data
// needed for the table - hit the backend once on
// build, and then manipulate the data after that
// client-side.
export async function getStaticProps() {
  const { data: bugData } = await client.query({
    query: gql`
      query getAllBugs {
        getAllBugs {
          name
          value
          location
          monthsNorth
          monthsSouth
          timeRange
          hoursAM
          hoursPM
          slug
        }
      }
    `,
  });

  const { data: fishData } = await client.query({
    query: gql`
      query getAllFish {
        getAllFish {
          name
          value
          location
          monthsNorth
          monthsSouth
          hoursAM
          hoursPM
          timeRange
          shadowSize
          fin
          slug
        }
      }
    `,
  });

  return {
    props: {
      bugs: bugData.getAllBugs,
      fish: fishData.getAllFish,
    },
  };
}
