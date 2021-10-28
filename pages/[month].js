import Link from "next/link";
import { Table } from "../components/table";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { useRouter } from "next/router";

export default function Month({ bugs, fish }) {
  const { query } = useRouter();
  const month = query.month;

  const allCritters = bugs.concat(fish);
  const crittersInMonth = allCritters.filter((critter) => {
    return critter.monthsNorth.includes(`${month}`);
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

  console.log(sortedCritters);

  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <h1 className="my-8 text-4xl">{`${month}`}</h1>
      <p>dropdown to select different month</p>
      <Table critters={sortedCritters} />
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

export async function getStaticProps({ params }) {
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
