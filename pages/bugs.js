import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { Table } from "../components/month-table";

export default function AllBugs({ bugs }) {
  //log(bugs);

  return (
    <>
      <Head>
        <title>All Bugs</title>
      </Head>
      <h1 className="my-8 text-4xl">All Bugs</h1>
      <Table critters={bugs} />
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
      query getAllBugs {
        getAllBugs {
          name
          slug
          value
          location
          monthsNorth
          monthsSouth
          location
          timeRange
          hoursAM
          hoursPM
        }
      }
    `,
  });

  return {
    props: {
      bugs: data.getAllBugs,
    },
  };
}
