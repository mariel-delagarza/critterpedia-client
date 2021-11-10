//import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../apollo-client";
//import { useRouter } from "next/router";
import { useRouter } from "next/router";
import HourDropdown from "../components/hour-dropdown";
import { useEffect, useState } from "react"

const initialValues = {
  hour: "one",
  meridian: 'AM',
  month: "January",
};

export default function Hour({ bugs, fish }) {
  const { query, isReady } = useRouter();
  const [params, setParams] = useState(null)

  useEffect(()=>{
    // workaround initial empty `query` issue: https://github.com/vercel/next.js/discussions/11484
    if(!isReady) return;
    setParams(query)
  }, [isReady, query]);

  if (!params) {
    return null // or loading, etc. - just not an uncontrolled form input with `defaultValue`
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

  // console.log(sortedMorningCritters);
  // console.log(sortedAfternoonCritters);

  const handleSubmit = (e) => {};


  return (
    <div>
      <h1 className="text-4xl my-8">Form Stuff</h1>
      <form method="GET">
        <label>Hour: </label>
        <select defaultValue={params.hour} name="hour">
          <option value="one">1</option>
          <option value="two">2</option>
        </select>

        <label>AM or PM? </label>
        <select defaultValue={params.meridian} name="meridian">
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
        <label>Month: </label>
        <select defaultValue={params.month} name="month">
          <option value="January">January</option>
          <option value="February">February</option>
        </select>
        <button type="submit">Submit</button>
      </form>
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
