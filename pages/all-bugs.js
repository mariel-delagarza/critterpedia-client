import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "../apollo-client";

export default function AllBugs({ bugs }) {
  return (
    <>
      <Head>
        <title>All Bugs</title>
      </Head>
      <h1>All Bugs Go Here</h1>
      <p>All the bugs</p>
      <ul>
        {bugs.map((bug) => (
          <li key={bug}>{bug}</li>
        ))}
      </ul>
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
        }
      }
    `,
  });

  let names = data.getAllBugs.map((bug) => bug.name);
  console.log(names);

  return {
    props: {
      bugs: data.getAllBugs.map((bug) => bug.name),
    },
  };
}
