import Link from "next/link";
import { MonthTable } from "../components/month-table";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from "next/router";
import MonthDropdown from "../components/month-dropdown";

export default function Month({ bugs, fish }) {
  const { query } = useRouter();

  const allCritters = bugs.concat(fish);

  // Filter critters by query.month (URL) and sort
  // what's returned by name
  const crittersInMonth = allCritters.filter((critter) => {
    return critter.monthsNorth.includes(query.month);
  });
  const sortedCritters = crittersInMonth.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <h1 className="my-8 text-4xl">{query.month}</h1>
      <MonthDropdown month={query.month} />
      <MonthTable sortedCritters={sortedCritters} />

      <h2 className="my-8">
        <Link href="/">
          <a className="text-4xl text-blue-700 underline">Back to Home</a>
        </Link>
      </h2>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { month: "January" } },
      { params: { month: "February" } },
      { params: { month: "March" } },
      { params: { month: "April" } },
      { params: { month: "May" } },
      { params: { month: "June" } },
      { params: { month: "July" } },
      { params: { month: "August" } },
      { params: { month: "September" } },
      { params: { month: "October" } },
      { params: { month: "November" } },
      { params: { month: "December" } },
    ],
    fallback: false,
  };
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
