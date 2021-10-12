import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { Table } from "../components/table";

export default function AllBugs({ bugs }) {
  console.log(bugs);

  return (
    <>
      <Head>
        <title>All Bugs</title>
      </Head>
      <Table critters={bugs} />
      <h2>
        <Link href="/">
          <a>Back to Home</a>
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
