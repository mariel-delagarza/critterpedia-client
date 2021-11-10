import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { MonthTable } from "../components/month-table";

export default function AllFish({ fishes }) {
  return (
    <>
      <Head>
        <title>All Fish</title>
      </Head>
      <h1 className="my-8 text-4xl">All Fish</h1>
      <MonthTable sortedCritters={fishes} />
      <h2 className="my-8">
        <Link href="/">
          <a className="text-4xl text-blue-700 underline">Back to Home</a>
        </Link>
      </h2>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query getAllFish {
        getAllFish {
          name
          shadowSize
          fin
          slug
          value
          location
          monthsNorth
          monthsSouth
          timeRange
          hoursAM
          hoursPM
        }
      }
    `,
  });

  return {
    props: {
      fishes: data.getAllFish,
    },
  };
}
